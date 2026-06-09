import React from "react";
import { toWebp } from "../lib/media";

export function HeroSlide({ src, alt, eager = false }) {
  return (
    <div className="slide">
      <picture>
        <source srcSet={toWebp(src)} type="image/webp" />
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={eager ? "high" : "auto"}
        />
      </picture>
    </div>
  );
}
