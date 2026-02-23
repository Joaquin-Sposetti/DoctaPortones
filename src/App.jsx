import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  X as CloseIcon,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";
const WHATSAPP = "https://wa.me/5493518791565";

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "Fabricación", label: "Fabricación" },
  { id: "pasos", label: "Proceso" },
  { id: "faq", label: "Preguntas" },
  { id: "nosotros", label: "Nosotros" },
];

const PRODUCT_CARDS = [
  { title: "Levadizos", img: "/img/cards/levadizos.jpg" },
  { title: "Corredizos", img: "/img/cards/corredizos.jpg" },
  { title: "Frentes completos", img: "/img/cards/frentes.jpg" },
  { title: "Batientes", img: "/img/cards/batientes.jpg" },
  { title: "Puertas", img: "/img/cards/puertas.jpg" },
  { title: "Paños fijos", img: "/img/cards/panios.jpg" },
];

const PRODUCT_TITLES = PRODUCT_CARDS.map((p) => p.title);

const PRODUCT_GALLERY = {
  Levadizos: [
    "/img/galeria/levadizos/1.jpg",
    "/img/galeria/levadizos/2.jpg",
    "/img/galeria/levadizos/3.jpg",
    "/img/galeria/levadizos/4.jpg",
    "/img/galeria/levadizos/5.jpg",
    "/img/galeria/levadizos/6.jpg",
  ],
  Corredizos: [
    "/img/galeria/corredizos/1.jpg",
    "/img/galeria/corredizos/2.jpg",
    "/img/galeria/corredizos/3.jpg",
    "/img/galeria/corredizos/4.jpg",
    "/img/galeria/corredizos/5.jpg",
    "/img/galeria/corredizos/6.jpg",
  ],
  "Frentes completos": [
    "/img/galeria/frentes/1.jpg",
    "/img/galeria/frentes/2.jpg",
    "/img/galeria/frentes/3.jpg",
    "/img/galeria/frentes/4.jpg",
    "/img/galeria/frentes/5.jpg",
    "/img/galeria/frentes/6.jpg",
  ],
  Batientes: [
    "/img/galeria/batientes/1.jpg",
    "/img/galeria/batientes/2.jpg",
    "/img/galeria/batientes/3.jpg",
    "/img/galeria/batientes/4.jpg",
    "/img/galeria/batientes/5.jpg",
    "/img/galeria/batientes/6.jpg",
  ],
  Puertas: [
    "/img/galeria/puertas/1.jpg",
    "/img/galeria/puertas/2.jpg",
    "/img/galeria/puertas/3.jpg",
    "/img/galeria/puertas/4.jpg",
    "/img/galeria/puertas/5.jpg",
    "/img/galeria/puertas/6.jpg",
  ],
  "Paños fijos": [
    "/img/galeria/panios/1.jpg",
    "/img/galeria/panios/2.jpg",
    "/img/galeria/panios/3.jpg",
    "/img/galeria/panios/4.jpg",
    "/img/galeria/panios/5.jpg",
    "/img/galeria/panios/6.jpg",
  ],
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

function ProductCard({ c, onSelect }) {
  const [loaded, setLoaded] = useState(false);

  // Intentamos usar versión -low si existe, sino la original
  const lowResSrc = c.imgLow || c.img?.replace(/(\.\w+)$/, "-low$1");

  return (
    <button
      type="button"
      onClick={() => onSelect?.(c.title)}
      className="
        group relative block overflow-hidden text-left
        ring-1 ring-black/10 bg-gray-100
        shadow-sm hover:shadow-xl transition-all duration-300
        h-full w-full aspect-[4/3] md:aspect-auto
      "
    >
      <div className="absolute inset-0 bg-gray-200" />

      {/* Placeholder de baja resolución */}
      <img
        src={lowResSrc}
        alt=""
        className={`
          absolute inset-0 h-full w-full object-cover
          transition-opacity duration-700 ease-out
          ${loaded ? "opacity-0" : "opacity-100 blur-sm scale-105"}
        `}
        aria-hidden="true"
      />

      {/* Imagen real */}
      <img
        src={c.img}
        alt={c.title}
        className={`
          absolute inset-0 z-0 h-full w-full object-cover
          transition-all duration-700 ease-out
          group-hover:scale-[1.06]
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
      />

      {/* Shimmer mientras no carga */}
      {!loaded && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}

      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div
        className="
          pointer-events-none absolute inset-4 z-10
          ring-2 ring-[#00c2b8] transition-all duration-300
          group-hover:inset-3
        "
      />

      <div className="relative z-20 flex h-full w-full items-end p-6">
        <div className="w-full">
          <h3
            className="
              font-extrabold text-white drop-shadow-lg
              text-xl md:text-2xl
              transition-all duration-300
              group-hover:translate-x-1
            "
          >
            {c.title}
          </h3>
          <div className="mt-0 h-[2.5px] w-12 bg-[#00c2b8] transition-all duration-300 group-hover:w-16" />
        </div>
      </div>
    </button>
  );
}

function GalleryImage({ src, alt, onClick }) {
  const [loaded, setLoaded] = useState(false);

  const lowResSrc = src.replace(/(\.\w+)$/, "-low$1");

  return (
    <button
      onClick={onClick}
      className="
        relative overflow-hidden bg-gray-200 ring-1 ring-gray-200 
        shadow-sm hover:shadow-lg transition-all duration-300
        aspect-[4/3] focus:outline-none
      "
    >
      <img
        src={lowResSrc}
        alt=""
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-opacity duration-700
          ${loaded ? "opacity-0" : "opacity-100 blur-sm scale-[1.02]"}
        `}
        aria-hidden="true"
      />

      <img
        src={src}
        alt={alt}
        className={`
          absolute inset-0 w-full h-full object-cover
          transition-all duration-700 ease-out
          hover:scale-105
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
        loading="lazy"
        onLoad={() => {
          setTimeout(() => setLoaded(true), 400);
        }}
        onError={() => setLoaded(true)}
      />

      {!loaded && (
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gray-300/60" />
          <div className="absolute inset-0 animate-shimmer" />
        </div>
      )}
    </button>
  );
}

// Nuevo componente: GalleryModal
function GalleryModal({ images, initialIndex, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);

  const currentImage = images[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setZoomed(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setZoomed(false);
  };

  const handleImageClick = () => {
    setZoomed(!zoomed);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div
        className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage}
          alt="Imagen ampliada"
          className={`
            max-w-full max-h-[90vh] object-contain cursor-pointer
            transition-transform duration-300
            ${zoomed ? "scale-150" : "scale-100"}
          `}
          onClick={handleImageClick}
        />

        {/* Botones de navegación */}
        <button
  onClick={handlePrev}
  className="
    absolute left-3 md:left-8 top-1/2 -translate-y-1/2
    flex items-center justify-center
    w-14 h-14 md:w-16 md:h-16
    rounded-full
    bg-black/50 backdrop-blur-md border border-white/30
    text-white hover:bg-[#154f54]/80 hover:border-[#00c2b8]/70
    transition-all duration-300
    shadow-xl hover:shadow-2xl hover:scale-110
    focus:outline-none focus:ring-2 focus:ring-[#00c2b8]
    z-50
    glow-arrow                     /* ← aquí */
  "
  aria-label="Imagen anterior"
>
  <ChevronLeft size={32} strokeWidth={3} />
</button>
        <button
          onClick={handleNext}
          className="
            absolute right-4 top-1/2 -translate-y-1/2
            flex items-center justify-center
            w-14 h-14 md:w-16 md:h-16
            rounded-full
            bg-black/50 backdrop-blur-md border border-white/30
            text-white hover:bg-[#154f54]/80 hover:border-[#00c2b8]/70
            transition-all duration-300
            shadow-xl hover:shadow-2xl hover:scale-110
            focus:outline-none focus:ring-2 focus:ring-[#00c2b8]
            z-50
            glow-arrow                     /* ← aquí */
          "
          aria-label="Siguiente"
        >
          <ChevronRight size={48} />
        </button>

        {/* Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-[#00c2b8] transition"
          aria-label="Cerrar"
        >
          <CloseIcon size={32} />
        </button>
      </motion.div>
    </motion.div>
  );
}

export default function App() {
  const videoRef = useRef(null);
  const [fabPlaying, setFabPlaying] = useState(false);

  const handlePlayFab = async () => {
    try {
      const v = videoRef.current;
      if (!v) return;
      await v.play();
      setFabPlaying(true);
    } catch (e) {
      console.log("No se pudo reproducir el video", e);
    }
  };

  const [open, setOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(PRODUCT_TITLES[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  function selectProduct(title) {
    setActiveProduct(title);
    requestAnimationFrame(() => {
      document
        .getElementById("producto-galeria")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const openModal = (index) => {
    setSelectedImageIndex(index);
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  const currentImages = PRODUCT_GALLERY[activeProduct] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 text-gray-900">
      {/* NAVBAR */}
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
  {nav.map((n) => (
    <a
      key={n.id}
      href={`#${n.id}`}
      className="
        text-[15px] font-medium text-gray-600
        hover:text-[#00c2b8]           /* ← aquí se pone verde al pasar el mouse */
        transition-colors duration-300
        relative group
      "
    >
      {n.label}
      {/* Línea que crece debajo (la que ya te gustaba) */}
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
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/docta.portones/"
                title="Instagram"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
                rel="noreferrer"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                title="Facebook"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
                rel="noreferrer"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                title="LinkedIn"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
                rel="noreferrer"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={WHATSAPP}
                target="_blank"
                className="flex items-center justify-center gap-2 border border-[#154f54] text-[#154f54] px-5 py-2.5 hover:bg-[#154f54] hover:text-white transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "120px", height: "45px" }}
                rel="noreferrer"
              >
                <Phone size={18} /> Llamar
              </a>
            </div>
          </div>

          <button
            className="md:hidden p-2 hover:bg-gray-100"
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu />
          </button>
        </div>

        {/* MOBILE MENU */}
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
                    {nav.map((n) => (
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
                  <a
                    href="tel:+5493518791565"
                    className="flex items-center justify-center gap-2 border border-[#0e5451] text-[#0e5451] font-medium py-2 hover:bg-[#0e5451]/10 transition text-sm md:text-base"
                  >
                    <Phone size={16} />
                    Llamar
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="slideshow">
            <div className="slide"><img src="/img/proyecto1.jpeg" alt="Portón 1" /></div>
            <div className="slide"><img src="/img/proyecto2.jpeg" alt="Portón 2" /></div>
            <div className="slide"><img src="/img/proyecto3.jpeg" alt="Portón 3" /></div>
            <div className="slide"><img src="/img/proyecto4.jpeg" alt="Portón 4" /></div>
            <div className="slide"><img src="/img/proyecto5.jpeg" alt="Portón 5" /></div>
            <div className="slide"><img src="/img/proyecto6.jpeg" alt="Portón 6" /></div>
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 w-full">
          <img
            src="/logo.png"
            alt="Docta Portones"
            className="mx-auto mb-10 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl animate-fadeIn"
          />
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 text-center">
            <h1 className="text-lg md:text-2xl lg:text-3xl text-white drop-shadow-xl">
              Productos que combinan <span className="text-white font-bold">diseño</span> y{" "}
              <span className="text-white font-bold">seguridad</span>.
            </h1>

            <p className="mt-1 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-200/80 italic drop-shadow-lg">
              Todos nuestros productos y motores cuentan con garantía oficial.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section id="productos" className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54] text-center mb-10">
            Nuestros productos
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
            <div className="md:col-span-1 md:row-span-2">
              <ProductCard c={PRODUCT_CARDS[0]} onSelect={selectProduct} />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[1]} onSelect={selectProduct} />
            </div>
            <div className="md:col-span-2 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[2]} onSelect={selectProduct} />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[3]} onSelect={selectProduct} />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[4]} onSelect={selectProduct} />
            </div>
            <div className="md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[5]} onSelect={selectProduct} />
            </div>
          </div>
        </div>
      </section>

      {/* ✅ SECCIÓN SIEMPRE VISIBLE */}
      <motion.section
        id="producto-galeria"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="py-16 bg-white border-t border-gray-100"
      >
        <div className="container px-4 mx-auto max-w-7xl">
          {/* ✅ BOTONES CENTRADOS Y MÁS CUADRADOS */}
          <div className="flex flex-wrap justify-center gap-3">
            {PRODUCT_TITLES.map((t) => {
              const active = t === activeProduct;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveProduct(t)}
                  className={[
                    "px-5 py-3 text-sm font-semibold transition ring-1",
                    "min-w-[140px]",
                    active
                      ? "bg-[#154f54] text-white ring-[#154f54] shadow-sm"
                      : "bg-white text-gray-700 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>

          {/* Grid de 6 imágenes */}
          <div key={activeProduct} className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {(PRODUCT_GALLERY[activeProduct] || []).slice(0, 6).map((src, i) => (
              <GalleryImage
                key={src}
                src={src}
                alt={`${activeProduct} ${i + 1}`}
                onClick={() => openModal(i)}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Modal de imagen ampliada */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <GalleryModal
            images={currentImages}
            initialIndex={selectedImageIndex}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* FABRICACIÓN (RESPONSIVE + VIDEO CON POSTER/PLAY) */}
      {/* ================= FABRICACIÓN ================= */}
      <section id="Fabricación" className="py-16 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-[#154f54] text-center"
          >
            Fabricación
          </motion.h2>

          <p className="mt-3 text-center text-gray-600 max-w-2xl mx-auto">
            Mirá parte del proceso real de fabricación y algunos trabajos destacados.
          </p>

          {/* Layout responsive: mobile apilado | desktop 2 columnas */}
          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* ===== VIDEO IZQUIERDA ===== */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-md transition bg-white"
            >
              {/* Aspect responsive (NO gigante) */}
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6]">
                {/* Video real */}
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/video/fabricacion.mp4"
                  poster="/img/fabricacion/poster.jpg"
                  playsInline
                  preload="metadata"
                  controls={fabPlaying}
                  onPlay={() => setFabPlaying(true)}
                  onPause={() => setFabPlaying(false)}
                />

                {/* Overlay con poster + play (solo si NO está reproduciendo) */}
                {!fabPlaying && (
                  <div className="absolute inset-0">
                    {/* Oscurecido */}
                    <div className="absolute inset-0 bg-black/35" />

                    {/* Botón play */}
                    <button
                      type="button"
                      onClick={handlePlayFab}
                      className="absolute inset-0 grid place-content-center"
                      aria-label="Reproducir video"
                    >
                      <div className="h-16 w-16 bg-white/90 backdrop-blur shadow-lg grid place-content-center hover:scale-105 transition">
                        <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-[#154f54]" />
                      </div>
                    </button>

                    {/* Texto inferior */}
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none">
                      <h3 className="text-white font-bold text-lg">
                        Proceso de fabricación
                      </h3>
                      <p className="mt-1 text-sm text-white/85">
                        Corte, armado y terminación con control de calidad.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ===== DERECHA: 2 CARDS APILADAS ===== */}
            <div className="flex flex-col gap-6">
              {[
                {
                  title: "Armado y soldadura",
                  desc: "Estructura reforzada y terminaciones prolijas.",
                  img: "/img/fabricacion/1.jpg",
                },
                {
                  title: "Pintura y detalles",
                  desc: "Acabado final para máxima durabilidad.",
                  img: "/img/fabricacion/2.jpg",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="
                    group relative overflow-hidden
                    ring-1 ring-gray-200 shadow-sm hover:shadow-md transition
                    min-h-[220px] sm:min-h-[240px]
                    lg:flex-1
                  "
                >
                  {/* Imagen full */}
                  <img
                    src={item.img}
                    alt={item.title}
                    className="
                      absolute inset-0 w-full h-full object-cover
                      transition-transform duration-500
                      group-hover:scale-[1.04]
                    "
                    loading="lazy"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />

                  {/* Texto */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <h3 className="text-white font-extrabold text-xl drop-shadow">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-white/85 text-sm drop-shadow">
                      {item.desc}
                    </p>
                    <div className="mt-3 h-[2.5px] w-12 bg-[#00c2b8] transition-all duration-300 group-hover:w-16" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* ================= FIN FABRICACIÓN ================= */}



      {/* CÓMO TRABAJAMOS */}
      <section
        id="pasos"
        className="relative py-16 sm:py-20 scroll-mt-24 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/img/bg-como-trabajamos.png')" }}
      >
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="max-w-3xl">
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54]">
              Cómo trabajamos
            </h2>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 md:gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.15, duration: 0.5 },
              },
            }}
          >
            {/* 1) Asesoramiento */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, boxShadow: "0 18px 35px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
                  1
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">Asesoramiento</h3>
                  <span className="text-xs uppercase tracking-wide text-gray-400">Primer contacto</span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span> Te contactás con nosotros y pedís tu
                  presupuesto.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span> Cotizamos en base a las medidas que nos
                  pasaste.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span> Realizamos una visita a tu domicilio para:
                  <ul className="mt-2 ml-4 space-y-1 list-disc">
                    <li>Corroborar medidas.</li>
                    <li>Relevar cómo haríamos la instalación y prever cualquier detalle.</li>
                    <li>Ajustar el presupuesto con las medidas finales para dar el OK y pasar a la fabricación.</li>
                  </ul>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-500">
                Ideal para definir bien el proyecto antes de fabricar.
              </div>
            </motion.div>

            {/* 2) Fabricación */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, boxShadow: "0 18px 35px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
                  2
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">Fabricación</h3>
                  <span className="text-xs uppercase tracking-wide text-gray-400">Producción a medida</span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span> Se solicita una seña de aproximadamente el
                  50% del presupuesto para iniciar la fabricación.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span> Con las medidas de tu portón y la seña
                  abonada se realiza el pedido a fábrica.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span> El área de ingeniería se encarga de los
                  planos y de brindar toda la información al sector de producción.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">D.</span> La fabricación demora entre{" "}
                  <span className="font-semibold">25 y 30 días</span>.
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-500">
                Todo el proceso se realiza con materiales de primera y control de calidad.
              </div>
            </motion.div>

            {/* 3) Instalación */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, boxShadow: "0 18px 35px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
                  3
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">Instalación</h3>
                  <span className="text-xs uppercase tracking-wide text-gray-400">Puesta en marcha</span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span> Con el portón ya fabricado, coordinamos la
                  instalación con el cliente.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span> Comenzamos ubicando el portón a nivel y a
                  plomo.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span> Lo empotramos, le damos apertura y realizamos
                  la puesta a punto manual.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">D.</span> Luego automatizamos con el motor
                  correspondiente.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">E.</span> El portón queda instalado, automatizado y
                  funcionando. Este proceso se llama{" "}
                  <span className="italic">instalación en seco con apertura y puesta a punto</span> y demora entre{" "}
                  <span className="font-semibold">4 y 6 horas</span>. El portón queda{" "}
                  <span className="font-semibold">100% operativo el mismo día</span>.
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-500">
                Te explicamos el uso y quedamos disponibles ante cualquier consulta.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54] text-center">
            Preguntas frecuentes
          </motion.h2>
          <div className="mt-6 grid gap-4">
            {[
              { q: "¿Hacen envíos e instalación?", a: "Sí, instalamos en la ciudad y alrededores. Consultanos por tu zona." },
              { q: "¿Tienen garantía?", a: "Sí, garantía escrita por materiales y mano de obra." },
              { q: "¿Puedo automatizar mi portón actual?", a: "En muchos casos sí. Evaluamos tu caso y te asesoramos." },
            ].map((item, idx) => (
              <motion.details
                key={idx}
                {...fadeIn}
                className=" bg-white shadow-md ring-1 ring-gray-100 p-6"
              >
                <summary className="cursor-pointer list-none font-semibold text-gray-800">
                  <span className="inline-flex items-center gap-2 text-[#154f54]">
                    <CheckCircle2 size={18} /> {item.q}
                  </span>
                </summary>
                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* NOSOTROS */}
      <section id="nosotros" className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-[#154f54]">Sobre nosotros</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            En Docta Portones nos especializamos en la fabricación e instalación de portones automáticos y manuales.
            Combinamos más de 10 años de experiencia, materiales de primera calidad y atención personalizada.
          </p>
        </div>
      </section>


      {/* FOOTER (estilo como la captura) */}
<footer className="mt-10">
  {/* bloque oscuro */}
  <div className="bg-gradient-to-b from-[#3a3f45] to-[#2b2f35] text-white">
    <div className="container mx-auto max-w-7xl px-6 py-14">
      <div className="grid gap-12 md:grid-cols-3">
        {/* Col 1: Logo + descripción */}
        <div>
          <div className="flex items-center gap-3">
            <img
  src="/logo.png"
  alt="Docta Portones"
  className="h-14 sm:h-16 md:h-20 w-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.35)]"
  style={{ minWidth: "150px" }}
/>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-white/75 max-w-sm">
            Fabricación e instalación de portones automáticos y manuales.
            Productos que combinan diseño, seguridad y terminaciones de calidad.
          </p>
        </div>

        {/* Col 2: Links */}
        <div>
          <h4 className="text-sm font-extrabold tracking-wide uppercase">
            Links de interés
          </h4>

          <ul className="mt-5 space-y-3 text-sm">
            {[
              { id: "inicio", label: "Inicio" },
              { id: "productos", label: "Productos" },
              { id: "Fabricación", label: "Fabricación" },
              { id: "pasos", label: "Proceso" },
              { id: "faq", label: "Preguntas frecuentes" },
              { id: "nosotros", label: "Nosotros" },
            ].map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="group inline-flex items-center gap-3 text-white/80 hover:text-white transition"
                >
                  {/* iconito tipo “flecha” como la captura */}
                  <span className="grid h-6 w-6 place-content-center rounded-full bg-white/10 ring-1 ring-white/15 group-hover:bg-[#154f54]/60 group-hover:ring-[#00c2b8]/60 transition">
                    <span className="text-[#00c2b8] group-hover:text-white transition">
                      ›
                    </span>
                  </span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Contacto */}
        <div>
          <h4 className="text-sm font-extrabold tracking-wide uppercase">
            Información de contacto
          </h4>

          <div className="mt-5 space-y-4 text-sm text-white/75">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[#00c2b8]">☎</span>
              <a className="hover:text-white transition" href="tel:+5493518791565">
                +54 9 351 879 1565
              </a>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[#00c2b8]">📍</span>
              <div>
                <div className="font-semibold text-white/90">Córdoba, Argentina</div>
                <div className="text-white/70">Instalaciones en ciudad y alrededores</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-[#00c2b8]">✉</span>
              <a
                className="hover:text-white transition"
                href="mailto:doctaportones@gmail.com"
              >
                doctaportones@gmail.com
              </a>
            </div>
          </div>

          {/* redes */}
          <div className="mt-6 flex items-center gap-4">
            <a
              href="https://www.instagram.com/docta.portones/"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-white/70 hover:text-white transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </div>

      {/* línea + copyright centrado */}
      <div className="mt-12 pt-8 border-t border-white/10 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Docta Portones — Todos los derechos reservados.
      </div>
    </div>
  </div>
</footer>

      {/* BOTÓN WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 grid h-12 w-12 place-content-center bg-[#154f54] text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>
    </div>
  );
}