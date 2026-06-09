import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function GlassyButton({
  href,
  label,
  icon: Icon = ArrowUpRight,
  className = "",
  iconClassName = "",
  target = "_blank",
  rel = "noreferrer",
  ariaLabel,
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      aria-label={ariaLabel || label}
      className={[
        "group relative inline-flex h-[47px] items-center justify-center overflow-hidden rounded-full",
        "bg-[#e8e8e8] px-6 text-sm font-bold text-black no-underline",
        "ring-1 ring-black/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_8px_24px_rgba(0,0,0,0.12)]",
        "transition-colors duration-500 hover:text-white",
        "focus:outline-none focus:ring-2 focus:ring-[#00c2b8] focus:ring-offset-2",
        className,
      ].join(" ")}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", bounce: 0.1, duration: 0.5 }}
    >
      <span className="absolute left-1/2 top-full z-0 h-3 w-3 -translate-x-1/2 rounded-full bg-[#154f54] transition-all duration-500 ease-out group-hover:-top-10 group-hover:h-36 group-hover:w-[115%]" />
      <span
        className={[
          "relative z-10 mr-3 grid h-5 w-5 shrink-0 place-content-center transition-transform duration-500",
          "group-hover:translate-x-1",
          iconClassName,
        ].join(" ")}
      >
        <Icon size={19} strokeWidth={2.3} />
      </span>
      <span className="relative z-10 whitespace-nowrap">{label}</span>
    </motion.a>
  );
}
