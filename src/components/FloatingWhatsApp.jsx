import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export function FloatingWhatsApp({ href }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="
        group fixed bottom-5 right-5 z-40
        inline-flex h-14 items-center overflow-hidden rounded-full
        bg-[#e8e8e8] px-4 text-[#111]
        ring-1 ring-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_24px_rgba(0,0,0,0.12)]
        transition-colors duration-500 hover:text-white
        sm:bottom-6 sm:right-6
      "
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 180, damping: 16 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="absolute left-1/2 top-full z-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#25D366] transition-all duration-500 ease-out group-hover:-top-10 group-hover:h-40 group-hover:w-[120%]" />
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-content-center transition-transform duration-500 group-hover:translate-x-1">
        <MessageCircle size={24} strokeWidth={2.1} />
      </span>
      <span className="relative z-10 whitespace-nowrap pr-1 text-sm font-bold">
        WhatsApp
      </span>
    </motion.a>
  );
}
