# Deploy · Tematibox Digital

Este branch (`digital`) es la **versión stripped solo imprimibles**, lista para deploy a Vercel.

## Branches del repo

| Branch | Contenido | Estado |
|---|---|---|
| `main` | Tematibox FULL FLAVOR (combos físicos + imprimibles) | Archivo activo |
| `full-flavor` | Copia del FULL FLAVOR | Snapshot |
| `digital` | Tematibox Digital (solo imprimibles) | **Deploy a Vercel** |

## Primer deploy en Vercel (5 minutos)

### 1. Ir a Vercel
https://vercel.com/new

Ingresá con tu cuenta de GitHub (la que tiene el repo `javierstereo23/TematiBox-MVP`).

### 2. Importar el repo
- Click **"Import Git Repository"**
- Seleccioná `javierstereo23/TematiBox-MVP`
- **⚠️ IMPORTANTE:** En la configuración de **Production Branch**, seleccioná `digital`
- Framework Preset: Next.js (autodetectado)

### 3. Variables de entorno (Environment Variables)
Agregá estas 3 en el panel de configuración antes del primer deploy:

| Variable | Valor TEST (sandbox) |
|---|---|
| `MP_ACCESS_TOKEN` | `TEST-5685498586153699-041215-93eca67e32c54689d9fed4c4fb253e61-257195099` |
| `MP_PUBLIC_KEY` | `TEST-555d3755-3af2-4a64-b61d-2a46bb094832` |
| `NEXT_PUBLIC_SITE_URL` | Dejalo vacío por ahora; después del primer deploy te da la URL |

### 4. Click **Deploy**
Vercel va a buildear y desplegar. En ~2 minutos te da una URL tipo:

```
https://tematibox-mvp-digital-xxxx.vercel.app
```

### 5. Actualizar `NEXT_PUBLIC_SITE_URL`
Con la URL que te dio Vercel:

- Settings → Environment Variables
- Editá `NEXT_PUBLIC_SITE_URL` → pegá la URL completa de arriba (sin slash final)
- Settings → Deployments → "..." del último deploy → **Redeploy**

Esto asegura que los callbacks de Mercado Pago, el sitemap y el schema.org apunten a la URL correcta.

## Deploy con credenciales de producción

Cuando validés todo en sandbox y quieras cobrar real:

1. Panel MP → Aplicación → Credenciales → **Copiás las `APP_USR-...`** (producción)
2. En Vercel → Settings → Environment Variables → editás `MP_ACCESS_TOKEN` y `MP_PUBLIC_KEY`
3. Redeploy

Como `NEXT_PUBLIC_SITE_URL` ahora es HTTPS público, MP activa `auto_return` automáticamente → el comprador vuelve solito al sitio post-pago sin tocar nada.

## Dominio propio

Cuando tengas el dominio (`tematibox.com` u otro):

1. Vercel → Settings → Domains → Add Domain
2. Seguí las instrucciones (apuntar DNS)
3. Editá `NEXT_PUBLIC_SITE_URL` con el dominio nuevo
4. Redeploy

## Variables opcionales (Analytics)

Cuando tengas IDs de GA4 y Meta Pixel:

| Variable | Ejemplo |
|---|---|
| `NEXT_PUBLIC_GA_ID` | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | `1234567890123456` |

Los agregás a Vercel como env vars, redeploy, y los scripts se cargan automáticamente.

## Testing post-deploy

Después del deploy, probá estas rutas:

- `/` → Home con hero animado
- `/imprimibles` → 11 categorías
- `/imprimibles/invitaciones` → 46 productos
- `/producto/imprimible-guerreras-k-pop-etiquetas-fideos-ramen-soda-pop-97539043084` → detalle
- `/sitemap.xml` → 500+ URLs
- Mobile → abrir con el smartphone
- Botón "Comprar con Mercado Pago" → checkout real
