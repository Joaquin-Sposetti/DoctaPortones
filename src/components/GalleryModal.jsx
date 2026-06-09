import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X as CloseIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { toWebp } from "../lib/media";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

export function GalleryModal({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const currentImage = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomed(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomed(false);
  };

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
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
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
  }, [currentIndex, images.length, onClose]);

  return (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
        onClick={onClose}
      >
        <motion.div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label="Galería de productos"
          className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <picture>
            <source srcSet={toWebp(currentImage)} type="image/webp" />
            <img
              src={currentImage}
              alt="Imagen ampliada"
              className={`
                max-w-full max-h-[90vh] object-contain cursor-pointer
                transition-transform duration-300
                ${zoomed ? "scale-150" : "scale-100"}
              `}
              decoding="async"
              onClick={() => setZoomed((value) => !value)}
            />
          </picture>

          <button
            type="button"
            onClick={handlePrev}
            className="
              absolute left-3 md:left-8 top-1/2 -translate-y-1/2
              flex items-center justify-center
              w-14 h-14 md:w-16 md:h-16
              rounded-full
              bg-black/50 backdrop-blur-md border border-white/30
              text-white hover:bg-[#154f54]/80 hover:border-[#00c2b8]/70
              transition-all duration-300
              shadow-xl hover:shadow-2xl hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-[#00c2b8]
              z-50 glow-arrow
            "
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={32} strokeWidth={3} />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              flex items-center justify-center
              w-14 h-14 md:w-16 md:h-16
              rounded-full
              bg-black/50 backdrop-blur-md border border-white/30
              text-white hover:bg-[#154f54]/80 hover:border-[#00c2b8]/70
              transition-all duration-300
              shadow-xl hover:shadow-2xl hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-[#00c2b8]
              z-50 glow-arrow
            "
            aria-label="Siguiente"
          >
            <ChevronRight size={48} />
          </button>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-[#00c2b8] transition focus:outline-none focus:ring-2 focus:ring-[#00c2b8]"
            aria-label="Cerrar"
          >
            <CloseIcon size={32} />
          </button>
        </motion.div>
    </motion.div>
  );
}
