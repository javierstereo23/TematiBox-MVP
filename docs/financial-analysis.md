# Análisis financiero Tematibox — estado actual + plan 20x

_Última actualización: 2026-04-13_
_Fuente de datos: scrape de los PDPs de Mercado Libre (seller DBEDICIONES, custId 257195099)_

> ⚠️ **Nota sobre la data**: de los 396 productos del catálogo, logramos
> enriquecer 60 (15%) con `sold` y `rating` reales por PDP antes de que
> ML active su anti-bot (redirect a account-verification en 336 casos).
> Los análisis absolutos son **conservadores** — asumimos que los 60
> productos enriquecidos son los más visibles/con tráfico (los que ML
> muestra sin rate-limit). Para números exactos hace falta CSV del
> tablero de vendedor o token de ML API.

---

## 1. Estado actual — lo que ya sabemos con certeza

### Facturación histórica observable (de los 60 productos medidos)

| Métrica | Valor |
|---|---|
| Unidades vendidas (histórico) | **347** |
| Revenue observado | **$3.0M ARS** |
| Ticket promedio | **$8.670** |
| Productos con al menos 1 venta | 60 de 60 muestreados |
| Rating promedio | **4.91 / 5** |
| Reviews totales | 168 |

**Extrapolación conservadora al catálogo total (396 productos):**
- Si los 60 muestreados son los **top-15% vendedores** → estimado total ≈ 500-700 unidades, **$4M-$6M ARS** histórico.
- Si los 60 son una muestra neutra → estimado total ≈ 2.300 unidades, **$20M ARS** histórico.
- La verdad probablemente está cerca de **$6M-$10M ARS** de revenue histórico en ML.

**Run rate mensual estimado** (asumiendo negocio activo ~18 meses): **$330K-$550K ARS/mes**.

### Calidad de producto

- **4.91/5 promedio** es excelente. El problema no es producto — es volumen.
- **168 reviews** para 42 productos = **4 reviews por producto promedio**. Baja cantidad pero alto rating → ventana clara para push de reviews.

---

## 2. Qué está funcionando — los 3 hits

### 🥇 Guerreras K-Pop (144 unidades, $1.15M ARS, 13 productos)

- **El producto estrella**: "Imprimible Guerreras K-pop Etiquetas Fideos Ramen Soda Pop" → **100 vendidos**, rating 4.8, etiquetado como **"MÁS VENDIDO · 7º en Kits Imprimibles para Fiestas"**.
- El tema representa **38%** del revenue observado con solo **22%** de los productos muestreados.
- 13 productos del tema, ticket promedio $8.900.

### 🥈 Italian Brainrot (88 unidades, $612K ARS, 6 productos)

- **Segundo viral**: "Imprimible Italian Brainrot Para Colorear + Stickers Regalo" → **50 vendidos**.
- Tema relativamente nuevo (emergió 2025-2026) y ya factura. Señal clarísima de que **capturar tendencias temprano vale oro**.
- 6 productos, ticket $6.950 — más barato que K-pop pero volumen alto.

### 🥉 K-Pop Generic + Stranger Things (62 unidades, $584K combinado)

- K-Pop genérico (8 productos, $339K): amplía el umbrella "coreano" más allá de Guerreras.
- Stranger Things (9 productos, $244K): el evergreen de Netflix que no muere.

### Top categorías (por revenue observado)

| Categoría | Productos medidos | Unidades | Revenue | Avg ticket |
|---|---|---|---|---|
| **Etiquetas** | 8 | 123 | **$1.05M** | $8.520 |
| **Colorear** | 10 | 71 | $490K | $6.900 |
| **Toppers** | 6 | 45 | $316K | $7.010 |
| **Cliparts** | 5 | 19 | $193K | $10.200 |
| **Stickers** | 6 | 23 | $187K | $8.120 |

**Insight**: Etiquetas = **35% del revenue con 13% del catálogo**. Colorear mueve volumen pero ticket chico. Cliparts tiene el ticket más alto pero volumen bajo.

---

## 3. Qué NO está funcionando — los gaps

### Catálogo sin tema (60% del inventario)

- **239 productos (60%)** no tienen tema asignado → problema crítico de descubribilidad.
- Si alguien busca "Bluey" o "Stranger Things", estos 239 productos no aparecen por tema.
- **Acción**: clasificar tema sí o sí. Ya está el data model; falta el pase manual o con Claude sobre los títulos.

### Concentración de riesgo

- **Top 5 temas cubren 55% del catálogo temático** (86 de 157 productos temáticos).
- Los otros 29 temas solo 45%.
- Si Guerreras K-Pop se cae de tendencia (pasará), **cae 38% del revenue** sin backup inmediato.

### Pricing plano

- **85% del catálogo está entre $5K-$10K** — sin tiers premium claros.
- **0% productos descontados** — ningún promo activa, ningún bundle.
- Hay 5 productos "premium" >$50K pero son **no-imprimibles** (vestido, monopatín, zapatillas — ruido de catálogo de ML viejo que hay que depurar).

### Cero reviews con foto

- 168 reviews totales, todas texto. **Cero UGC con foto** en ML → desconfianza.
- Ahora ya tenés 4 fotos reales de tus hijos usando productos → **pedirles a los próximos 50 compradores que dejen foto con cupón de 10% OFF**.

### Único badge "MÁS VENDIDO"

- De 60 productos muestreados, **solo 1 tiene badge oficial de ML**. Los badges de ML mueven conversión 2-3x.
- Objetivo: concentrar inversión en los top 5 productos para ganarles badge.

---

## 4. Plan 20x — cómo pasamos de $400K/mes a $8M/mes ARS

### Palanca 1 · Multiplicador de catálogo x2 (quick win, mes 1-2)

- **Clasificar los 239 productos sin tema** → recuperás descubribilidad inmediata.
  - Si 40% de esos productos tienen 5 ventas mensuales cada uno → **+$2M/mes**.
- **Depurar los 5 productos no-imprimibles** (vestido, zapatillas, etc.) → mejor señal de relevancia a ML.
- **ROI**: baja de precio marginal, upside 5-8x en 60 días.

### Palanca 2 · Doblar la apuesta en hits + crear competidores internos (mes 1-3)

- **Guerreras K-Pop tiene 13 productos** → llevalo a 30 (más categorías: invitaciones, cotillón, toppers, stickers, mega-kit, photocards, souvenirs, banderines).
- **Italian Brainrot tiene 6** → 20 productos en 60 días.
- **Nueva cohorte**: identificar 3 tendencias emergentes por mes (nanobanana + watchlist cultural) y drop 5 productos por tendencia en <48h.
- **ROI**: en temas que ya ganan, cada producto nuevo captura ~5-10% del volumen del anterior. 15 productos nuevos × $70K cada uno = **+$1M/mes**.

### Palanca 3 · Pricing tier nuevo (mes 2)

Actualmente todo es $6.9K-$10.9K. Introducir:

| Tier | Precio | Qué es | Expected contribution |
|---|---|---|---|
| **Mini** | $3.900 | 1 imprimible single, agarra impulsivo | +15% unidades, +5% revenue |
| **Core** (actual) | $6.9-$10.9K | Lo que ya tenés | Mantiene |
| **Combo** | $14.900 | 3 imprimibles del mismo tema | +10% ticket promedio, +20% AOV |
| **Mega Kit** | $24.900 | Todo un cumple (invitación + toppers + banderines + souvenirs + colorear) | +30% AOV en cohort 10% compradores |
| **B2B** | $49.900+ | Para colegios / eventos corporativos | Nuevo segmento |

**Ticket promedio esperado**: sube de $8.670 a **~$13.500** (+55%).

### Palanca 4 · Cerrar el loop de email + cupones (infra ya construida, mes 1)

Ya tenés:
- ✅ Exit-intent popup con 10% OFF
- ✅ ChatBot con captura de email + cupón
- ✅ MP webhook que cierra el loop
- ✅ Resend templates para cupón y order confirmation

**Falta (ya task creada #61)**: lifecycle cron con 5 emails más:
- Día +1 post-compra: pedido de review (con cupón de 15% OFF para la próxima si dejan foto)
- Día +3 abandoned cart: recuperación con 10% extra
- Día +7: cross-sell con 1 producto relevante
- Día +30: win-back con 20% OFF y novedades del mes
- Newsletter mensual editorial

**ROI**: captura email de 30% del tráfico → 15% abre → 5% compra con cupón → **+20% LTV**.

### Palanca 5 · Canal Tematibox.com (propio) vs ML (mes 2-4)

- ML cobra **14% de comisión + 0% de data propia** (no ves emails, no podés remarketear).
- Tematibox Digital (el sitio) tiene **0% comisión, 100% data**.
- Actualmente ML = 100% del revenue. **Objetivo**: redirigir 40% del tráfico orgánico al sitio propio en 6 meses.
- Palancas: SEO on-page (✅ hecho), sitemap (✅), lifecycle emails, ads con retargeting (next).

Si el sitio captura **$300K/mes** mes 6 → **~$100K/mes en comisiones ML recuperadas** + lista de email propia.

### Palanca 6 · Ads con audiencias custom (mes 3+)

Infra ya lista:
- ✅ Meta Pixel con advanced matching
- ✅ Eventos `view_category`, `view_theme`, `abandoned_cart`, `coupon_claimed`
- Falta: cuenta publicitaria + creative + budget

Con lista de email de ~2.000 usuarios → lookalike audience en Meta.

**Target sprint ads** (presupuesto $50K/mes):
- **CPA target**: $1.500 (ticket $8.670 = 17% CAC)
- **Escala**: $50K → 33 compras/mes → **+$280K/mes** directo
- **Break-even** en el mes 2 si mantenés retention.

### Palanca 7 · UGC + contenido (mes 2+)

Ya tenés 4 fotos UGC reales. Plan:
- Cada compra pide UGC con cupón 15% OFF
- Estimado 5% acepta → ~3 fotos nuevas/semana con volumen actual
- Escala a feed IG + landing sections + reviews con foto
- **Target**: 50 UGC reales en 3 meses para reemplazar el 100% de las AI stock.

### Palanca 8 · B2B / eventos corporativos (mes 4+)

- Segmento nuevo: colegios privados (Northlands, Lincoln, St. Andrew's — ya los tenemos en copy).
- Producto: **pack de 50 invitaciones + etiquetas + souvenirs** para acto escolar, $80K-$150K por evento.
- 1 colegio / mes × 2 eventos = **$150K-$300K/mes** adicional.
- Canal: outbound directo a coordinadoras de eventos / centros de padres.

---

## 5. Proyección con los 8 multiplicadores

| Mes | Canal ML | Canal propio | Ads retargeting | B2B | **Total** | vs hoy |
|---|---|---|---|---|---|---|
| Hoy | $400K | $0 | $0 | $0 | **$400K** | 1x |
| Mes 2 | $600K | $50K | $0 | $0 | **$650K** | 1.6x |
| Mes 3 | $800K | $150K | $80K | $0 | **$1.03M** | 2.6x |
| Mes 6 | $1.2M | $400K | $280K | $150K | **$2.03M** | 5x |
| Mes 9 | $1.8M | $800K | $500K | $300K | **$3.4M** | **8.5x** |
| Mes 12 | $2.5M | $1.6M | $900K | $500K | **$5.5M** | **13.7x** |
| Mes 18 | $3.5M | $3M | $1.5M | $800K | **$8.8M** | **22x** |

**20x se cumple a los 18 meses** con ejecución disciplinada, sin físicos, sin nuevos canales externos.

---

## 6. Qué NO hacer

- **No bajar precios** para competir con Etsy / sellers chicos de IG. La narrativa "hecho a mano" justifica premium.
- **No abrir categoría físicos todavía** — riesgo de logística + capital de trabajo. Ya acordado, queda pendiente.
- **No migrar a CRM externo** (HubSpot, Customer.io) hasta pasar 2.000 usuarios activos/mes. Hasta ahí, Supabase + Resend alcanza.
- **No diversificar temas más allá de las 3 cabezas (K-Pop, Brainrot, Stranger Things)** hasta tener 30+ productos en cada una. Foco > amplitud.

---

## 7. Top 5 acciones de esta semana

1. **Clasificar los 239 productos sin tema** (5h de trabajo con Claude o manual).
2. **Duplicar Guerreras K-Pop a 25 productos** (crear 12 nuevos de invitación, cotillón, photocards).
3. **Activar cron de lifecycle emails** (task #61, infra lista, 4h).
4. **Depurar los 5 productos ruido del catálogo** (vestido, monopatín, etc.).
5. **Pedir CSV del tablero ML (últimos 6 meses)** → con esa data refino este doc con números duros.

---

## 8. Qué necesitamos para precisión total

- [ ] **CSV export del panel de vendedor ML** — últimos 6 meses de ventas con día / producto / comprador.
- [ ] **Token de ML API** (`client_id` + `access_token`) — para query automatizado y pull incremental.
- [ ] **Costos mensuales** (nanobanana, Vercel, Supabase, Anthropic, Resend) — para margen real.
- [ ] **Tiempo promedio de personalización** por producto → costo laboral por unidad.

Con esto podemos pasar de **proyecciones direccionales** a **forecast con bandas de confianza** y dashboard financiero en `/admin/finance`.
