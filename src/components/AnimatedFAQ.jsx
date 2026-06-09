import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqItems = [
  {
    q: "¿Hacen envío e instalación?",
    a: "Sí. Instalamos en Córdoba Capital y alrededores. Si estás fuera de la zona, coordinamos la mejor alternativa según distancia y tipo de portón.",
  },
  {
    q: "¿Tienen garantía?",
    a: "Sí. Trabajamos con garantía por materiales, mano de obra y motores. Además, dejamos el portón probado y funcionando al finalizar la instalación.",
  },
  {
    q: "¿Puedo automatizar mi portón actual?",
    a: "En muchos casos sí. Revisamos peso, estado, apertura y espacio disponible para recomendar el motor correcto.",
  },
  {
    q: "¿Cuánto demora la fabricación?",
    a: "El plazo habitual de fabricación es de 25 a 30 días, dependiendo del modelo, medidas y terminación elegida.",
  },
  {
    q: "¿Cómo pido un presupuesto?",
    a: "Podés escribir por WhatsApp con fotos, medidas aproximadas y ubicación. Con eso armamos una primera cotización y luego coordinamos la visita técnica.",
  },
];

export function AnimatedFAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden py-14 sm:py-20 bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00c2b8]/50 to-transparent" />
      <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54]">
            Preguntas frecuentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-500">
            Lo esencial antes de pedir un portón a medida, claro y sin vueltas.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 sm:mt-10 grid gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <motion.div
                key={item.q}
                variants={{
                  hidden: { opacity: 0, y: 18 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className={[
                  "overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300",
                  isOpen
                    ? "border-[#00c2b8]/50 shadow-[0_16px_40px_rgba(21,79,84,0.10)]"
                    : "border-gray-100 hover:border-[#154f54]/20",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="group flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={[
                        "grid h-8 w-8 shrink-0 place-content-center rounded-full text-sm font-bold transition-colors",
                        isOpen ? "bg-[#154f54] text-white" : "bg-[#e6f3f4] text-[#154f54]",
                      ].join(" ")}
                    >
                      {idx + 1}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-gray-800 group-hover:text-[#154f54]">
                      {item.q}
                    </span>
                  </span>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="grid h-9 w-9 shrink-0 place-content-center rounded-full bg-gray-50 text-[#154f54]"
                  >
                    <ChevronDown size={18} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-gray-600 sm:px-6 sm:pb-6 sm:pl-[4.75rem]">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
