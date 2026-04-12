# Tematibox Digital

Marketplace de imprimibles personalizados para cumpleaños y útiles escolares.

## Stack

- Next.js 16 (App Router + Turbopack)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Mercado Pago Checkout Pro

## Branches

| Branch | Versión | Scope |
|---|---|---|
| `main` | Tematibox FULL FLAVOR | Combos físicos + imprimibles |
| `full-flavor` | Snapshot del FULL | Archivo |
| `digital` | **Tematibox Digital** | Solo imprimibles (este branch) |

## Arrancar en local

```bash
npm install
cp .env.local.example .env.local
# editar .env.local con tus credenciales de Mercado Pago
npm run dev
```

Abrir http://localhost:3000

## Features Digital

- 396 productos reales del catálogo DBEDICIONES (imágenes HD locales)
- 23 temas (Stranger Things, Bluey, K-Pop, Guerreras K-Pop, Italian Brainrot, etc.)
- 11 categorías: invitaciones, colorear, escolares, cliparts, etiquetas, toppers, stickers, cotillón-banderines, mega-kit, souvenirs, otros
- Personalización con nombre, edad, fecha del evento
- Checkout Mercado Pago (1 click desde detalle)
- Carrito persistente (localStorage)
- Buscador global con autocomplete
- SEO: sitemap dinámico, robots, schema.org Product + BreadcrumbList
- Analytics: GA4 + Meta Pixel (condicional por env var)
- WhatsApp flotante para soporte

## Deploy

Ver [DEPLOY.md](./DEPLOY.md) para instrucciones paso a paso de Vercel.
