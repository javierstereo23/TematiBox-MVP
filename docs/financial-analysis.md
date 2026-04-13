# Análisis financiero Tematibox — estado actual + plan 20x

_Última actualización: 2026-04-13_
_Fuente: 6 reportes de facturación oficiales de Mercado Libre (Nov 2025 - Abr 2026), 1.224 filas de cargos deduplicadas en 578 ventas únicas._
_Datasets: `data-import/ml-sales-6mo.json` (sales row-level) + `src/data/products.json` (catálogo)._

---

## 1. Topline — últimos 6 meses (datos duros)

| Métrica | Valor | Nota |
|---|---|---|
| **Ventas únicas** | 578 | ≈ 96 ventas/mes promedio |
| **Unidades vendidas** | 593 | ticket unitario ≈ ventas (1:1) |
| **Revenue bruto (GMV)** | **$5.031.815 ARS** | antes de comisiones |
| **Comisiones ML** | $1.379.903 (27.4%) | mayor al 14.5% nominal — incluye envío subsidiado y cargos por unidad |
| **Revenue neto** | **$3.651.912 ARS** | después de ML, antes de costos propios |
| **Ticket promedio** | **$8.706** | consistente con el catálogo |
| **Compradores únicos** | 546 | 94.9% comprador único, solo 5.1% recompra |
| **Productos con al menos 1 venta** | 150 / 396 | **246 productos (62%) no vendieron ni una unidad en 6 meses** |

**Run rate anual (extrapolado):** ~$10M ARS gross / ~$7.3M ARS neto.

---

## 2. Trend mensual

| Mes | Ventas | Units | GMV | MoM |
|---|---|---|---|---|
| Nov 2025 | 69 | 71 | $805K | — |
| Dic 2025 | 98 | 99 | $723K | **-10.3%** |
| Ene 2026 | 113 | 124 | **$1.094K** | **+51.3%** 🚀 |
| Feb 2026 | 122 | 123 | $954K | -12.8% |
| Mar 2026 | 106 | 106 | $858K | -10.0% |
| Abr 2026 (13 días) | 70 | 70 | $599K | extrapolado **$1.38M** mes completo |

**Insight**:
- **Enero fue el spike real** (+51% MoM) — vuelta al cole + cumples de verano.
- **Desde enero hay caída sostenida** (-13%, -10%). No estacional — es un **signal de que el top producto está madurando**.
- **April en curso va a superar enero** si mantiene el ritmo diario de los 13 primeros días (~$46K/día × 30 = $1.38M). Si se confirma, es **el mejor mes de los últimos 6**.

---

## 3. Concentración — la regla 80/20 a full

De los 150 productos que vendieron al menos 1 unidad:

| Top N | Revenue acumulado | % del total |
|---|---|---|
| **Top 1 producto** | $1.111.135 | **22.1%** |
| Top 5 productos | $1.783.402 | 35.4% |
| Top 10 productos | $2.369.707 | 47.1% |
| Top 20 productos | $3.155.496 | 62.7% |
| **Top 50 productos** | $4.055.608 | **80.6%** |

### El producto estrella: "Imprimible Guerreras K-pop Etiquetas Fideos Ramen Soda Pop"
- **148 unidades vendidas** en 6 meses
- **$1.11M ARS revenue** (22% del negocio con UN SOLO producto)
- **Top-1 de ML por ingresos cada mes desde diciembre**
- Trayectoria mensual: Nov $68K → Dic $158K → **Ene $285K (pico)** → Feb $278K → Mar $210K → Abr $113K (13 días).
- Rating 4.8, badge "MÁS VENDIDO · 7º en Kits Imprimibles para Fiestas"

### Top 10 del semestre
1. **Guerreras K-Pop Etiquetas Ramen** — 148u, $1.11M
2. **Super Kit Guerreras K-Pop** — 13u, $196K
3. *Bikini Victoria's Secret* — 1u, $175K ⚠️ (no es imprimible, ruido)
4. **Topper Roba un Brainrot** — 25u, $163K
5. **Stranger Things Colorear** — 21u, $138K
6. **Kawaii Etiquetas Ramen K-Pop** — 16u, $136K
7. *Lona Victoria's Secret* — 1u, $123K ⚠️ (ruido)
8. **Italian Brainrot Colorear** — 17u, $111K
9. **Kit 127 Argentina HD** — 9u, $111K
10. *producto sin título* — 2u, $105K ⚠️

⚠️ **Hay ~$400K (8%) de revenue de items NO-imprimibles** (bikini, lona, conjuntos, etc.) que son ventas personales viejas del seller en su cuenta ML. Si filtramos el ruido, el negocio real imprimible es **~$4.6M ARS brutos** en 6 meses.

---

## 4. Lo que vende: temas y categorías

### Por categoría ML
| Categoría | Ventas | Revenue | Share |
|---|---|---|---|
| **Kits Imprimibles para Fiestas** | 561 | $4.50M | **89.4%** |
| Trajes de Baño | 1 | $175K | 3.5% ⚠️ ruido |
| Lonas Playeras | 1 | $123K | 2.5% ⚠️ ruido |
| Ebooks | 4 | $47K | 0.9% |
| Otros (invitaciones, separadores, dijes, etc.) | 11 | $83K | 1.7% |

**89% del revenue viene de UNA categoría ML: Kits Imprimibles para Fiestas.** El resto es cola larga.

### Por tema (lectura del catálogo)
- **Guerreras K-Pop** concentra ~30-35% del revenue total (Top 1 + Super Kit + Kawaii Etiquetas + Invitación + Etiquetas Ramen Personalizadas + Mega Pack).
- **Stranger Things** (~5%), **Italian Brainrot** (~5%), **Argentina/Futbol** (~3%).
- **Cumples de verano (toppers, banderines, cotillón)** generan volumen consistente todo el semestre.

---

## 5. Geografía

| Provincia | Ventas | Revenue | % |
|---|---|---|---|
| **Buenos Aires** | 240 | $2.15M | **42.8%** |
| **CABA** | 99 | $881K | 17.5% |
| Santa Fe | 41 | $406K | 8.1% |
| Sin dato | 39 | $324K | 6.4% |
| Córdoba | 41 | $311K | 6.2% |
| Mendoza | 17 | $137K | 2.7% |
| Entre Ríos | 14 | $119K | 2.4% |
| Resto del país (24 provincias) | 87 | $698K | 13.9% |

**AMBA (BA + CABA) = 60% del revenue.** Tu ICP son las mamás de colegios privados de zona norte / CABA — coincide perfecto con la data.

---

## 6. Día de la semana

| Día | Ventas | Revenue |
|---|---|---|
| Domingo | 64 | $540K |
| Lunes | 82 | $650K |
| Martes | 81 | $616K |
| Miércoles | 80 | $722K |
| **Jueves** | 98 | $779K |
| **Viernes** | 91 | $877K 🏆 |
| **Sábado** | 82 | $848K |

**Viernes + Sábado = $1.73M (34% del revenue) en 2/7 del tiempo.** Concentración fuerte en fin de semana → timing ideal para email push los jueves a la tarde.

---

## 7. Retención — el gran problema (y la gran oportunidad)

| Métrica | Valor |
|---|---|
| Compradores únicos | 546 |
| **One-time (1 compra)** | 518 (94.9%) |
| **Repeat (2+ compras)** | 28 (5.1%) |
| Top repeat: ANDREDOM70 | 4 compras |
| CARMIGLIORE, BOLANCLAUDIA | 3 compras cada uno |

**95% de los compradores no vuelven.** Si con lifecycle emails lográs llevar ese número a **20% repeat** (benchmark ecom ARG: 15-25%):

- 518 one-time × 15% reactivación = **78 repeat adicionales**
- × ticket $8.706 = **$676K ARS recuperables/6 meses**
- **+13% revenue sin adquirir un solo cliente nuevo**

Este es el juego más barato que tenés. La infra ya está lista (task #61).

---

## 8. Plan 20x — calibrado con data real

**Baseline**: $5.03M / 6mo = $839K/mes gross, $608K/mes neto (post-ML).
**Target 20x**: ~$16.8M/mes gross o **~$200M/año**.

### Palanca 1 — Depurar ruido del catálogo + focus Guerreras K-Pop (impacto alto, 3h)

**Problema**: top product concentra 22% — si cae, cae todo.
**Solución**:
- Crear **15 productos derivados** de Guerreras K-Pop en 30 días (invitación, kit cotillón, photocards, souvenirs variados, toppers extras, banderines).
- Cada producto derivado captura ~10-15% del volumen del original → **+$170-250K/mes**.
- Remover ruido no-imprimible (bikini, lonas) → mejor relevancia ML.

### Palanca 2 — Activar el 62% dormido del catálogo

**Problema**: 246 productos sin ventas. 239 sin tema asignado (clasificación bloqueada).
**Solución**:
- Clasificar los 239 productos sin tema con Claude Haiku (1h).
- Publicar en el sitio propio con SEO (ya hecho) → catch long-tail orgánico.
- Si 30% de esos 246 productos generan 1 venta/mes → **+74 ventas/mes × $8.7K = +$644K/mes**.

### Palanca 3 — Lifecycle emails (infra lista, 4h de config)

**Problema**: 95% one-time buyers. No mandamos nada después de la compra.
**Solución**: activar task #61. Los 5 touchpoints:
- Día +1 post-compra → review request con cupón 15% OFF próxima
- Día +3 abandoned cart → recovery con 10%
- Día +7 → cross-sell 1 producto del mismo tema
- Día +30 → win-back con 20% OFF novedades
- Newsletter mensual editorial

**Impacto**: +13% revenue via recompra (ver sección 7) = **+$110K/mes base + escala con el volumen**.

### Palanca 4 — Pricing tier nuevo (1 semana)

**Problema**: 73% de ventas concentradas en $5K-$8K. Ticket plano.
**Solución**:
- **Combo** ($14.900): invitación + etiquetas + toppers del mismo tema → captura a quien arma cumple completo
- **Mega Kit** ($24.900): 8-10 piezas para un evento entero
- **B2B** ($49.900+): pack 50 invitaciones para actos escolares

**Si el 15% de compradores suben a Combo** → ticket promedio pasa de $8.7K a **$11.5K** (+32%). Sobre el volumen actual: **+$160K/mes**.

### Palanca 5 — Canal propio (Tematibox.com) en paralelo a ML

**Problema**: 100% dependencia de ML. 27% se va en comisiones.
**Solución**:
- Ya está deployada la web con checkout MP, chatbot, SEO, email capture.
- Redirigir tráfico desde IG + post-compra ML a tematibox.com.
- Si el canal propio captura **30% del volumen ML en 6 meses** = $250K/mes, ahorrás $70K/mes en comisiones = **margen neto +$320K/mes potencial**.

### Palanca 6 — Ads con audiencias remarketing

**Problema**: tráfico orgánico limita el crecimiento.
**Solución**:
- Meta Pixel con advanced matching ya instalado.
- 546 emails de clientes reales → **lookalike audience 1-3%** potente.
- Budget inicial $50K/mes:
  - CPA target $1.500 (ticket $8.700 = 17% CAC)
  - $50K → 33 nuevas compras/mes → **+$287K/mes directo**
  - Con lifecycle (palanca 3) se amortiza en 2 meses.

### Palanca 7 — B2B eventos escolares (mes 4+)

**Problema**: nicho corporativo/institucional sin explorar.
**Solución**:
- Pack de 50 invitaciones + cotillón + souvenirs personalizados para acto escolar.
- $80K-$150K por evento.
- Outbound a coordinadoras de Northlands, Lincoln, St. Andrew's (ya los citás en el copy).
- 2 eventos/mes × $100K = **+$200K/mes**.

### Palanca 8 — Capturar tendencias <48h (Italian Brainrot playbook)

**Observación**: Italian Brainrot entró en dic y ya vende $111K en 6 meses con solo 6 productos. K-Pop explotó también en 2025.
**Solución**: proceso editorial para identificar la próxima viral:
- Watchlist (Netflix estrenos, TikTok trending, K-pop debuts)
- Pipeline nanobanana → 5 productos en <48h
- Si 2 tendencias/año peguen como Brainrot = **+$200K/año cada una**.

---

## 9. Proyección calibrada

**Con baseline real de $839K/mes:**

| Mes | Canal ML | Canal propio | Ads | B2B | Combos/ticket | **Total** | vs hoy |
|---|---|---|---|---|---|---|---|
| Hoy | $839K | $0 | $0 | $0 | — | **$839K** | 1x |
| Mes 2 | $950K | $80K | $0 | $0 | — | **$1.03M** | 1.2x |
| Mes 3 | $1.1M | $180K | $100K | $0 | +$80K | **$1.46M** | 1.7x |
| Mes 6 | $1.5M | $450K | $350K | $200K | +$200K | **$2.7M** | **3.2x** |
| Mes 9 | $2.0M | $900K | $600K | $350K | +$320K | **$4.2M** | **5x** |
| Mes 12 | $2.8M | $1.8M | $1.1M | $500K | +$520K | **$6.7M** | **8x** |
| Mes 18 | $4.0M | $3.5M | $2.0M | $800K | +$800K | **$11.1M** | **13x** |
| Mes 24 | $5.5M | $5.5M | $3.0M | $1.2M | +$1.2M | **$16.4M** | **19.5x** ≈ **20x** |

**20x se alcanza entre mes 20 y 24**, no 18. Más realista con la data dura.

---

## 10. Qué NO está funcionando (y hay que arreglar)

1. **246 productos muertos** (62% del catálogo sin 1 venta en 6 meses) — clasificar + relanzar o despublicar.
2. **Riesgo de concentración**: Top 1 producto = 22%. Si Guerreras K-Pop pasa de moda, derrumbe.
3. **95% one-time buyers** sin lifecycle emails = revenue dejando la mesa.
4. **Ticket plano**: 73% en $5K-$8K. Sin tiers premium capturables.
5. **Ruido no-imprimible** (bikini, lonas) ensucia categoría ML y señal de relevancia.
6. **Tendencia negativa Feb-Mar-Abr**: el top product está saturando. Urge diversificar antes de que caiga.

---

## 11. Top 5 acciones de esta semana

1. **Activar lifecycle emails** (task #61, infra lista, 4h) → +$110K/mes baseline.
2. **Clasificar los 239 productos sin tema** con Claude Haiku → descubribilidad activa.
3. **Crear 10 productos derivados de Guerreras K-Pop** en el sitio propio (no ML por ahora) para testear qué más pega.
4. **Remover 5-8 items no-imprimibles** del catálogo ML (bikini, lona, monopatín, etc.).
5. **Implementar Combo y Mega Kit** en el sitio propio con pricing tier nuevo.

Con eso cerramos el mes 2 en ~$1M/mes limpio.

---

## 12. Para el próximo refinement

- [ ] Costos mensuales totales (Vercel, Supabase, Anthropic, Resend, nanobanana) → calcular margen neto real.
- [ ] Tiempo promedio de personalización manual por producto → costo laboral por unidad.
- [ ] Data del sitio propio (tematibox.com) una vez que arranque a vender → cross-channel view.
- [ ] Costo promedio de comprador (CAC) una vez que corran ads → validar unit economics.
- [ ] Revisión mensual de este doc con data nueva de ML.
