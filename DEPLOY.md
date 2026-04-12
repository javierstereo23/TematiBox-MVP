# DYNAMO Website — Deploy Guide

**Proyecto:** dynamo.tech — Sitio web corporativo de DYNAMO
**Stack:** Next.js 16 + TypeScript + Tailwind CSS 4 + next-intl
**Fecha:** Abril 2026

---

## Quick Start (Deploy a Vercel)

```bash
# 1. Instalar dependencias (si no estan instaladas)
npm install

# 2. Verificar que buildea OK
npm run build

# 3. Deploy con Vercel CLI
npx vercel --prod
```

Si es la primera vez, Vercel va a pedir:
- Linkear el proyecto (crear nuevo o linkear existente)
- Framework: **Next.js** (se autodetecta)
- Region: **iad1** (ya configurado en vercel.json)

---

## Variables de Entorno (Configurar en Vercel)

Ir a **Vercel Dashboard > Project Settings > Environment Variables** y agregar:

| Variable | Tipo | Descripcion | Ejemplo |
|----------|------|-------------|---------|
| `NEXT_PUBLIC_GA_ID` | Public | Google Analytics 4 Measurement ID | `G-ABC123XYZ` |
| `HUBSPOT_API_KEY` | Secret | API key de HubSpot (Private App) | `pat-na1-xxxx` |
| `RESEND_API_KEY` | Secret | API key de Resend para emails | `re_xxxx` |

### Como obtener cada key:

**Google Analytics (GA4):**
1. Ir a [analytics.google.com](https://analytics.google.com)
2. Admin > Create Property > "dynamo.tech"
3. Data Streams > Add Web Stream > `dynamo.tech`
4. Copiar el Measurement ID (formato `G-XXXXXXXXXX`)

**HubSpot API Key:**
1. Ir a HubSpot > Settings > Integrations > Private Apps
2. Crear nueva Private App con scopes: `crm.objects.contacts.write`
3. Copiar el token (formato `pat-na1-xxxxx`)

**Resend (Email):**
1. Ir a [resend.com](https://resend.com)
2. Crear cuenta y verificar dominio `dynamo.tech`
3. API Keys > Create API Key
4. En `src/lib/notify.ts`, descomentar las lineas de Resend y configurar:
   - `from: 'DYNAMO <noreply@dynamo.tech>'`
   - `to: 'contact@dynamo.tech'`

---

## Estructura del Proyecto

```
dynamo-site/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Todas las paginas (es, en, fr, pt)
│   │   │   ├── page.tsx       # Home
│   │   │   ├── journeys/      # Plataforma Journeys
│   │   │   ├── sat-push/      # SAT Push
│   │   │   ├── cvm/           # CVM & CORE
│   │   │   ├── vas/           # VAS & Managed Services
│   │   │   ├── ota-sim/       # OTA Cloud & SIM
│   │   │   ├── integraciones/ # Integraciones
│   │   │   ├── studio/        # DYNAMO Studio (Empresas)
│   │   │   ├── sobre-nosotros/# About Us
│   │   │   ├── casos-de-exito/# Casos de exito
│   │   │   ├── qualify/       # Lead qualification journey
│   │   │   ├── contacto/      # Formulario de contacto
│   │   │   ├── blog/          # Blog (21 articulos)
│   │   │   ├── roi-calculator/# Calculadora ROI
│   │   │   ├── one-pager-cvm/ # One-pager CVM (gated)
│   │   │   ├── one-pager-vas/ # One-pager VAS (gated)
│   │   │   ├── one-pager-smb/ # One-pager SMB (gated)
│   │   │   ├── legal/         # Politica de privacidad
│   │   │   ├── seguridad/     # Seguridad
│   │   │   └── careers/       # Carreras
│   │   └── api/               # API Routes
│   │       ├── contact/       # Formulario de contacto
│   │       ├── qualify/       # Calificacion de leads
│   │       ├── roi-lead/      # ROI calculator leads
│   │       ├── case-lead/     # Caso de exito gated
│   │       ├── one-pager-lead/# One-pager general
│   │       ├── one-pager-cvm-lead/
│   │       ├── one-pager-vas-lead/
│   │       └── one-pager-smb-lead/
│   ├── components/            # Componentes reutilizables
│   ├── i18n/
│   │   ├── messages/          # Archivos de traduccion
│   │   │   ├── es.json        # Espanol (956 keys)
│   │   │   ├── en.json        # English (956 keys)
│   │   │   ├── fr.json        # Francais (956 keys)
│   │   │   └── pt.json        # Portugues (956 keys)
│   │   ├── routing.ts         # Config de locales
│   │   └── request.ts
│   ├── lib/
│   │   └── notify.ts          # HubSpot + Email notification
│   └── data/
│       └── blog-posts.ts      # 21 articulos del blog
├── public/
│   └── images/                # Imagenes del sitio
├── vercel.json                # Config de Vercel
├── .env.example               # Template de variables
└── package.json
```

---

## Paginas y Rutas (181 paginas estaticas)

| Ruta | Tipo | Descripcion |
|------|------|-------------|
| `/` | SSG | Home (hero + 9 secciones) |
| `/journeys` | SSG | Plataforma de orquestacion (journey builder, 7 tabs, canales) |
| `/sat-push` | SSG | SAT Push (formatos, media kit, objeciones, OTA) |
| `/cvm` | SSG | CVM & CORE Services (self-service) |
| `/vas` | SSG | VAS & Managed Services (marketplace) |
| `/ota-sim` | SSG | OTA Cloud & SIM Application |
| `/integraciones` | SSG | Hub de integraciones (12 canales, APIs) |
| `/studio` | SSG | DYNAMO Studio para empresas |
| `/sobre-nosotros` | SSG | About us, equipo, valores, timeline |
| `/casos-de-exito` | Dynamic | 6 casos anonimizados (gated) |
| `/qualify` | SSG | Journey de calificacion de leads (6 pasos) |
| `/contacto` | SSG | Formulario + datos de contacto |
| `/blog` | SSG | 21 articulos Telco |
| `/blog/[slug]` | SSG | Articulo individual |
| `/roi-calculator` | SSG | Calculadora ROI con gating |
| `/one-pager-cvm` | SSG | One-pager CVM (gated) |
| `/one-pager-vas` | SSG | One-pager VAS (gated) |
| `/one-pager-smb` | SSG | One-pager SMB (gated) |
| `/legal` | SSG | Politica de privacidad |
| `/seguridad` | Dynamic | Seguridad |
| `/careers` | SSG | Oportunidades laborales |

Todas las rutas se generan en 4 idiomas: `/es/...`, `/en/...`, `/fr/...`, `/pt/...`

---

## Dominio y DNS

Para apuntar `dynamo.tech` a Vercel:

1. En Vercel Dashboard > Project > Settings > Domains
2. Agregar `dynamo.tech` y `www.dynamo.tech`
3. En el registrador de dominio, configurar DNS:
   - **A Record:** `76.76.21.21` (Vercel)
   - **CNAME:** `www` -> `cname.vercel-dns.com`
4. Vercel genera el certificado SSL automaticamente

---

## Integraciones Pendientes

### HubSpot CRM
- La integracion esta implementada en `src/lib/notify.ts`
- Crea contactos automaticamente al recibir leads
- Incluye source tracking (Contact Form, Qualify, ROI Calculator, etc.)
- Solo necesita la API key en las env vars

### Email (Resend)
- El codigo esta preparado pero comentado en `src/lib/notify.ts`
- Para activar: descomentar las lineas marcadas y configurar dominio en Resend
- Envia notificacion a `contact@dynamo.tech` por cada lead

### Google Analytics 4
- El tracking esta implementado con consent-aware loading (GDPR compliant)
- Solo se activa si el usuario acepta cookies
- Eventos custom: `page_view`, `cta_click`, `form_submit`, `demo_request`

---

## SEO

- **Sitemap:** Generado automaticamente en `/sitemap.xml` (todas las rutas en 4 idiomas)
- **Robots.txt:** Permite indexacion completa, bloquea `/api/`
- **Metadata:** Cada pagina tiene titulo y descripcion traducidos
- **JSON-LD:** Structured data de Organization en el layout
- **Open Graph:** Tags OG en todas las paginas

---

## Comandos Utiles

```bash
# Desarrollo local
npm run dev

# Build de produccion
npm run build

# Lint
npx eslint src/

# Type check
npx tsc --noEmit

# Preview del build
npm run start

# Deploy a Vercel
npx vercel --prod
```

---

## Checklist Pre-Deploy

- [x] Build exitoso (181/181 paginas, 0 errores)
- [x] ESLint sin errores (0 errors, warnings menores)
- [x] 4 idiomas sincronizados (956 keys cada uno)
- [x] Sitemap completo con todas las rutas
- [x] Metadata i18n en todas las paginas
- [x] Cookie consent GDPR compliant
- [x] JSON-LD structured data
- [x] API routes con HubSpot integration
- [ ] **Configurar env vars en Vercel** (GA4, HubSpot, Resend)
- [ ] **Configurar dominio DNS** (dynamo.tech -> Vercel)
- [ ] **Verificar dominio en Resend** (para emails desde @dynamo.tech)
- [ ] **Crear Property en GA4** y copiar Measurement ID
- [ ] **Crear Private App en HubSpot** con scope contacts.write

---

## Soporte

Cualquier duda sobre el codebase, preguntale a Claude con el contexto de este proyecto.
