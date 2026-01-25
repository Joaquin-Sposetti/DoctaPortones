import React, { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ArrowRight,
  CheckCircle2,
  Phone,
  MessageCircle,
  Instagram,
  Facebook,
  Linkedin,
} from "lucide-react"



const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"
const WHATSAPP = "https://wa.me/5493518791565"

const nav = [
  { id: "inicio", label: "Inicio" },
  { id: "productos", label: "Productos" },
  { id: "Fabricación", label: "Fabricación" },
  { id: "pasos", label: "Proceso" },
  { id: "faq", label: "Preguntas" },
  { id: "nosotros", label: "Nosotros" },
]

const PRODUCT_CARDS = [
  { title: "Levadizos", img: "/img/cards/levadizos.jpg" },
  { title: "Corredizos", img: "/img/cards/corredizos.jpg" },
  { title: "Frentes completos", img: "/img/cards/frentes.jpg" },
  { title: "Batientes", img: "/img/cards/batientes.jpg" },
  { title: "Puertas", img: "/img/cards/puertas.jpg" },
  { title: "Paños fijos", img: "/img/cards/panios.jpg" },
]

const PRODUCT_TITLES = PRODUCT_CARDS.map((p) => p.title)

/**
 * ⬇️ CAMBIÁ ESTAS RUTAS POR TUS FOTOS REALES (6 por categoría)
 */
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
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 },
}

function ProductCard({ c, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(c.title)}
      className="
        group relative block overflow-hidden text-left
        ring-1 ring-black/10 bg-gray-100
        shadow-sm hover:shadow-xl transition-all duration-300
        h-full w-full
      "
    >
      <img
        src={c.img}
        alt={c.title}
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-500
          group-hover:scale-[1.06]
        "
        style={{
          imageRendering: "-webkit-optimize-contrast",
          backfaceVisibility: "hidden",
        }}
        loading="eager"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div
        className="
          pointer-events-none absolute inset-4
          ring-2 ring-[#00c2b8]
          transition-all duration-300
          group-hover:inset-3 group-hover:ring-[#00c2b8]
        "
      />

      <div className="relative z-10 flex h-full w-full items-end p-6">
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

          <div
            className="
              mt-0 h-[2.5px] w-12 bg-[#00c2b8]
              transition-all duration-300
              group-hover:w-16
            "
          />
        </div>
      </div>
    </button>
  )
}

export default function App() {

  const videoRef = useRef(null)
const [fabPlaying, setFabPlaying] = useState(false)

const handlePlayFab = async () => {
  try {
    const v = videoRef.current
    if (!v) return
    await v.play()
    setFabPlaying(true)
  } catch (e) {
    console.log("No se pudo reproducir el video", e)
  }
}
  const [playFab, setPlayFab] = useState(false)
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

  // ✅ SIEMPRE visible con el primero seleccionado por defecto
  const [activeProduct, setActiveProduct] = useState(PRODUCT_TITLES[0])

  function selectProduct(title) {
    setActiveProduct(title)
    requestAnimationFrame(() => {
      document
        .getElementById("producto-galeria")
        ?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    const form = new FormData(e.currentTarget)
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      message: form.get("message"),
    }

    try {
      const res = await fetch(`${API_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!res.ok) throw new Error("Request failed")
      const data = await res.json()

      if (data.ok) {
        setStatus("ok")
        e.target.reset()
      } else {
        setStatus("error")
      }
    } catch (err) {
      console.error(err)
      setStatus("error")
    } finally {
      setSending(false)
    }
  }

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
                className="text-[15px] font-medium text-gray-600 hover:text-[#154f54] transition-colors"
              >
                {n.label}
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
            className="md:hidden rounded-xl p-2 hover:bg-gray-100"
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
                    className="rounded-xl p-2 hover:bg-gray-100"
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
                        className="rounded-lg px-4 py-3 text-base font-medium hover:bg-gray-100 transition-colors"
                      >
                        {n.label}
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="flex flex-col gap-3 mt-4 w-full px-4">
                  <a
                    href="tel:+5493518791565"
                    className="flex items-center justify-center gap-2 border border-[#0e5451] text-[#0e5451] font-medium py-2 rounded-xl hover:bg-[#0e5451]/10 transition text-sm md:text-base"
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
          <motion.h2
            {...fadeIn}
            className="text-3xl md:text-4xl font-bold text-[#154f54] text-center mb-10"
          >
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
              const active = t === activeProduct
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setActiveProduct(t)}
                  className={[
                    "px-5 py-3 text-sm font-semibold transition ring-1",
                    "rounded-xl",
                    "min-w-[140px]",
                    active
                      ? "bg-[#154f54] text-white ring-[#154f54] shadow-sm"
                      : "bg-white text-gray-700 ring-gray-200 hover:ring-gray-300 hover:bg-gray-50",
                  ].join(" ")}
                >
                  {t}
                </button>
              )
            })}
          </div>

          {/* Grid de 6 imágenes */}
          <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {(PRODUCT_GALLERY[activeProduct] || []).slice(0, 6).map((src, i) => (
              <motion.div
                key={`${activeProduct}-${src}-${i}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.03 }}
                className="relative overflow-hidden rounded-2xl ring-1 ring-gray-200 shadow-sm hover:shadow-md transition"
              >
                <img
                  src={src}
                  alt={`${activeProduct} ${i + 1}`}
                  className="w-full h-64 object-cover"
                  loading="lazy"
                />
              </motion.div>
            ))}
          </div>


        </div>
      </motion.section>

{/* FABRICACIÓN (RESPONSIVE + VIDEO CON POSTER/PLAY) */}
{/* ================= FABRICACIÓN ================= */}
<section id="fabricación" className="py-16 bg-white">
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
        className="relative overflow-hidden rounded-3xl ring-1 ring-gray-200 shadow-sm hover:shadow-md transition bg-white"
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
                <div className="h-16 w-16 rounded-2xl bg-white/90 backdrop-blur shadow-lg grid place-content-center hover:scale-105 transition">
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
              group relative overflow-hidden rounded-3xl
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
              className="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
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
              className="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
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
              className="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
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
                className="rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6"
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


      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-8" alt="Docta Portones" />
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Docta Portones</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#productos" className="hover:text-[#154f54]">Productos</a>
          </div>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 grid h-12 w-12 place-content-center rounded-full bg-[#154f54] text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>
    </div>
  )
}
