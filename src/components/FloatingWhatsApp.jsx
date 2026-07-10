import React from "react";
import { motion } from "framer-motion";
import { WhatsAppLogo } from "./WhatsAppLogo";

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
        bg-[#25D366] px-4 text-white
        ring-1 ring-black/10 shadow-[0_8px_24px_rgba(37,211,102,0.32)]
        transition-colors duration-500
        sm:bottom-6 sm:right-6
      "
      initial={{ opacity: 0, y: 18, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.7, type: "spring", stiffness: 180, damping: 16 }}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="absolute left-1/2 top-full z-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#1ebe5d] transition-all duration-500 ease-out group-hover:-top-10 group-hover:h-40 group-hover:w-[120%]" />
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-content-center transition-transform duration-500 group-hover:translate-x-1">
        <WhatsAppLogo size={24} />
      </span>
      <span className="relative z-10 whitespace-nowrap pr-1 text-sm font-bold">
        WhatsApp
      </span>
    </motion.a>
  );
}
