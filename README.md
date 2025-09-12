# Docta Portones – Landing con React + Vite + Tailwind

## 1) Requisitos
- Node.js 18+ y npm

## 2) Instalar dependencias
```bash
npm i
```

## 3) Ejecutar en desarrollo
```bash
npm run dev
```
Abrí la URL que te aparece en consola.

## 4) Personalizar
- Reemplazá `/public/logo.png` y `/public/icon.png` por tus logos reales.
- Cambiá el número de WhatsApp en `src/App.jsx` (const WHATSAPP).
- Ajustá colores en `tailwind.config.js` (brand y accent).
- Sumá fotos reales a la sección **Galería** (reemplazá los divs por `<img src="/ruta.jpg" />`).

## 5) Build de producción
```bash
npm run build
npm run preview
```

La carpeta `dist` queda lista para subir a Vercel/Netlify/Hostinger/etc.

## 6) Despliegue recomendado: Vercel
```bash
npm i -g vercel
vercel
```
- Elegí el directorio del proyecto
- Build command: `vite build` (por defecto)
- Output: `dist`

## 7) Alternativa: Netlify
- En el dashboard: New site from Git
- Build command: `vite build`
- Publish directory: `dist`

---

### Paleta de colores
- Primario (brand): **#154F54**
- Secundario/Accent: **#4F797D**
- Fondo: `#0B2C30`
- Tarjetas: `#0F3B40`
- Texto: `#EAF1F2`

> Los tonos intermedios están definidos en `tailwind.config.js`.
