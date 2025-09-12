import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ArrowRight, Shield, Timer, Wrench, Star, CheckCircle2, Phone, MessageCircle } from 'lucide-react'
import React from "react";

const WHATSAPP = 'https://wa.me/5493512042126' // TODO: reemplazar con tu número

const nav = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'productos', label: 'Productos' },
  { id: 'galeria', label: 'Galería' },
  { id: 'pasos', label: 'Cómo trabajamos' },
  { id: 'faq', label: 'Preguntas' },
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

  return (
    <div className="min-h-screen bg-[radial-gradient(70%_70%_at_10%_10%,rgba(79,121,125,0.25),transparent_50%),radial-gradient(70%_70%_at_90%_10%,rgba(21,79,84,0.35),transparent_50%)]">
      {/* Navbar */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-surface/80 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <img src="/logo.png" alt="Docta Portones" className="h-9 w-auto" />
            <span className="font-extrabold tracking-tight text-xl">Docta Portones</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {nav.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="text-sm font-medium text-muted hover:text-white transition-colors">
                {n.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <a href={WHATSAPP} target="_blank" className="btn btn-outline">
              <Phone size={18}/> Llamar
            </a>
            <a href="#contacto" className="btn btn-primary">
              Pedir presupuesto <ArrowRight size={18}/>
            </a>
          </div>

          <button className="md:hidden rounded-xl p-2 hover:bg-white/5" onClick={() => setOpen(true)} aria-label="Abrir menú">
            <Menu />
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-surface/80 backdrop-blur"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.25 }}
                className="fixed top-0 right-0 h-screen w-full max-w-xs sm:max-w-sm bg-surface/90 text-white p-6 shadow-lg flex flex-col"

                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src="/icon.png" className="h-8" />
                    <span className="font-bold">Menú</span>
                  </div>
                  <button className="rounded-xl p-2 hover:bg-white/5" onClick={() => setOpen(false)} aria-label="Cerrar menú">
                    <X />
                  </button>
                </div>
                <div className="mt-6">
  <nav
    className="flex flex-col gap-2 border-t border-white/10 pt-6"
    role="navigation"
  >
    {nav.map((n) => (
      <a
        key={n.id}
        href={`#${n.id}`}
        onClick={() => setOpen(false)}
        className="rounded-lg px-4 py-3 text-base font-medium hover:bg-accent/20 transition-colors"
      >
        {n.label}
      </a>
    ))}
  </nav>
</div>
                <div className="mt-6 grid gap-3">
                  <a href={WHATSAPP} target="_blank" className="btn btn-outline w-full justify-center">
                    <Phone size={18}/> Llamar
                  </a>
                  <a href="#contacto" onClick={() => setOpen(false)} className="btn btn-primary w-full justify-center">
                    Pedir presupuesto <ArrowRight size={18}/>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero */}
      <section id="inicio" className="section">
        <div className="container grid items-center gap-10 md:grid-cols-2">
          <motion.div {...fadeIn}>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-3 py-1 text-xs font-semibold text-accent">
              Calidad · Seguridad · Diseño
            </span>
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Portones que combinan <span className="text-accent">seguridad</span> y <span className="text-accent">elegancia</span>.
            </h1>
            <p className="mt-5 text-lg text-muted">
              Fabricamos e instalamos portones automáticos y manuales a medida. Asesoramiento profesional y garantía real.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <a href="#contacto" className="btn btn-primary">
                Solicitar presupuesto <ArrowRight size={18} />
              </a>
              <a href={WHATSAPP} target="_blank" className="btn btn-outline">
                <MessageCircle size={18}/> WhatsApp
              </a>
            </div>
            <div className="mt-6 flex items-center gap-5 text-sm text-muted">
              <div className="flex items-center gap-2"><Star className="text-accent" size={18}/> Garantía escrita</div>
              <div className="flex items-center gap-2"><Timer className="text-accent" size={18}/> Instalación rápida</div>
            </div>
          </motion.div>

          <motion.div {...fadeIn} className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-gradient-to-br from-brand to-accent/80 shadow-soft ring-1 ring-white/10" />
            <img src="/logo.png" alt="Docta Portones" className="absolute -bottom-6 -right-6 w-40 opacity-20" />
          </motion.div>
        </div>
      </section>

      {/* Productos */}
      <section id="productos" className="section">
        <div className="container">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold">Nuestros productos</motion.h2>
          <motion.p {...fadeIn} className="mt-3 text-muted max-w-3xl">
            Diseñamos y fabricamos portones corredizos, batientes y levadizos en hierro y chapa plegada. Automatización compatible con las principales marcas.
          </motion.p>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { title: 'Corredizos', icon: <Shield className="text-accent" />, desc: 'Suaves y silenciosos. Ideales para cocheras amplias.' },
              { title: 'Batientes', icon: <Wrench className="text-accent" />, desc: 'Clásicos y resistentes. Apertura hacia adentro o afuera.' },
              { title: 'Levadizos', icon: <Timer className="text-accent" />, desc: 'Aprovechan mejor el espacio. Sistema contrapesado.' }
            ].map((c) => (
              <motion.div key={c.title} {...fadeIn} className="card">
                <div className="flex items-center gap-3 text-lg font-semibold">
                  <div className="rounded-2xl bg-accent/15 p-3">
                    {c.icon}
                  </div>
                  {c.title}
                </div>
                <p className="mt-3 text-sm text-muted">{c.desc}</p>
                <a href="#contacto" className="mt-4 inline-flex items-center gap-2 text-accent hover:underline">
                  Ver opciones <ArrowRight size={16}/>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="section">
        <div className="container">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold">Galería</motion.h2>
          <p className="mt-3 text-muted">Algunos trabajos recientes. Reemplazá estas imágenes por fotos reales.</p>
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
      className="relative overflow-hidden rounded-3xl ring-1 ring-white/10 group"
    >
      <img
        src={src}
        alt={`Proyecto ${i + 1}`}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <span className="absolute bottom-3 right-3 rounded-full bg-black/50 text-white px-2 py-1 text-xs">
        Proyecto #{i + 1}
      </span>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* Pasos */}
      <section id="pasos" className="section">
        <div className="container">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold">Cómo trabajamos</motion.h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Asesoramiento', desc: 'Nos contás tu idea y tomamos medidas.' },
              { step: '2', title: 'Fabricación', desc: 'Construimos a medida con materiales de primera.' },
              { step: '3', title: 'Instalación', desc: 'Colocación y prueba. Te dejamos todo funcionando.' }
            ].map((s) => (
              <motion.div key={s.step} {...fadeIn} className="card">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-content-center rounded-2xl bg-accent/15 font-bold text-accent">{s.step}</span>
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section">
        <div className="container">
          <motion.h2 {...fadeIn} className="text-3xl md:text-4xl font-bold">Preguntas frecuentes</motion.h2>
          <div className="mt-6 grid gap-4">
            {[
              {q:'¿Hacen envíos e instalación?', a:'Sí, instalamos en la ciudad y alrededores. Consultanos por tu zona.'},
              {q:'¿Tienen garantía?', a:'Sí, garantía escrita por materiales y mano de obra.'},
              {q:'¿Puedo automatizar mi portón actual?', a:'En muchos casos sí. Evaluamos tu caso y te asesoramos.'},
            ].map((item, idx) => (
              <motion.details key={idx} {...fadeIn} className="card">
                <summary className="cursor-pointer list-none font-semibold">
                  <span className="inline-flex items-center gap-2"><CheckCircle2 className="text-accent" /> {item.q}</span>
                </summary>
                <p className="mt-2 text-sm text-muted">{item.a}</p>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="section">
        <div className="container grid gap-10 md:grid-cols-2">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold">Contactanos</h2>
            <p className="mt-3 text-muted">Dejanos tu consulta y te respondemos a la brevedad.</p>
            <form className="mt-6 grid gap-4 card" onSubmit={(e) => e.preventDefault()}>
              <input className="rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-muted" placeholder="Nombre" />
              <input className="rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-muted" placeholder="Email o teléfono" />
              <textarea className="min-h-[120px] rounded-2xl bg-white/10 px-4 py-3 outline-none placeholder:text-muted" placeholder="Mensaje" />
              <div className="flex gap-3">
                <a href={WHATSAPP} target="_blank" className="btn btn-outline">
                  <MessageCircle size={18}/> Enviar por WhatsApp
                </a>
                <a href="mailto:contacto@doctaportones.com" className="btn btn-primary">
                  Enviar por Email
                </a>
              </div>
              <p className="text-xs text-muted">* El formulario es de ejemplo. Configurá un backend o un servicio de formularios si querés que envíe emails automáticamente.</p>
            </form>
          </motion.div>

          <motion.div {...fadeIn} className="card">
            <h3 className="text-xl font-semibold">Datos útiles</h3>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Teléfono: <span className="text-foreground">351 000 0000</span></li>
              <li>Email: <span className="text-foreground">contacto@doctaportones.com</span></li>
              <li>Horario: Lun a Sáb 9:00–18:00</li>
            </ul>
            <img src="/icon.png" alt="Isotipo Docta" className="mt-6 h-16 opacity-70" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" className="h-8" />
            <span className="text-sm text-muted">© {new Date().getFullYear()} Docta Portones</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="#productos" className="hover:underline">Productos</a>
            <a href="#galeria" className="hover:underline">Galería</a>
            <a href="#contacto" className="hover:underline">Contacto</a>
          </div>
        </div>
      </footer>

      {/* Botón flotante WhatsApp */}
      <a href={WHATSAPP} target="_blank" className="fixed bottom-6 right-6 grid h-12 w-12 place-content-center rounded-full bg-accent text-white shadow-soft hover:scale-105 transition-transform" aria-label="WhatsApp">
        <MessageCircle />
      </a>
    </div>
  )
}
