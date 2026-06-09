import React from "react";
import { Instagram } from "lucide-react";

export function Footer({ navItems }) {
  return (
    <footer className="mt-0">
      <div className="bg-gradient-to-b from-[#3a3f45] to-[#2b2f35] text-white">
        <div className="container mx-auto max-w-7xl px-5 sm:px-6 py-10 sm:py-14">
          <div className="grid gap-10 sm:gap-12 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <img
                  src="/logo2.png"
                  alt="Docta Portones"
                  className="h-12 sm:h-14 md:h-16 w-auto"
                  style={{
                    minWidth: "120px",
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
              <p className="mt-5 text-sm leading-relaxed text-white/70 max-w-sm">
                Fabricación e instalación de portones automáticos y manuales.
                Productos que combinan diseño, seguridad y terminaciones de calidad.
              </p>

              <div className="mt-6 flex items-center gap-4">
                <a
                  href="https://www.instagram.com/docta.portones/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white/60 hover:text-white transition"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-extrabold tracking-widest uppercase text-white/50">
                Links de interés
              </h4>
              <ul className="mt-5 space-y-3 text-sm">
                {navItems.map((l) => (
                  <li key={l.id}>
                    <a
                      href={`#${l.id}`}
                      className="group inline-flex items-center gap-3 text-white/75 hover:text-white transition"
                    >
                      <span className="grid h-6 w-6 place-content-center rounded-full bg-white/10 ring-1 ring-white/15 group-hover:bg-[#154f54]/60 group-hover:ring-[#00c2b8]/60 transition text-[#00c2b8] group-hover:text-white text-sm">
                        &gt;
                      </span>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-extrabold tracking-widest uppercase text-white/50">
                Información de contacto
              </h4>

              <div className="mt-5 space-y-4 text-sm text-white/70">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#00c2b8]">Tel.</span>
                  <a className="hover:text-white transition" href="tel:+5493518791565">
                    +54 9 351 879 1565
                  </a>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#00c2b8]">Dir.</span>
                  <div>
                    <div className="font-semibold text-white/90">Paraguay 396</div>
                    <div className="text-white/60 text-xs mt-0.5">
                      Córdoba Capital, Argentina
                    </div>
                    <div className="text-white/55 text-xs">
                      Instalaciones en ciudad y alrededores
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#00c2b8]">Mail</span>
                  <a
                    className="hover:text-white transition break-all"
                    href="mailto:doctaportones@gmail.com"
                  >
                    doctaportones@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 text-center text-xs text-white/40">
            © {new Date().getFullYear()} Docta Portones — Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
