import { AnimatePresence, motion } from "framer-motion";
import React, { startTransition, useEffect, useState } from "react";

const clampIndex = (index, length) => ((index % length) + length) % length;

export function CurvedSlider({
  cards,
  initialIndex = 0,
  backgroundColor = "#000000",
  arrowColor = "#ffffff",
  cardBorderRadius = 8,
  autoPlay = false,
  autoPlayInterval = 3000,
  imageAspectRatio = "cover",
  mobileMarqueeSpeed = 1,
  enableKeyboardNavigation = true,
  titleFont = {
    fontSize: "32px",
    fontWeight: 700,
    letterSpacing: "-0.02em",
    lineHeight: "1.2em",
  },
  titleColor = "#ffffff",
  showTitles = true,
}) {
  const [currentIndex, setCurrentIndex] = useState(clampIndex(initialIndex, cards.length));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setCurrentIndex(clampIndex(initialIndex, cards.length));
  }, [initialIndex, cards.length]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const checkMobile = () => {
      startTransition(() => {
        setIsMobile(window.innerWidth < 768);
      });
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    startTransition(() => {
      setCurrentIndex((prev) => (prev === 0 ? cards.length - 1 : prev - 1));
    });
  };

  const handleNext = () => {
    startTransition(() => {
      setCurrentIndex((prev) => (prev === cards.length - 1 ? 0 : prev + 1));
    });
  };

  useEffect(() => {
    if (typeof window === "undefined" || !autoPlay) return undefined;
    const timer = window.setTimeout(handleNext, autoPlayInterval);
    return () => window.clearTimeout(timer);
  }, [autoPlay, autoPlayInterval, currentIndex]);

  useEffect(() => {
    if (typeof window === "undefined" || !enableKeyboardNavigation || isMobile) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enableKeyboardNavigation, currentIndex, isMobile]);

  const handleDragEnd = (_, info) => {
    const swipe = info.offset.x + info.velocity.x * 0.2;
    if (swipe < -70) handleNext();
    if (swipe > 70) handlePrevious();
  };

  const getCardStyle = (index) => {
    const diff = index - currentIndex;
    const isCenter = diff === 0;
    const isLeft = diff === -1 || (currentIndex === 0 && index === cards.length - 1);
    const isRight =
      diff === 1 || (currentIndex === cards.length - 1 && index === 0);

    if (isCenter) {
      return {
        transform: "translate(-50%, -50%) translateX(0%) scale(1) rotateZ(0deg)",
        zIndex: 3,
        opacity: 1,
      };
    }

    if (isLeft) {
      return {
        transform: isMobile
          ? "translate(-50%, -50%) translateX(-68%) scale(0.62) rotateZ(-9deg)"
          : "translate(-50%, -50%) translateX(-82%) scale(0.68) rotateZ(-10deg)",
        zIndex: 2,
        opacity: isMobile ? 0.42 : 0.46,
      };
    }

    if (isRight) {
      return {
        transform: isMobile
          ? "translate(-50%, -50%) translateX(68%) scale(0.62) rotateZ(9deg)"
          : "translate(-50%, -50%) translateX(82%) scale(0.68) rotateZ(10deg)",
        zIndex: 2,
        opacity: isMobile ? 0.42 : 0.46,
      };
    }

    return {
      transform: "translate(-50%, -50%) translateX(0%) scale(0.5)",
      zIndex: 1,
      opacity: 0,
    };
  };

  return (
    <div
      className="relative flex h-full w-full items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
    >
      <button
        type="button"
        onClick={handlePrevious}
        className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white backdrop-blur transition hover:scale-110 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] md:left-[5%] md:bg-transparent md:p-0"
        aria-label="Imagen anterior"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={arrowColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.16}
          onDragEnd={handleDragEnd}
          className="relative h-[78%] min-h-[360px] w-[74%] touch-pan-y md:h-[90%] md:min-h-[600px] md:w-[58%] md:min-w-[760px]"
        >
          <AnimatePresence initial={false}>
            {cards.map((card, index) => {
              const cardStyle = getCardStyle(index);
              const isVisible =
                Math.abs(index - currentIndex) <= 1 ||
                (currentIndex === 0 && index === cards.length - 1) ||
                (currentIndex === cards.length - 1 && index === 0);

              if (!isVisible) return null;

              const cardImage = card.image || { src: "", alt: "Imagen" };

              return (
                <motion.div
                  key={`${cardImage.src}-${index}`}
                  initial={{ opacity: 0 }}
                  animate={cardStyle}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute left-1/2 top-1/2 flex h-full w-full flex-col gap-3"
                >
                  <button
                    type="button"
                    onClick={() => index !== currentIndex && setCurrentIndex(index)}
                    className="relative block h-full w-full overflow-hidden bg-transparent focus:outline-none"
                    style={{ borderRadius: cardBorderRadius }}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img
                      src={cardImage.src}
                      alt={cardImage.alt || "Imagen"}
                      className="block h-full w-full"
                      style={{
                        objectFit: imageAspectRatio,
                        borderRadius: "inherit",
                      }}
                      draggable="false"
                    />
                  </button>

                  {showTitles && card.title && (
                    <div
                      className="w-full text-center text-white"
                      style={{ color: titleColor, ...titleFont }}
                    >
                      {card.title}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      <button
        type="button"
        onClick={handleNext}
        className="absolute right-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/25 p-1.5 text-white backdrop-blur transition hover:scale-110 hover:bg-black/40 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] md:right-[5%] md:bg-transparent md:p-0"
        aria-label="Siguiente imagen"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke={arrowColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
