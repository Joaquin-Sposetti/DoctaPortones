import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, UserRound } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

const reviews = [
  {
    name: "Yani Golocovsky",
    text: "Son los mejores sin duda! Excelente la atención desde la cotización, la instalación y el servicio de posventa. Cumplieron con los plazos y con todo lo acordado! Gracias!",
  },
  {
    name: "Santiago Castillo",
    text: "Excelente precio y calidad del portón. Cumplieron con plazo de entrega e instalación. La verdad que súper recomendable",
  },
  {
    name: "Emilce Carlesso",
    text: "Son Exelentes! Responsabilidad Buen Trato y Cumplimiento en Todo !! Da verdadero gusto cuando se trabaja asi!!",
  },
  {
    name: "Diego De Ninnis",
    text: "Excelente trabajo. Cumplieron con el tiempo de entrega, la calidad del producto. Respondieron siempre a todas las inquietudes que nos fueron surgieron. Estoy muy conformes, 100% recomendables.",
  },
  {
    name: "Encantada",
    text: "excelente trabajo !!! super responsables y recomendables! muy muy feliz con el porton y la puerta de mi casa",
  },
  {
    name: "kevin ferreira",
    text: "Quedé muy satisfecho con el trabajo realizado. Instalaron una puerta y un portón en mi casa, cumplieron con los tiempos de entrega acordados y la calidad fue exactamente la prometida. Fueron muy profesionales durante todo el proceso. Los recomiendo totalmente.",
  },
  {
    name: "Marilin Huel",
    text: "Excelente atención. Los técnicos hicieron su trabajo en tiempo y forma a pesar de la lluvia. Atención al cliente con esmero y paciencia. Gracias!! Sigan así!!",
  },
  {
    name: "carol convers",
    text: "Excelente trabajo, cumpliendo en los plazos prometidos! Los recomiendo",
  },
  {
    name: "dani salvanera",
    text: "La verdad que buenisima atención de Lauti y Enzo! Lo mejor es que pudimos ver el producto en persona, probarlo.. Nos sugirieron y resolvieron cada duda. El portón quedó hermoso y cumplieron los tiempos pautados! Excelente calidad!! Súper recomendados!",
  },
];

function useVisibleCards() {
  const [visibleCards, setVisibleCards] = useState(1);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  return visibleCards;
}

export function CustomerReviews() {
  const visibleCards = useVisibleCards();
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleReviews = useMemo(
    () =>
      Array.from({ length: visibleCards }, (_, offset) => {
        const index = (activeIndex + offset) % reviews.length;
        return reviews[index];
      }),
    [activeIndex, visibleCards]
  );

  const goToPrevious = () => {
    setActiveIndex((current) => (current - 1 + reviews.length) % reviews.length);
  };

  const goToNext = () => {
    setActiveIndex((current) => (current + 1) % reviews.length);
  };

  return (
    <section id="resenas" className="relative overflow-hidden bg-white py-12 sm:py-16">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00c2b8]/35 to-transparent" />
      <div className="container mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl font-bold text-[#154f54] sm:text-3xl md:text-4xl">
            Reseñas de clientes
          </h2>
          <p className="mt-3 text-sm text-gray-500 sm:text-base">
            Experiencias reales de clientes que confiaron en DoctaPortones.
          </p>
        </motion.div>

        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 sm:mt-10">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-white via-white/80 to-transparent sm:w-24 lg:w-32" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-white via-white/80 to-transparent sm:w-24 lg:w-32" />

          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-content-center rounded-full bg-white text-[#154f54] shadow-md ring-1 ring-gray-200 transition hover:-translate-x-0.5 hover:ring-[#00c2b8]/60 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] sm:left-6 lg:left-8"
            aria-label="Ver reseña anterior"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
          </button>

          <div className="overflow-hidden px-14 sm:px-20 lg:px-24">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeIndex}-${visibleCards}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="grid gap-4 sm:gap-5"
                style={{
                  gridTemplateColumns: `repeat(${visibleCards}, minmax(0, 1fr))`,
                }}
              >
                {visibleReviews.map((review) => (
                  <article
                    key={`${review.name}-${review.text}`}
                    className="flex h-[235px] flex-col overflow-hidden rounded-xl bg-gray-50 p-4 shadow-sm ring-1 ring-gray-200 sm:h-[250px] sm:p-5 lg:h-[265px]"
                  >
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className="flex items-start gap-3">
                        <div className="grid h-11 w-11 shrink-0 place-content-center rounded-full bg-[#154f54] text-white shadow-sm ring-1 ring-[#00c2b8]/20">
                          <UserRound size={22} strokeWidth={2.2} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-extrabold text-gray-900">
                            {review.name}
                          </h3>
                          <div className="mt-1 flex gap-0.5 text-[#fbbc04]" aria-label="5 estrellas">
                            {Array.from({ length: 5 }).map((_, index) => (
                              <Star key={index} size={16} fill="currentColor" strokeWidth={0} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <p className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1 text-sm leading-relaxed text-gray-600">
                        {review.text}
                      </p>
                    </div>

                    <div className="mt-4 h-[3px] w-12 rounded-full bg-[#00c2b8]" />
                  </article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            type="button"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 grid h-9 w-9 -translate-y-1/2 place-content-center rounded-full bg-white text-[#154f54] shadow-md ring-1 ring-gray-200 transition hover:translate-x-0.5 hover:ring-[#00c2b8]/60 focus:outline-none focus:ring-2 focus:ring-[#00c2b8] sm:right-6 lg:right-8"
            aria-label="Ver siguiente reseña"
          >
            <ChevronRight size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
