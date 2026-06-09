import { motion } from "framer-motion";
import { X as CloseIcon } from "lucide-react";
import React, { useEffect, useMemo, useRef } from "react";
import { CurvedSlider } from "./CurvedSlider";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function GalleryModal({ images, initialIndex, onClose }) {
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
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
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
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
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#031b1d]/35 p-0 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-label="Galeria de productos"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative h-screen w-screen overflow-hidden bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-content-center rounded-full bg-black/55 text-white ring-1 ring-white/20 backdrop-blur-md transition hover:bg-white/10 hover:text-[#00c2b8] focus:outline-none focus:ring-2 focus:ring-[#00c2b8]"
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
        />
      </motion.div>
    </motion.div>
  );
}
