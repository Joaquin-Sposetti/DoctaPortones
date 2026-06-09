import { AnimatePresence, motion } from "framer-motion";
import { Instagram, Menu, Phone, X } from "lucide-react";
import React, { useState } from "react";
import { GlassyButton } from "./GlassyButton";

export function Navbar({ navItems, whatsappUrl }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
      <div className="container flex h-20 items-center justify-between px-10 mx-auto max-w-7xl">
        <a
          href="#inicio"
          className="flex items-center hover:scale-[1.05] transition-transform"
        >
          <img
            src="/icon.png"
            alt="Docta Portones"
            className="h-12 w-auto object-contain"
            style={{ minWidth: "50px" }}
          />
        </a>

        <nav className="hidden md:flex items-center gap-12 ml-10">
          {navItems.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="
                text-[15px] font-medium text-gray-600
                hover:text-[#00c2b8]
                transition-colors duration-300
                relative group
              "
            >
              {n.label}
              <span
                className="
                  absolute left-0 bottom-[-4px] h-[2px] w-0
                  bg-[#154f54] transition-all duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-gray-200">
          <motion.a
            href="https://www.instagram.com/docta.portones/"
            title="Instagram"
            target="_blank"
            className="grid h-10 w-10 place-content-center rounded-full text-gray-500 transition hover:bg-[#e6f3f4] hover:text-[#154f54]"
            rel="noreferrer"
            whileHover={{ y: -2, rotate: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <Instagram size={20} />
          </motion.a>

          <GlassyButton
            href={whatsappUrl}
            label="Llamar"
            icon={Phone}
          />
        </div>

        <button
          className="md:hidden p-2 hover:bg-gray-100"
          onClick={() => setOpen(true)}
          aria-label="Abrir menú"
        >
          <Menu />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.25 }}
              className="fixed top-0 right-0 h-screen w-full max-w-xs sm:max-w-sm bg-white text-gray-800 p-6 shadow-lg flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/icon.png"
                    className="h-9 w-auto object-contain"
                    alt="Docta Portones"
                  />
                  <span className="font-bold text-[#154f54]">Menú</span>
                </div>
                <button
                  className="p-2 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                  aria-label="Cerrar menú"
                >
                  <X />
                </button>
              </div>

              <div className="mt-6">
                <nav className="flex flex-col gap-2 border-t border-gray-200 pt-6">
                  {navItems.map((n) => (
                    <a
                      key={n.id}
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="px-4 py-3 text-base font-medium hover:bg-gray-100 transition-colors"
                    >
                      {n.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 mt-4 w-full px-4">
                <GlassyButton
                  href="tel:+5493518791565"
                  target="_self"
                  rel=""
                  label="Llamar"
                  icon={Phone}
                  className="w-full justify-center"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
