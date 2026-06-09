import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Clock, MapPin } from "lucide-react";
import { AnimatedFAQ } from "./components/AnimatedFAQ";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { GalleryImage } from "./components/GalleryImage";
import { GalleryModal } from "./components/GalleryModal";
import { HeroSlide } from "./components/HeroSlide";
import { Navbar } from "./components/Navbar";
import { ProductCard } from "./components/ProductCard";
import { ProTextType } from "./components/ProTextType";
import {
  NAV_ITEMS,
  PRODUCT_CARDS,
  PRODUCT_GALLERY,
  PRODUCT_TITLES,
  WHATSAPP,
} from "./data/site";
import { toWebp } from "./lib/media";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
};

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
      <Navbar navItems={NAV_ITEMS} whatsappUrl={WHATSAPP} />

      {/* HERO */}
      <section
        id="inicio"
        className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="slideshow">
            {[
              "/img/proyecto1.jpeg",
              "/img/proyecto2.jpeg",
              "/img/proyecto3.jpeg",
              "/img/proyecto4.jpeg",
              "/img/proyecto5.jpeg",
              "/img/proyecto6.jpeg",
            ].map((src, index) => (
              <HeroSlide
                key={src}
                src={src}
                alt={`Portón ${index + 1}`}
                eager={index === 0}
              />
            ))}
          </div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-4 w-full"
        >
          <motion.img
            src="/logo.png"
            alt="Docta Portones"
            className="mx-auto mb-10 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl animate-fadeIn"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
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
        </motion.div>
      </section>

      {/* ===== PRODUCTOS ===== */}
      <section id="productos" className="py-14 sm:py-20">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <motion.h2 {...fadeIn} className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54] text-center mb-3">
            Nuestros productos
          </motion.h2>
          <motion.p {...fadeIn} className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Fabricamos a medida con materiales de primera calidad.
          </motion.p>

          {/* Mobile: grid 2 columnas / Desktop: bento grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[300px]">
            <div className="col-span-2 md:col-span-1 md:row-span-2 min-h-[200px] rounded-xl">
              <ProductCard c={PRODUCT_CARDS[0]} onSelect={selectProduct} />
            </div>
            <div className="col-span-1 min-h-[160px] md:min-h-0 md:col-span-1 md:row-span-1 ">
              <ProductCard c={PRODUCT_CARDS[1]} onSelect={selectProduct} />
            </div>
            <div className="col-span-1 min-h-[160px] md:min-h-0 md:col-span-2 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[2]} onSelect={selectProduct} />
            </div>
            <div className="col-span-1 min-h-[160px] md:min-h-0 md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[3]} onSelect={selectProduct} />
            </div>
            <div className="col-span-1 min-h-[160px] md:min-h-0 md:col-span-1 md:row-span-1">
              <ProductCard c={PRODUCT_CARDS[4]} onSelect={selectProduct} />
            </div>
            <div className="col-span-2 md:col-span-1 md:row-span-1 min-h-[160px]">
              <ProductCard c={PRODUCT_CARDS[5]} onSelect={selectProduct} />
            </div>
          </div>
        </div>
      </section>

      {/* ===== GALERÍA ===== */}
      <motion.section
        id="producto-galeria"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.35 }}
        className="py-12 sm:py-16 bg-white border-t border-gray-100"
      >
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          {/* Tabs — scroll horizontal en mobile */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:flex-wrap sm:justify-center sm:overflow-visible hide-scrollbar">
            {PRODUCT_TITLES.map((t) => {
              const active = t === activeProduct;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveProduct(t)}
                  className={[
                    "px-4 py-2.5 text-sm font-semibold transition ring-1 whitespace-nowrap rounded-md flex-shrink-0",
                    active
                      ? "bg-[#154f54] text-white ring-[#154f54] shadow-sm"
                      : "bg-white text-gray-700 ring-gray-200 hover:ring-[#154f54]/40 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {t}
                </button>
              );
            })}
          </div>

          <div key={activeProduct} className="mt-6 sm:mt-10 grid gap-3 sm:gap-4 grid-cols-2 sm:grid-cols-2 md:grid-cols-3">
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

      {/* Modal galería */}
      <AnimatePresence>
        {selectedImageIndex !== null && (
          <GalleryModal
            images={currentImages}
            initialIndex={selectedImageIndex}
            onClose={closeModal}
          />
        )}
      </AnimatePresence>

      {/* ===== FABRICACIÓN ===== */}
      <section id="fabricacion" className="py-12 sm:py-16 bg-gray-50">
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54] text-center"
          >
            Fabricación
          </motion.h2>

          <p className="mt-3 text-center text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
            Mirá parte del proceso real de fabricación y algunos trabajos destacados.
          </p>

          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 lg:grid-cols-2 lg:items-stretch">
            {/* VIDEO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden ring-1 ring-gray-200 shadow-sm hover:shadow-md transition bg-white rounded-xl"
            >
              <div className="relative w-full aspect-[3/4] sm:aspect-[4/5] lg:aspect-[5/6]">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover rounded-xl"
                  playsInline
                  poster="/img/fabricacion/poster.webp"
                  preload="metadata"
                  controls={fabPlaying}
                  onPlay={() => setFabPlaying(true)}
                  onPause={() => setFabPlaying(false)}
                >
                  <source src="/video/fabricacion-optimized.mp4" type="video/mp4" />
                  <source src="/video/fabricacion.mp4" type="video/mp4" />
                </video>

                {!fabPlaying && (
                  <div className="absolute inset-0 rounded-xl">
                    <div className="absolute inset-0 bg-black/35 rounded-xl" />
                    <button
                      type="button"
                      onClick={handlePlayFab}
                      className="absolute inset-0 grid place-content-center"
                      aria-label="Reproducir video"
                    >
                      <div className="h-16 w-16 bg-white/90 backdrop-blur shadow-lg grid place-content-center rounded-full hover:scale-105 transition">
                        <div className="ml-1 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-l-[16px] border-l-[#154f54]" />
                      </div>
                    </button>
                    <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none rounded-b-xl">
                      <h3 className="text-white font-bold text-base sm:text-lg">Proceso de fabricación</h3>
                      <p className="mt-1 text-sm text-white/85">Corte, armado y terminación con control de calidad.</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* 2 cards */}
            <div className="flex flex-col gap-4 sm:gap-6">
              {[
                { title: "Armado y soldadura", desc: "Estructura reforzada y terminaciones prolijas.", img: "/img/fabricacion/1.jpg" },
                { title: "Pintura y detalles", desc: "Acabado final para máxima durabilidad.", img: "/img/fabricacion/2.jpg" },
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
                    min-h-[180px] sm:min-h-[220px] lg:flex-1 rounded-xl
                  "
                >
                  <picture>
                    <source srcSet={toWebp(item.img)} type="image/webp" />
                    <img
                      src={item.img}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] rounded-xl"
                      loading="lazy"
                      decoding="async"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent rounded-xl" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <h3 className="text-white font-extrabold text-lg drop-shadow">{item.title}</h3>
                    <p className="mt-1 text-white/85 text-sm drop-shadow">{item.desc}</p>
                    <div className="mt-2 h-[2.5px] w-10 bg-[#00c2b8] transition-all duration-300 group-hover:w-14 rounded-full" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CÓMO TRABAJAMOS ===== */}
      <section
        id="pasos"
        className="relative py-12 sm:py-16 lg:py-20 scroll-mt-24 bg-center bg-cover bg-no-repeat"
        style={{ backgroundImage: "url('/img/bg-como-trabajamos.webp')" }}
      >
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <motion.div {...fadeIn} className="mx-auto max-w-3xl text-center">
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54]">
              Cómo trabajamos
            </h2>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Un proceso claro desde la primera consulta hasta la instalación final.
            </p>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-10 grid gap-4 sm:gap-6 md:gap-8 md:grid-cols-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1, y: 0,
                transition: { staggerChildren: 0.15, duration: 0.5 },
              },
            }}
          >
            {[
              {
                num: 1,
                title: "Asesoramiento",
                sub: "Primer contacto",
                footer: "Ideal para definir bien el proyecto antes de fabricar.",
                items: [
                  { key: "A", text: "Te contactás con nosotros y pedís tu presupuesto." },
                  { key: "B", text: "Cotizamos en base a las medidas que nos pasaste." },
                  { key: "C", text: "Realizamos una visita a tu domicilio para:", sub: ["Corroborar medidas.", "Relevar cómo haríamos la instalación y prever cualquier detalle.", "Ajustar el presupuesto con las medidas finales para dar el OK y pasar a la fabricación."] },
                ],
              },
              {
                num: 2,
                title: "Fabricación",
                sub: "Producción a medida",
                footer: "Todo el proceso se realiza con materiales de primera y control de calidad.",
                items: [
                  { key: "A", text: "Se solicita una seña de aproximadamente el 50% del presupuesto para iniciar la fabricación." },
                  { key: "B", text: "Con las medidas de tu portón y la seña abonada se realiza el pedido a fábrica." },
                  { key: "C", text: "El área de ingeniería se encarga de los planos y de brindar toda la información al sector de producción." },
                  { key: "D", text: (<>La fabricación demora entre <strong>25 y 30 días</strong>.</>) },
                ],
              },
              {
                num: 3,
                title: "Instalación",
                sub: "Puesta en marcha",
                footer: "Te explicamos el uso y quedamos disponibles ante cualquier consulta.",
                items: [
                  { key: "A", text: "Con el portón ya fabricado, coordinamos la instalación con el cliente." },
                  { key: "B", text: "Comenzamos ubicando el portón a nivel y a plomo." },
                  { key: "C", text: "Lo empotramos, le damos apertura y realizamos la puesta a punto manual." },
                  { key: "D", text: "Luego automatizamos con el motor correspondiente." },
                  { key: "E", text: (<>El portón queda instalado, automatizado y funcionando. Este proceso demora entre <strong>4 y 6 horas</strong>. Queda <strong>100% operativo el mismo día</strong>.</>) },
                ],
              },
            ].map((step) => (
              <motion.div
                key={step.num}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                whileHover={{ y: -5, boxShadow: "0 16px 32px rgba(0,0,0,0.10)" }}
                transition={{ type: "spring", stiffness: 160, damping: 18 }}
                className="relative bg-white shadow-md ring-1 ring-gray-100 p-5 sm:p-6 flex flex-col h-full overflow-hidden rounded-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-10 w-10 place-content-center bg-[#e6f3f4] font-bold text-[#154f54] text-lg rounded-lg flex-shrink-0">
                    {step.num}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800">{step.title}</h3>
                    <span className="text-xs uppercase tracking-wide text-gray-400">{step.sub}</span>
                  </div>
                </div>

                <ul className="space-y-2 text-sm text-gray-600 flex-1">
                  {step.items.map((item) => (
                    <li key={item.key}>
                      <span className="font-semibold text-[#154f54]">{item.key}.</span>{" "}
                      {item.text}
                      {item.sub && (
                        <ul className="mt-2 ml-4 space-y-1 list-disc text-xs text-gray-500">
                          {item.sub.map((s, si) => <li key={si}>{s}</li>)}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>

                <div className="mt-4 pt-3 border-t border-dashed border-gray-200 text-xs text-gray-500">
                  {step.footer}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <AnimatedFAQ />

      {/* ===== NOSOTROS ===== */}
      <section id="nosotros" className="relative overflow-hidden py-14 sm:py-20 bg-gray-50">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#154f54]/20 to-transparent" />
        <div className="container px-4 sm:px-6 mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative min-h-[420px] overflow-hidden rounded-2xl shadow-[0_18px_50px_rgba(15,59,64,0.18)] ring-1 ring-black/10"
            >
              <picture>
                <source srcSet={toWebp("/img/fabricacion/1.jpg")} type="image/webp" />
                <img
                  src="/img/fabricacion/1.jpg"
                  alt="Equipo de Docta Portones trabajando en taller"
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </picture>
              <div className="absolute inset-0 bg-gradient-to-t from-[#062f32]/85 via-[#062f32]/20 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.5 }}
                className="absolute bottom-5 left-5 right-5 rounded-2xl bg-[#062f32]/45 p-5 text-white shadow-2xl backdrop-blur-md ring-1 ring-white/25"
              >
                <div className="inline-flex rounded-full bg-white/12 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#00c2b8] ring-1 ring-white/15">
                  Trabajo a medida
                </div>
                <ProTextType
                  text={[
                    "Relevamos cada medida con precisión.",
                    "Fabricamos portones pensados para el uso diario.",
                    "Instalamos y dejamos todo funcionando.",
                  ]}
                  typingSpeed={28}
                  deletingSpeed={16}
                  pauseDuration={4450}
                  className="mt-3 block min-h-[54px] text-base font-semibold leading-relaxed text-white/90 sm:text-lg"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
              className="relative flex min-h-[420px] flex-col justify-center rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-7 lg:p-8"
            >
              <div className="absolute right-6 top-6 h-16 w-16 rounded-full bg-[#00c2b8]/10 blur-xl" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54]">
                Sobre nosotros
              </h2>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-gray-600">
                Nos especializamos en la fabricación e instalación de portones automáticos y manuales. Combinamos materiales de primera calidad, terminaciones prolijas y atención personalizada en cada etapa del proyecto.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { value: "100%", label: "a medida" },
                  { value: "4-6h", label: "instalación" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.12 * index, duration: 0.4 }}
                    className="rounded-xl bg-gray-50 p-3 text-center ring-1 ring-gray-100"
                  >
                    <div className="text-lg sm:text-xl font-extrabold text-[#154f54]">{stat.value}</div>
                    <div className="mt-1 text-[11px] sm:text-xs font-medium uppercase tracking-wide text-gray-400">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: Award, text: "Terminaciones prolijas" },
                  { icon: Clock, text: "Proceso coordinado" },
                  { icon: MapPin, text: "Córdoba y alrededores" },
                ].map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.text}
                      whileHover={{ y: -3 }}
                      className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white p-3 text-xs font-semibold text-gray-600 shadow-sm"
                    >
                      <span className="grid h-8 w-8 shrink-0 place-content-center rounded-full bg-[#e6f3f4] text-[#154f54]">
                        <Icon size={16} />
                      </span>
                      {item.text}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer navItems={NAV_ITEMS} />

      <FloatingWhatsApp href={WHATSAPP} />
    </div>
  );
}
