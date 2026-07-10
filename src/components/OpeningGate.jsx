import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import React, { useEffect, useState } from "react";

const gateLines = Array.from({ length: 9 }, (_, index) => index);

export function OpeningGate() {
  const [visible, setVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (window.location.hash) return undefined;

    const previousScrollRestoration = window.history.scrollRestoration;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    scrollToTop();
    const frame = window.requestAnimationFrame(scrollToTop);
    const settleTimer = window.setTimeout(scrollToTop, 120);
    const restoreTimer = window.setTimeout(() => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    }, prefersReducedMotion ? 650 : 1800);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(settleTimer);
      window.clearTimeout(restoreTimer);
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = previousScrollRestoration;
      }
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timer = window.setTimeout(
      () => setVisible(false),
      prefersReducedMotion ? 520 : 1650
    );

    return () => window.clearTimeout(timer);
  }, [prefersReducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-transparent"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-x-0 bottom-0 h-full origin-top overflow-hidden"
            initial={{ y: "0%" }}
            animate={{ y: prefersReducedMotion ? "-100%" : "-106%" }}
            transition={{
              duration: prefersReducedMotion ? 0.45 : 1.45,
              ease: [0.74, 0.02, 0.24, 0.99],
            }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(115deg,#081719_0%,#132a2d_28%,#384346_50%,#12282b_72%,#071517_100%)]" />
            <div className="absolute inset-0 opacity-45 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.18),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.08),transparent_16%,transparent_84%,rgba(255,255,255,0.08))]" />

            <div className="absolute inset-0 rounded-none border-y border-white/10 bg-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-24px_60px_rgba(0,0,0,0.32)]">
              {gateLines.map((line) => (
                <div
                  key={line}
                  className="absolute left-0 right-0 h-px bg-white/12 shadow-[0_1px_0_rgba(0,0,0,0.45)]"
                  style={{ top: `${(line + 1) * 10}%` }}
                />
              ))}

              <div className="absolute inset-y-0 left-[18%] w-px bg-white/10" />
              <div className="absolute inset-y-0 right-[18%] w-px bg-black/30" />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 to-transparent" />
            </div>

            <div className="absolute left-4 top-0 bottom-0 w-px bg-white/12 sm:left-8" />
            <div className="absolute right-4 top-0 bottom-0 w-px bg-black/40 sm:right-8" />

            <motion.div
              className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/55 to-transparent shadow-[0_20px_45px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0.85 }}
              animate={{ opacity: 0.2 }}
              transition={{
                duration: prefersReducedMotion ? 0.35 : 1.15,
                ease: "easeInOut",
              }}
            />

            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 text-center">
              <img
                src="/icon.png"
                alt=""
                className="h-12 w-auto opacity-85 drop-shadow-[0_10px_22px_rgba(0,0,0,0.45)] sm:h-16"
                draggable="false"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
