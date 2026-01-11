import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu, X, ArrowRight, Shield, Timer, Wrench,
  Star, CheckCircle2, Phone, MessageCircle
} from 'lucide-react'
import React from "react"

import { Instagram, Facebook, Linkedin } from 'lucide-react'

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000"
const WHATSAPP = 'https://wa.me/5493518791565'

const nav = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'Fabricación', label: 'Fabricación' },
  { id: 'pasos', label: 'Proceso' },
  { id: 'faq', label: 'Preguntas' },
  { id: 'nosotros', label: 'Nosotros' }, // 👈 nuevo
  { id: 'contacto', label: 'Contacto' },
]

const PRODUCT_CARDS = [
  { title: "Levadizos", img: "/img/cards/levadizos.jpg" },
  { title: "Corredizos", img: "/img/cards/corredizos.jpg" },
  { title: "Frentes completos", img: "/img/cards/frentes.jpg" },
  { title: "Batientes", img: "/img/cards/batientes.jpg" },
  { title: "Puertas", img: "/img/cards/puertas.jpg" },
  { title: "Paños fijos", img: "/img/cards/panios.jpg" },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 }
}
function ProductCard({ c }) {
  return (
    <a
      href="#contacto"
      className="
        group relative block overflow-hidden 
        ring-1 ring-black/10 bg-gray-100
        shadow-sm hover:shadow-xl transition-all duration-300
        h-full w-full
      "
    >
      {/* Imagen de fondo - h-full para llenar el contenedor del grid */}
      <img
        src={c.img}
        alt={c.title}
        className="
          absolute inset-0 h-full w-full object-cover
          transition-transform duration-500
          group-hover:scale-[1.06]
        "
        style={{ 
    imageRendering: '-webkit-optimize-contrast', 
    backfaceVisibility: 'hidden' 
  }}
  loading="eager" // Cambia a eager si quieres que carguen rápido con toda su calidad
/>

      {/* Overlay: Degradado para legibilidad del texto */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Recuadro decorativo Docta */}
      <div
        className="
          pointer-events-none absolute inset-4 
          ring-2 ring-[#00c2b8]
          transition-all duration-300
          group-hover:inset-3 group-hover:ring-[#00c2b8]
        "
      />

      {/* Contenedor de Texto: h-full y flex items-end para empujar el texto abajo */}
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

          {/* Línea decorativa inferior */}
          <div
            className="
              mt-0 h-[2.5px] w-12  bg-[#00c2b8]
              transition-all duration-300
              group-hover:w-16
            "
          />
        </div>
      </div>
    </a>
  )
}

export default function App() {
  const [open, setOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [status, setStatus] = useState(null)

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
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/90 backdrop-blur-lg shadow-[0_2px_8px_rgba(0,0,0,0.03)]">
        <div className="container flex h-20 items-center justify-between px-10 mx-auto max-w-7xl">

          {/* Logo solo la D (mantiene proporción) */}
          <a href="#inicio" className="flex items-center hover:scale-[1.05] transition-transform">
            <img
              src="/icon.png"
              alt="Docta Portones"
              className="h-12 w-auto object-contain"
              style={{ minWidth: "50px" }}
            />
          </a>

          {/* Navegación principal */}
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

          {/* Redes + Botones */}
          <div className="hidden md:flex items-center gap-6 ml-8 pl-8 border-l border-gray-200">
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/docta.portones/"
                title="Instagram"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                title="Facebook"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                title="LinkedIn"
                target="_blank"
                className="text-gray-500 hover:text-[#154f54] transition"
              >
                <Linkedin size={20} />
              </a>
            </div>

            <div className="flex items-center gap-4">
              {/* Botón Llamar */}
              <a
                href={WHATSAPP}
                target="_blank"
                className="flex items-center justify-center gap-2 border border-[#154f54] text-[#154f54] px-5 py-2.5 hover:bg-[#154f54] hover:text-white transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "120px", height: "45px" }}
              >
                <Phone size={18} /> Llamar
              </a>

              {/* Botón Presupuesto */}
              <a
                href="#contacto"
                className="flex items-center justify-center gap-2 bg-[#154f54] text-white px-5 py-2.5 hover:bg-[#1b676b] transition shadow-sm hover:shadow-md font-medium leading-none"
                style={{ minWidth: "160px", height: "45px" }}
              >
                Pedir presupuesto <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Menú Mobile */}
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
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed top-0 right-0 h-screen w-full max-w-xs sm:max-w-sm bg-white text-gray-800 p-6 shadow-lg flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/icon.png" className="h-9 w-auto object-contain" />
                    <span className="font-bold text-[#154f54]">Menú</span>
                  </div>
                  <button
                    className="rounded-xl p-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    <X />
                  </button>
                </div>

                <div className="mt-6">
                  <nav className="flex flex-col gap-2 border-t border-gray-200 pt-6" role="navigation">
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.8"
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 6.75c0 8.284 6.716 15 15 15h1.5a2.25 2.25 0 002.25-2.25v-2.25a1.5 1.5 0 00-1.5-1.5h-3a.75.75 0 00-.75.75v1.5a.75.75 0 01-.75.75 12 12 0 01-12-12 .75.75 0 01.75-.75h1.5a.75.75 0 00.75-.75v-3a1.5 1.5 0 00-1.5-1.5H4.5A2.25 2.25 0 002.25 6.75z"
                      />
                    </svg>
                    Llamar
                  </a>

                  <a
                    href="#contacto"
                    className="flex items-center justify-center gap-2 bg-[#0e5451] text-white font-semibold py-2 rounded-xl hover:bg-[#0b3f3c] transition text-sm md:text-base"
                  >
                    Pedir presupuesto
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>



      {/* HERO ANIMADO AJUSTADO */}
      <section
        id="inicio"
        className="relative h-[80vh] flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Fondo con slideshow */}
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

        {/* Contenido principal */}
        <div className="relative z-10 text-center text-white px-4 w-full">
          <img
            src="/logo.png"
            alt="Docta Portones"
            className="mx-auto mb-10 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl animate-fadeIn"
          />
          <div className="absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full px-4 text-center">
            <h1 className="text-lg md:text-2xl lg:text-3xl  text-white drop-shadow-xl">
              Productos que combinan <span className="text-white font-bold">diseño</span>{" "}<span> y </span>
              {" "}
              <span className="text-white font-bold">seguridad</span>.
            </h1>

            <p className="mt-1 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-200/80 italic drop-shadow-lg">
              Todos nuestros productos y motores cuentan con garantía oficial.
            </p>
          </div>
        </div>
      </section>
      {/* SECCIÓN PRODUCTOS - DISTRIBUCIÓN PERSONALIZADA */}
<section id="productos" className="py-20">
  <div className="container px-4 mx-auto max-w-7xl">
    <motion.h2
      {...fadeIn}
      className="text-3xl md:text-4xl font-bold text-[#154f54] text-center mb-10"
    >
      Nuestros productos
    </motion.h2>

    {/* Grid Principal */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]">
      
      {/* 1. Alargada hacia abajo (Ocupa 2 filas de alto) */}
      <div className="md:col-span-1 md:row-span-2">
        <ProductCard c={PRODUCT_CARDS[0]} size="tall" />
      </div>

      {/* 2. Cuadrada (Arriba) */}
      <div className="md:col-span-1 md:row-span-1">
        <ProductCard c={PRODUCT_CARDS[1]} />
      </div>

      {/* 3. Más alargada horizontalmente (Arriba a la derecha) */}
      <div className="md:col-span-2 md:row-span-1">
        <ProductCard c={PRODUCT_CARDS[2]} />
      </div>

      {/* 4. Cuadrada (Abajo, al lado de la grande) */}
      <div className="md:col-span-1 md:row-span-1">
        <ProductCard c={PRODUCT_CARDS[3]} />
      </div>

      {/* 5. Otra Cuadrada (Ocupa el espacio restante) */}
      {/* Si tienes 6 productos, puedes repetir col-span-1 o estirar uno */}
      <div className="md:col-span-1 md:row-span-1">
        <ProductCard c={PRODUCT_CARDS[4]} />
      </div>

      <div className="md:col-span-1 md:row-span-1">
        <ProductCard c={PRODUCT_CARDS[5]} />
      </div>

    </div>
  </div>
</section>

      {/* GALERÍA */}
      <section id="galeria" className="py-20">
        <div className="container px-4 mx-auto max-w-7xl text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54]">Fabricación</motion.h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {[
              "/img/proyecto1.jpeg",
              "/img/proyecto2.jpeg",
              "/img/proyecto3.jpeg",
              "/img/proyecto4.jpeg",
              "/img/proyecto5.jpeg",
              "/img/proyecto6.jpeg"
            ].map((src, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                className="relative overflow-hidden rounded-3xl ring-1 ring-gray-200 group shadow-sm hover:shadow-md transition"
              >
                <img
                  src={src}
                  alt={`Proyecto ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* CÓMO TRABAJAMOS */}
      <section id="pasos" className="
    relative py-16 sm:py-20 scroll-mt-24
    bg-center bg-cover bg-no-repeat
  "
  style={{
    backgroundImage: "url('/img/bg-como-trabajamos.png')"
  }}>
        <div className="container px-4 mx-auto max-w-7xl">
          {/* Título + descripción */}
          <motion.div
            {...fadeIn}
            className="max-w-3xl"
          >

            <h2 className="mt-3 text-2xl sm:text-3xl md:text-4xl font-bold text-[#154f54]">
              Cómo trabajamos
            </h2>

          </motion.div>

          {/* Steps */}
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
                transition: { staggerChildren: 0.15, duration: 0.5 }
              }
            }}
          >
            {/* 1) Asesoramiento */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ y: -6, boxShadow: "0 18px 35px rgba(0,0,0,0.12)" }}
              transition={{ type: "spring", stiffness: 160, damping: 18 }}
              className="relative rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6 flex flex-col h-full overflow-hidden"
            >
              {/* Badge superior */}
              <div className="flex items-center gap-3 mb-4">
                <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e6f3f4] font-bold text-[#154f54] text-lg">
                  1
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800">Asesoramiento</h3>
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Primer contacto
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span>{" "}
                  Te contactás con nosotros y pedís tu presupuesto.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span>{" "}
                  Cotizamos en base a las medidas que nos pasaste.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span>{" "}
                  Realizamos una visita a tu domicilio para:
                  <ul className="mt-2 ml-4 space-y-1 list-disc">
                    <li>Corroborar medidas.</li>
                    <li>Relevar cómo haríamos la instalación y prever cualquier detalle.</li>
                    <li>
                      Ajustar el presupuesto con las medidas finales para dar el OK y pasar a la fabricación.
                    </li>
                  </ul>
                </li>
              </ul>

              {/* Footer mini */}
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
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Producción a medida
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 flex-1">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span>{" "}
                  Se solicita una seña de aproximadamente el 50% del presupuesto para iniciar la fabricación.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span>{" "}
                  Con las medidas de tu portón y la seña abonada se realiza el pedido a fábrica.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span>{" "}
                  El área de ingeniería se encarga de los planos y de brindar toda la información al sector de producción.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">D.</span>{" "}
                  La fabricación demora entre <span className="font-semibold">25 y 30 días</span>.
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
                  <span className="text-xs uppercase tracking-wide text-gray-400">
                    Puesta en marcha
                  </span>
                </div>
              </div>

              <ul className="space-y-2 text-sm text-gray-600 flex-1 ">
                <li>
                  <span className="font-semibold text-[#154f54]">A.</span>{" "}
                  Con el portón ya fabricado, coordinamos la instalación con el cliente.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">B.</span>{" "}
                  Comenzamos ubicando el portón a nivel y a plomo.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">C.</span>{" "}
                  Lo empotramos, le damos apertura y realizamos la puesta a punto manual.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">D.</span>{" "}
                  Luego automatizamos con el motor correspondiente.
                </li>
                <li>
                  <span className="font-semibold text-[#154f54]">E.</span>{" "}
                  El portón queda instalado, automatizado y funcionando. Este proceso se llama{" "}
                  <span className="italic">instalación en seco con apertura y puesta a punto</span> y demora
                  entre <span className="font-semibold">4 y 6 horas</span>. El portón queda{" "}
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
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54] text-center">Preguntas frecuentes</motion.h2>
          <div className="mt-6 grid gap-4">
            {[
              { q: '¿Hacen envíos e instalación?', a: 'Sí, instalamos en la ciudad y alrededores. Consultanos por tu zona.' },
              { q: '¿Tienen garantía?', a: 'Sí, garantía escrita por materiales y mano de obra.' },
              { q: '¿Puedo automatizar mi portón actual?', a: 'En muchos casos sí. Evaluamos tu caso y te asesoramos.' },
            ].map((item, idx) => (
              <motion.details key={idx} {...fadeIn} className="rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6">
                <summary className="cursor-pointer list-none font-semibold text-gray-800">
                  <span className="inline-flex items-center gap-2 text-[#154f54]"><CheckCircle2 /> {item.q}</span>
                </summary>
                <p className="mt-2 text-sm text-gray-600">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold text-[#154f54]">Sobre nosotros</h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            En Docta Portones nos especializamos en la fabricación e instalación de portones automáticos y manuales.
            Combinamos más de 10 años de experiencia, materiales de primera calidad y atención personalizada.
          </p>
        </div>
      </section>


      {/* CONTACTO */}
      <section id="contacto" className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container grid gap-12 md:grid-cols-2 px-6 mx-auto max-w-7xl items-start">
          {/* Texto lateral */}
          <motion.div {...fadeIn}>
            <h2 className="text-4xl font-bold text-[#154f54]">Contactanos</h2>
            <p className="mt-4 text-gray-600 text-lg">
              Dejanos tu consulta y te responderemos a la brevedad.
              También podés escribirnos directamente por WhatsApp para una atención inmediata.
            </p>
          </motion.div>

          {/* Formulario */}
          <motion.div
            {...fadeIn}
            className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-200 p-8 hover:shadow-xl transition-shadow"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                name="name"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#154f54]"
                placeholder="Nombre"
                required
              />
              <input
                name="email"
                type="email"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#154f54]"
                placeholder="Email o teléfono"
                required
              />
              <textarea
                name="message"
                className="w-full min-h-[130px] rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-700 placeholder:text-gray-400 focus:ring-2 focus:ring-[#154f54]"
                placeholder="Mensaje"
                required
              />

              <div className="flex flex-wrap gap-4 justify-end">
                <a
                  href="https://wa.me/5493518791565"
                  target="_blank"
                  className="flex items-center gap-2 border border-[#154f54] text-[#154f54] px-5 py-3 rounded-xl hover:bg-[#154f54] hover:text-white transition"
                >
                  <MessageCircle size={18} /> WhatsApp
                </a>
                <button
                  type="submit"
                  disabled={sending}
                  className="flex items-center gap-2 bg-[#154f54] text-white px-6 py-3 rounded-xl hover:bg-[#1b676b] transition"
                >
                  {sending ? "Enviando..." : "Enviar Email"}
                </button>
              </div>

              {status === "ok" && (
                <p className="text-green-600 text-sm pt-2">
                  ✅ ¡Mensaje enviado! Te responderemos a la brevedad.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-600 text-sm pt-2">
                  ❌ Hubo un problema. Probá de nuevo o escribinos por WhatsApp.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 px-4 mx-auto max-w-7xl">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-8" />
            <span className="text-sm text-gray-500">© {new Date().getFullYear()} Docta Portones</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <a href="#productos" className="hover:text-[#154f54]">Productos</a>
            <a href="#Fabricación" className="hover:text-[#154f54]"></a>
            <a href="#contacto" className="hover:text-[#154f54]">Contacto</a>
          </div>
        </div>
      </footer>

      {/* BOTÓN WHATSAPP */}
      <a
        href={WHATSAPP}
        target="_blank"
        className="fixed bottom-6 right-6 grid h-12 w-12 place-content-center rounded-full bg-[#154f54] text-white shadow-lg hover:scale-105 transition-transform"
        aria-label="WhatsApp"
      >
        <MessageCircle />
      </a>
    </div>

  )
}
