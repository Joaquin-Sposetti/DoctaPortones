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
  { id: 'galeria', label: 'Galería' },
  { id: 'pasos', label: 'Cómo trabajamos' },
  { id: 'faq', label: 'Preguntas' },
  { id: 'nosotros', label: 'Sobre nosotros' }, // 👈 nuevo
  { id: 'contacto', label: 'Contacto' },
]

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6 }
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
          className="flex items-center justify-center gap-2 border border-[#154f54] text-[#154f54] px-5 py-2.5 rounded-lg hover:bg-[#154f54] hover:text-white transition shadow-sm hover:shadow-md font-medium leading-none"
          style={{ minWidth: "120px", height: "45px" }}
        >
          <Phone size={18} /> Llamar
        </a>

        {/* Botón Presupuesto */}
        <a
          href="#contacto"
          className="flex items-center justify-center gap-2 bg-[#154f54] text-white px-5 py-2.5 rounded-lg hover:bg-[#1b676b] transition shadow-sm hover:shadow-md font-medium leading-none"
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
  <div className="relative z-10 text-center text-white px-4">
    <img
      src="/logo.png"
      alt="Docta Portones"
      className="mx-auto mb-10 w-72 md:w-96 lg:w-[28rem] drop-shadow-2xl animate-fadeIn"
    />
    <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-white/90 drop-shadow-lg">
      Portones que combinan{" "}
      <span className="text-[#00c2b8] font-bold">seguridad</span> y{" "}
      <span className="text-[#00c2b8] font-bold">elegancia</span>.
    </h1>
    <p className="mt-2 text-sm md:text-base text-gray-200/90 font-light">
      Fabricamos portones automáticos y manuales con garantía real.
    </p>
  </div>
</section>
{/* NUESTROS PRODUCTOS */}
<section id="productos" className="py-20">
  <div className="container px-4 mx-auto max-w-7xl">
    <motion.h2
      {...fadeIn}
      className="text-3xl md:text-4xl font-bold text-[#154f54] text-center"
    >
      Nuestros productos
    </motion.h2>

    <motion.p
      {...fadeIn}
      className="mt-3 text-gray-600 max-w-3xl mx-auto text-center"
    >
      Diseñamos y fabricamos portones corredizos, batientes y levadizos en hierro y chapa plegada.
      Automatización compatible con las principales marcas.
    </motion.p>

    <div className="mt-10 grid gap-6 md:grid-cols-4">
      {[
        {
          title: 'Corredizos',
          icon: <Shield className="text-[#154f54]" />,
          desc: 'Suaves y silenciosos. Ideales para cocheras amplias.',
        },
        {
          title: 'Batientes',
          icon: <Wrench className="text-[#154f54]" />,
          desc: 'Clásicos y resistentes. Apertura hacia adentro o hacia afuera.',
        },
        {
          title: 'Levadizos',
          icon: <Timer className="text-[#154f54]" />,
          desc: 'Aprovechan mejor el espacio. Sistema contrapesado y equilibrado.',
        },
        {
          title: '¿Cómo están hechos?',
          icon: <Star className="text-[#154f54]" />,
          desc: 'Con materiales reforzados, pintura poliuretánica y motores confiables para máxima durabilidad.',
        },
      ].map((c) => (
        <motion.div
          key={c.title}
          {...fadeIn}
          className="rounded-2xl bg-[#f9fdfd] shadow-md ring-1 ring-gray-100 p-6 transition-all hover:shadow-lg text-center"
        >
          <div className="flex items-center justify-center mb-3">
            <div className="rounded-2xl bg-[#e6f3f4] p-3">{c.icon}</div>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{c.title}</h3>
          <p className="mt-3 text-sm text-gray-600">{c.desc}</p>
          <a
            href="#contacto"
            className="mt-4 inline-flex items-center gap-2 text-[#154f54] hover:underline font-medium"
          >
            Ver opciones <ArrowRight size={16} />
          </a>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* GALERÍA */}
      <section id="galeria" className="py-20">
        <div className="container px-4 mx-auto max-w-7xl text-center">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54]">Galería</motion.h2>
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
      <section id="pasos" className="py-20 bg-white">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54]">Cómo trabajamos</motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Asesoramiento', desc: 'Nos contás tu idea y tomamos medidas.' },
              { step: '2', title: 'Fabricación', desc: 'Construimos a medida con materiales de primera.' },
              { step: '3', title: 'Instalación', desc: 'Colocación y prueba. Te dejamos todo funcionando.' }
            ].map((s) => (
              <motion.div key={s.step} {...fadeIn} className="rounded-2xl bg-white shadow-md ring-1 ring-gray-100 p-6 hover:shadow-lg transition">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-content-center rounded-2xl bg-[#e6f3f4] font-bold text-[#154f54]">{s.step}</span>
                  <h3 className="text-lg font-semibold text-gray-800">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold text-[#154f54] text-center">Preguntas frecuentes</motion.h2>
          <div className="mt-6 grid gap-4">
            {[
              { q:'¿Hacen envíos e instalación?', a:'Sí, instalamos en la ciudad y alrededores. Consultanos por tu zona.' },
              { q:'¿Tienen garantía?', a:'Sí, garantía escrita por materiales y mano de obra.' },
              { q:'¿Puedo automatizar mi portón actual?', a:'En muchos casos sí. Evaluamos tu caso y te asesoramos.' },
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
            <a href="#galeria" className="hover:text-[#154f54]">Galería</a>
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
