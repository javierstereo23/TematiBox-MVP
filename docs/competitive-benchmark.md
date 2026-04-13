# Benchmark competitivo — Tematibox vs. el mundo

_Última actualización: 2026-04-12_

Análisis de cómo se posiciona Tematibox Digital frente a los players que
un cliente argentino va a comparar al buscar "invitación digital personalizada
Bluey" o "etiquetas escolares imprimir". Foco en qué **copiamos**, qué
**mejoramos**, y dónde **ganamos** hoy.

---

## 1. El set competitivo

| Player | Dónde lo ves | Fuerte | Débil |
|---|---|---|---|
| **Etsy** | `etsy.com/es` | Inventario infinito · marketplace · SEO · trust internacional | Precios en USD, envío ≥ 14d a AR, cada seller es una experiencia distinta · imposible pagar con MP · comms en inglés |
| **Canva** | `canva.com/templates/` | UX de edición · gratis o casi · comunidad enorme | No personaliza "a mano" · producto final depende del cliente · cero branding emocional |
| **MiCumpleFeliz.com.ar** | `micumplefeliz.com.ar` | Local · catálogo temático · conocida por mamás de IG | Web 2012, PDFs estáticos · sin preview · sin chat · pricing 2019 |
| **Mercado Libre / dbediciones** (nuestro propio origen) | `mercadolibre.com.ar` | MP nativo · reviews · búsqueda AR | Catálogo sin narrativa · sin personalización en vivo · listing genérico de ML |
| **Instagram sellers** (@invitacionesJuli, @imprimiblesBauti, etc.) | IG DMs | Ultra rápidos · trato humano · trending themes al toque | Sin sitio · dependencia de WhatsApp · sin catálogo · sin checkout |

---

## 2. Axis de comparación (1-5, 5 = mejor)

| Capacidad | Etsy | Canva | MiCumple | ML Seller | IG Seller | **Tematibox** |
|---|---|---|---|---|---|---|
| Descubribilidad orgánica (SEO) | 5 | 5 | 3 | 4 | 1 | **3** 📈 |
| Catálogo por tema (Bluey, K-Pop, etc.) | 5 | 3 | 4 | 3 | 2 | **5** |
| Personalización con nombre (hecho a mano) | 2 | 1 | 2 | 3 | 5 | **5** |
| Preview en vivo antes de pagar | 3 | 5 | 1 | 1 | 3 | **4** ✨ |
| Checkout local (MP, cuotas) | 1 | 1 | 3 | 5 | 4 | **5** |
| Entrega digital instantánea | 4 | 5 | 3 | 4 | 3 | **5** |
| Narrativa emocional / branding | 3 | 2 | 2 | 1 | 3 | **5** |
| Soporte / chat humano | 2 | 2 | 2 | 3 | 5 | **4** |
| Retención / remarketing | 5 | 5 | 1 | 2 | 2 | **3** 📈 |
| Precio percibido vs. valor | 4 | 5 | 3 | 3 | 4 | **4** |

**Lectura corta:** Tematibox **lidera** en personalización, narrativa,
checkout local y entrega digital. Todavía **perdemos** en SEO y en
sistemas de retención/lifecycle — ahí hay que apuntar.

---

## 3. Qué hace cada uno **mejor que nosotros**

### Etsy
- **Reviews con foto** en cada producto (prueba social masiva).
- **"You may also like"** post-compra y en carrito, muy tuneado por ML.
- **Gift mode** (pestaña separada "Comprar como regalo") — nosotros no
  tenemos este entry point.
- **Favorites** persistentes sin login (cookie-based).

> _Qué copiamos:_ Gift mode como filtro/ruta dedicada ("Para regalar ·
> viene listo para mandar"). Reviews con upload de foto en órdenes
> aprobadas (post-MVP).

### Canva
- **Preview en tiempo real literal** (el producto es editable).
- **Templates en grid visual gigante** sin metadata intermedia — vos
  ves y clickeás.
- **Shareable link** del diseño sin cerrar — efecto viral.

> _Qué copiamos:_ Mejorar el grid visual (más denso, menos texto sobre
> imagen). Link compartible del producto personalizado para que la mamá
> mande "mirá cómo quedó" a la abuela.

### IG sellers
- **Velocidad de respuesta** (segundos en horario, DM abierto).
- **Tendencias hiper-rápidas** — el lunes sale una peli, el martes ya
  tienen el kit.

> _Qué copiamos:_ El chatbot Vale + handoff a Daniela ya ataca la
> velocidad. **Tendencias rápidas** requiere un pipeline editorial:
> watch list de estrenos, nanobanana on-demand, publicación en < 48h.

### Etsy / Canva (ambos)
- **Email lifecycle** (abandoned cart, win-back, post-purchase, newsletter
  editorial semanal con "lo nuevo").

> _Qué copiamos:_ Ya tenemos captura de email (exit-intent + chat +
> Supabase). Falta el **send** — agendar Resend templates para:
>   1. Cupón (al capturar) ✅ ya hecho
>   2. Confirmación de compra ✅ ya hecho
>   3. Día +1 post-compra: "¿cómo te fue?" + review
>   4. Día +7 post-compra: cross-sell con 10% OFF fidelidad
>   5. Abandoned cart: día +1 con el producto que dejaron
>   6. Newsletter mensual (lo nuevo, tendencias, BTS del equipo)

---

## 4. Qué hacemos **mejor que todos**

- **Diseño**: nadie en AR tiene un scrapbook post-digital coherente.
  Etsy es visualmente ruidoso (maze de sellers), MiCumpleFeliz parece
  2012, IG sellers dependen del algoritmo. Nosotros tenemos IG
  propia + web con identidad.
- **Narrativa humana**: "diseñadoras reales · con el nombre del chico".
  Nadie vende esto. Etsy vende archivos. Canva vende templates. IG
  sellers venden favores. Nosotros vendemos una relación.
- **Stack técnico**: Next 16 + Supabase + MP + Resend + Claude.
  IG sellers no tienen nada. MiCumpleFeliz corre en PHP 2014. Etsy es
  Etsy (gigante pero rígido).
- **Checkout cero fricción**: un solo click desde producto hasta MP
  con cupón auto-aplicado. Etsy te obliga a cuenta + conversion a USD.

---

## 5. Gaps estratégicos (cerrarlos es el roadmap del Q2)

| Gap | Impacto | Effort | Prioridad |
|---|---|---|---|
| **SEO de producto** (sitemap ya está, falta OG dinámico + structured data + long-tail keywords en H1) | +30% orgánico | M | **P0** |
| **Email lifecycle automatizado** (días +1, +7, abandoned) | +25% LTV | M | **P0** |
| **Reviews con foto** en /producto/[slug] | +10% conv | M | P1 |
| **Gift mode** como ruta dedicada | +8% nuevos segmentos | L | P1 |
| **Pipeline tendencias < 48h** (proceso editorial con nanobanana) | Diferenciador market | H | P1 |
| **Shareable preview link** del producto personalizado | Viral loop | M | P2 |
| **App mobile / PWA instalable** | Retención | H | P3 |

---

## 6. Pricing comparado (AR, producto "invitación digital personalizada Bluey")

| Player | Precio ARS | Extras |
|---|---|---|
| Etsy (promedio) | ~$2.500 (USD 2.50) + 14d envío | No personalización "a mano", archivo template |
| Canva Pro | ~$0 (suscripción $2.000/mes) | Editás vos, no hay "hecho" |
| MiCumpleFeliz | ~$1.800 | Archivo genérico, cambio manual por email |
| ML (dbediciones) | ~$2.500 | Mismo producto, sin preview |
| Tematibox | ~$2.500 | **Hecho a mano, preview en vivo, 10% OFF primera compra** |

**Observación:** estamos en el precio promedio del mercado pero
justificamos más valor percibido. Riesgo: si subís a $3.500, perdés a la
mamá budget; si bajás a $1.800 canibalizás el LTV. Recomendación:
**mantener precio + reforzar valor percibido** (lifecycle emails,
reviews con foto, preview real).

---

## 7. Takeaways accionables

1. **Ya ganamos** narrativa y checkout. No tocar eso.
2. **Nos faltan** SEO y email lifecycle — son el roadmap Q2.
3. **Gift mode** es una oportunidad de segmento nuevo sin canibalizar.
4. **Reviews con foto** es el 2x más barato de trust que hay.
5. **Tendencias < 48h** es el moat largo — requiere proceso editorial,
   no sólo código.

Este doc debería revisarse cada trimestre o cuando un competidor haga
un movimiento fuerte (ej. Etsy lanzando MP nativo para AR).
