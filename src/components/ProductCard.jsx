import React, { useState } from "react";
import { motion } from "framer-motion";
import { toLowWebp, toWebp } from "../lib/media";

export function ProductCard({ c, onSelect }) {
  const [loaded, setLoaded] = useState(false);
  const webpSrc = toWebp(c.img);
  const lowResSrc = c.imgLow || toLowWebp(c.img);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect?.(c.title)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="
        group relative block overflow-hidden text-left
        ring-1 ring-black/10 bg-gray-100
        shadow-sm hover:shadow-xl transition-all duration-300
        h-full w-full aspect-[4/3] md:aspect-auto
        rounded-lg
      "
    >
      <div className="absolute inset-0 bg-gray-200 rounded-lg" />

      <img
        src={lowResSrc}
        alt=""
        className={`
          absolute inset-0 h-full w-full object-cover rounded-lg
          transition-opacity duration-700 ease-out
          ${loaded ? "opacity-0" : "opacity-100 blur-sm scale-105"}
        `}
        aria-hidden="true"
      />

      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={c.img}
          alt={c.title}
          className={`
            absolute inset-0 z-0 h-full w-full object-cover rounded-lg
            transition-all duration-700 ease-out
            group-hover:scale-[1.06]
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setLoaded(true)}
        />
      </picture>

      {!loaded && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent rounded-lg" />
      <div
        className="
          pointer-events-none absolute inset-4 z-10
          ring-2 ring-[#00c2b8] transition-all duration-300
          group-hover:inset-3 rounded-sm
        "
      />

      <div className="relative z-20 flex h-full w-full items-end p-5 sm:p-6">
        <div className="w-full">
          <h3
            className="
              font-extrabold text-white drop-shadow-lg
              text-lg sm:text-xl md:text-2xl
              transition-all duration-300
              group-hover:translate-x-1
            "
          >
            {c.title}
          </h3>
          <div className="mt-1 h-[2.5px] w-10 bg-[#00c2b8] transition-all duration-300 group-hover:w-14" />
        </div>
      </div>
    </motion.button>
  );
}
