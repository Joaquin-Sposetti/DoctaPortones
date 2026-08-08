import { motion } from "framer-motion";
import { X as CloseIcon } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CurvedSlider } from "./CurvedSlider";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

function restoreDocumentInteraction(overflowValue = "") {
  document.body.style.overflow = overflowValue;
  document.body.style.cursor = "";
  document.body.style.pointerEvents = "";
  document.body.style.userSelect = "";
  document.body.style.touchAction = "";
  document.documentElement.style.cursor = "";
  document.documentElement.style.pointerEvents = "";
  document.documentElement.style.userSelect = "";
  document.documentElement.style.touchAction = "";
}

function suppressClosingTap(duration = 550) {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const until = Date.now() + duration;
  window.__doctaGalleryClosingUntil = until;

  const stopResidualTap = (event) => {
    if (Date.now() > until) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();
  };

  const options = { capture: true, passive: false };
  const events = ["click", "mouseup", "pointerup", "touchend"];

  events.forEach((eventName) => {
    document.addEventListener(eventName, stopResidualTap, options);
  });

  window.setTimeout(() => {
    events.forEach((eventName) => {
      document.removeEventListener(eventName, stopResidualTap, options);
    });
  }, duration);
}

export function GalleryModal({ images, initialIndex, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previousOverflowRef = useRef("");
  const closingRef = useRef(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [closing, setClosing] = useState(false);
  const cards = useMemo(
    () =>
      images.map((src, index) => ({
        image: {
          src,
          alt: `Producto ${index + 1}`,
        },
        title: "",
      })),
    [images]
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    previousOverflowRef.current = previousOverflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      restoreDocumentInteraction(previousOverflow);
    };
  }, []);

  const handleClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    setResetSignal((value) => value + 1);
    suppressClosingTap();
    restoreDocumentInteraction(previousOverflowRef.current);
    closeButtonRef.current?.blur();
    onClose();
  }, [onClose]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key !== "Tab") return;

      const focusable = Array.from(
        modalRef.current?.querySelectorAll(focusableSelector) || []
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: closing ? 0 : 1 }}
      exit={{ opacity: 0 }}
      className={[
        "fixed inset-0 z-50 flex items-center justify-center bg-[#031b1d]/35 p-0 backdrop-blur-xl",
        closing ? "pointer-events-none cursor-default" : "cursor-default",
      ].join(" ")}
      onClick={handleClose}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de productos"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.98 : 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative h-screen w-screen overflow-hidden bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          onPointerDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          onTouchStart={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          className="absolute right-4 top-4 z-[100] grid h-10 w-10 cursor-pointer place-content-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/10 hover:text-[#00c2b8] focus:outline-none focus:ring-2 focus:ring-[#00c2b8]"
          aria-label="Cerrar"
        >
          <CloseIcon size={22} />
        </button>

        <CurvedSlider
          cards={cards}
          initialIndex={initialIndex}
          backgroundColor="transparent"
          arrowColor="#ffffff"
          cardBorderRadius={8}
          imageAspectRatio="contain"
          mobileMarqueeSpeed={0.85}
          enableKeyboardNavigation
          showTitles={false}
          resetSignal={resetSignal}
        />
      </motion.div>
    </motion.div>
  );
}
