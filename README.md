# kemblas-garage-app (v1)

Portafolio público (Vite + React) **dark por defecto**, pensado para desplegar en **Vercel**. El contenido se actualiza editando JSON + imágenes en el repo y haciendo redeploy.

## Requisitos

- Node.js + npm

## Correr local

```bash
npm install
npm run dev
```

## Build (Vercel)

```bash
npm run build
```

- **Output**: `dist/`

## Editar contenido (sin tocar componentes)

Todo está en:

- `src/content/site.json`: nombre del taller, textos del hero, WhatsApp, redes, moneda.
- `src/content/services.json`: lista de servicios y precios “desde”.
- `src/content/products.json`: catálogo de productos (foto + highlights).
- `src/content/works.json`: trabajos realizados (lista estilo chat + detalle con antes/después).

### Imágenes (en repo)

- Logos: `public/brand/`
- Productos: `public/products/<productId>/...`
- Trabajos: `public/works/<workId>/...` (antes/después)

En los JSON referencia rutas absolutas desde `public/`, por ejemplo:

- `/brand/logo.svg`
- `/products/shampoo-neutro/foto-1.jpg`
- `/works/atos-icm-362-2025-12/before-1.jpg`

### WhatsApp

Configura `contact.whatsappPhone` en `src/content/site.json` con un número real (idealmente formato internacional). El link se genera con `wa.me`.

## Deploy en Vercel (rápido)

1. Sube el repo a GitHub.
2. En Vercel: **New Project** → importa el repo.
3. Preset: **Vite**.
4. Build Command: `npm run build`
5. Output Directory: `dist`

Cada commit redeploya automáticamente.
