import React from "react";

const slides = [
  { src: "/img/publi_portones1.jpg", width: 447, height: 447 },
  { src: "/img/publi_portones2.jpg", width: 599, height: 380 },
];

export function PromoCarousel() {
  return (
    <section aria-label="Publicidad de DoctaPortones" className="overflow-hidden bg-gray-50 px-3 pb-8 pt-2 sm:px-6 sm:pb-12">
      <div
        role="region"
        aria-roledescription="carrusel"
        aria-label="Portones a medida"
        className="relative mx-auto w-full min-w-0 max-w-5xl"
      >
        <div className="promo-carousel-window overflow-hidden">
          <div className="promo-carousel-track flex w-max">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1 ? true : undefined} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4 lg:gap-5 lg:pr-5">
                {[...slides, ...slides, ...slides].map((slide, index) => (
                  <div key={index} className="w-[clamp(8rem,40vw,13rem)] shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-[#154f54]/10">
                    <img
                      src={slide.src}
                      alt={copy === 1 || index > 1 ? "" : `Publicidad de portones DoctaPortones ${index + 1}`}
                      width={slide.width}
                      height={slide.height}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
