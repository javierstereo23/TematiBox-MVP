# Supabase setup · Tematibox Digital

Guía paso a paso para terminar de conectar Supabase + Google OAuth.

## 1. Ejecutar el schema SQL (2 min)

1. Abrir Supabase dashboard → proyecto → **SQL Editor** → **New query**
2. Copiar TODO el contenido de `supabase/schema.sql`
3. Pegar en el editor → click **RUN** (o `Cmd+Enter`)
4. Verificar que no haya errores. Deberías ver:
   - 4 tablas creadas: `profiles`, `orders`, `coupons`, `events`
   - 1 trigger: `on_auth_user_created`
   - RLS habilitado en las 4 tablas

Test rápido: **Table Editor** → deberías ver las 4 tablas listadas.

## 2. Configurar Google OAuth (5 min)

### 2a. Obtener credenciales de Google

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear o seleccionar un proyecto (ej: "Tematibox Auth")
3. **APIs & Services → Credentials → Create credentials → OAuth client ID**
4. **Application type:** Web application
5. **Name:** Tematibox Digital
6. **Authorized redirect URIs** — agregar esta URL:
   ```
   https://wtympjjocfarcnkkxxou.supabase.co/auth/v1/callback
   ```
7. **Create** → copiar el **Client ID** y el **Client secret**

### 2b. Conectar con Supabase

1. En Supabase dashboard → **Authentication → Providers**
2. Scroll hasta **Google** → **Enable**
3. Pegar **Client ID** y **Client Secret**
4. **Save**

## 3. Configurar URLs de redirect

Supabase dashboard → **Authentication → URL Configuration**:

- **Site URL:** `https://temati-box-mvp.vercel.app`
- **Redirect URLs** (agregar las dos):
  ```
  http://localhost:3002/auth/callback
  https://temati-box-mvp.vercel.app/auth/callback
  ```

## 4. Agregar env vars en Vercel

Settings → Environment Variables → agregar:

| Name | Value |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wtympjjocfarcnkkxxou.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `sb_publishable_n_1OEscqYwnnQT_WEfKazA_YOWH4Z8e` |

Después → Deployments → Redeploy.

## 5. Probar el flow

En **localhost** (o ya deployado):

1. Abrir el sitio
2. Click **"Ingresar"** en la navbar (arriba a la derecha)
3. Se abre Google → autorizás
4. Vuelve al sitio logueado (ves tu avatar en la navbar)
5. Click sobre el avatar → menu con "Mi cuenta" y "Mis pedidos"

En Supabase:
- **Authentication → Users** → ves el usuario creado
- **Table Editor → profiles** → ves el profile auto-creado por el trigger
- **Table Editor → coupons** → ves el cupón `BIENVENIDA-xxxxxxxx` de 10% OFF

## Schema de tablas (resumen)

- **profiles** — datos extendidos del user (email, full_name, avatar, phone, first_discount_used, source)
- **orders** — pedidos con estado MP y personalización JSON
- **coupons** — cupones personales (ej. 10% OFF primera compra, creado automáticamente al registrarse)
- **events** — tracking de conversion funnel para remarketing

RLS activo en las 4: cada user ve/modifica sólo sus propios datos.
