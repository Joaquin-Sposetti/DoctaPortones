import React, { useState } from "react";
import { toLowWebp, toWebp } from "../lib/media";

export function GalleryImage({ src, alt, onClick }) {
  const [loaded, setLoaded] = useState(false);
  const webpSrc = toWebp(src);
  const lowResSrc = toLowWebp(src);

  return (
    <button
      onClick={onClick}
      className="
        relative overflow-hidden bg-gray-200 ring-1 ring-gray-200
        shadow-sm hover:shadow-lg transition-all duration-300
        aspect-[4/3] focus:outline-none rounded-lg
      "
    >
      <img
        src={lowResSrc}
        alt=""
        className={`
          absolute inset-0 w-full h-full object-cover rounded-lg
          transition-opacity duration-700
          ${loaded ? "opacity-0" : "opacity-100 blur-sm scale-[1.02]"}
        `}
        aria-hidden="true"
      />

      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          className={`
            absolute inset-0 w-full h-full object-cover rounded-lg
            transition-all duration-700 ease-out
            hover:scale-105
            ${loaded ? "opacity-100" : "opacity-0"}
          `}
          loading="lazy"
          decoding="async"
          onLoad={() => setTimeout(() => setLoaded(true), 400)}
          onError={() => setLoaded(true)}
        />
      </picture>

      {!loaded && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-lg">
          <div className="absolute inset-0 bg-gray-300/60" />
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}
    </button>
  );
}
