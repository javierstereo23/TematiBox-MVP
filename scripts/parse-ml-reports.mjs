#!/usr/bin/env node
// Consolidate 6 monthly ML facturación reports into a clean sales dataset.
// Each report has one row per CHARGE; we dedupe by "Número de venta" so we
// count each sale exactly once with its gross amount + aggregate ML fees.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import XLSX from "xlsx";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const FILES = [
  { label: "2025-11", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Nov2025.xlsx" },
  { label: "2025-12", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Dic2025.xlsx" },
  { label: "2026-01", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Ene2026.xlsx" },
  { label: "2026-02", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Feb2026.xlsx" },
  { label: "2026-03", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Mar2026.xlsx" },
  { label: "2026-04", path: "/Users/javierbadaracco/Downloads/Reporte_Facturacion_MercadoLibre_Abr2026.xlsx" },
];

// Excel serial date → ISO date
function excelDateToISO(n) {
  if (typeof n !== "number") return null;
  // Excel epoch: 1899-12-30
  const ms = (n - 25569) * 86400 * 1000;
  return new Date(ms).toISOString().slice(0, 10);
}

function parseFile(file) {
  const wb = XLSX.readFile(file.path);
  const sh = wb.Sheets[wb.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sh, { header: 1, defval: null });
  // Header is row 7, data from row 8
  const data = rows.slice(8);
  return data
    .map((r) => ({
      month: file.label,
      chargeDate: excelDateToISO(r[1]),
      chargeType: (r[3] || "").trim(),
      chargeValue: Number(r[7] || 0),
      saleId: String(r[12] || ""),
      saleDate: excelDateToISO(r[14]),
      channel: r[15],
      buyer: r[16],
      province: r[17],
      qty: Number(r[18] || 0),
      unitPrice: Number(r[19] || 0),
      total: Number(r[20] || 0),
      mlaId: String(r[24] || ""),
      title: r[26] || "",
      category: r[28] || "",
    }))
    .filter((r) => r.saleId);
}

function main() {
  const allCharges = FILES.flatMap(parseFile);
  console.log(`[parse] total charge rows: ${allCharges.length}`);

  // Group charges by saleId so we have 1 sale + all its fees
  const bySale = new Map();
  for (const c of allCharges) {
    if (!bySale.has(c.saleId)) {
      bySale.set(c.saleId, {
        saleId: c.saleId,
        saleDate: c.saleDate,
        month: c.month,
        buyer: c.buyer,
        province: c.province,
        channel: c.channel,
        qty: c.qty,
        unitPrice: c.unitPrice,
        total: c.total,
        mlaId: c.mlaId,
        title: c.title,
        category: c.category,
        fees: 0,
        feeDetails: [],
      });
    }
    const sale = bySale.get(c.saleId);
    sale.fees += c.chargeValue;
    sale.feeDetails.push({ type: c.chargeType, value: c.chargeValue });
  }

  const sales = Array.from(bySale.values());
  console.log(`[dedupe] unique sales: ${sales.length}`);

  // Aggregate
  const totalRevenue = sales.reduce((s, x) => s + x.total, 0);
  const totalFees = sales.reduce((s, x) => s + x.fees, 0);
  const netRevenue = totalRevenue - totalFees;
  const totalUnits = sales.reduce((s, x) => s + x.qty, 0);
  const avgTicket = totalRevenue / sales.length;
  const uniqueBuyers = new Set(sales.map((s) => s.buyer)).size;

  console.log(`\n=== TOTALS (6 months: Nov 2025 - Abr 2026) ===`);
  console.log(`Sales:           ${sales.length}`);
  console.log(`Units:           ${totalUnits}`);
  console.log(`Revenue (gross): $${Math.round(totalRevenue).toLocaleString("es-AR")}`);
  console.log(`ML fees:         $${Math.round(totalFees).toLocaleString("es-AR")} (${((totalFees / totalRevenue) * 100).toFixed(1)}%)`);
  console.log(`Revenue (net):   $${Math.round(netRevenue).toLocaleString("es-AR")}`);
  console.log(`Avg ticket:      $${Math.round(avgTicket).toLocaleString("es-AR")}`);
  console.log(`Unique buyers:   ${uniqueBuyers}`);

  // Monthly breakdown
  console.log(`\n=== MONTHLY ===`);
  const byMonth = {};
  for (const s of sales) {
    if (!byMonth[s.month]) byMonth[s.month] = { sales: 0, units: 0, revenue: 0, fees: 0, buyers: new Set() };
    byMonth[s.month].sales++;
    byMonth[s.month].units += s.qty;
    byMonth[s.month].revenue += s.total;
    byMonth[s.month].fees += s.fees;
    byMonth[s.month].buyers.add(s.buyer);
  }
  Object.entries(byMonth).sort().forEach(([k, v]) => {
    console.log(`  ${k}: sales=${String(v.sales).padStart(3)} · units=${String(v.units).padStart(3)} · gross=$${Math.round(v.revenue).toLocaleString("es-AR").padStart(10)} · net=$${Math.round(v.revenue - v.fees).toLocaleString("es-AR").padStart(9)} · buyers=${v.buyers.size}`);
  });

  // Top 15 products by revenue
  console.log(`\n=== TOP 15 PRODUCTS BY REVENUE ===`);
  const byProduct = {};
  for (const s of sales) {
    if (!byProduct[s.mlaId]) byProduct[s.mlaId] = { mlaId: s.mlaId, title: s.title, units: 0, revenue: 0, fees: 0 };
    byProduct[s.mlaId].units += s.qty;
    byProduct[s.mlaId].revenue += s.total;
    byProduct[s.mlaId].fees += s.fees;
  }
  const topProducts = Object.values(byProduct).sort((a, b) => b.revenue - a.revenue);
  topProducts.slice(0, 15).forEach((p, i) => {
    console.log(`  ${String(i + 1).padStart(2)}. units=${String(p.units).padStart(3)} · $${Math.round(p.revenue).toLocaleString("es-AR").padStart(8)} · ${String(p.title).slice(0, 72)}`);
  });

  // By category
  console.log(`\n=== BY CATEGORY ===`);
  const byCat = {};
  for (const s of sales) {
    const c = (s.category || "sin-categoria").split(">").pop().trim();
    if (!byCat[c]) byCat[c] = { units: 0, revenue: 0, sales: 0 };
    byCat[c].units += s.qty;
    byCat[c].revenue += s.total;
    byCat[c].sales++;
  }
  Object.entries(byCat).sort((a, b) => b[1].revenue - a[1].revenue).forEach(([k, v]) => {
    console.log(`  ${k.padEnd(36)} sales=${String(v.sales).padStart(3)} · units=${String(v.units).padStart(3)} · $${Math.round(v.revenue).toLocaleString("es-AR").padStart(9)}`);
  });

  // By province
  console.log(`\n=== TOP 10 PROVINCES ===`);
  const byProv = {};
  for (const s of sales) {
    const p = s.province || "SIN DATO";
    if (!byProv[p]) byProv[p] = { sales: 0, revenue: 0 };
    byProv[p].sales++;
    byProv[p].revenue += s.total;
  }
  Object.entries(byProv).sort((a, b) => b[1].revenue - a[1].revenue).slice(0, 10).forEach(([k, v]) => {
    console.log(`  ${k.padEnd(22)} sales=${String(v.sales).padStart(3)} · $${Math.round(v.revenue).toLocaleString("es-AR").padStart(9)}`);
  });

  // Repeat buyers
  const buyerCounts = {};
  for (const s of sales) buyerCounts[s.buyer] = (buyerCounts[s.buyer] || 0) + 1;
  const repeatBuyers = Object.values(buyerCounts).filter((n) => n > 1).length;
  const oneTime = Object.values(buyerCounts).filter((n) => n === 1).length;
  console.log(`\n=== BUYER BEHAVIOR ===`);
  console.log(`  one-time buyers: ${oneTime} (${((oneTime / uniqueBuyers) * 100).toFixed(1)}%)`);
  console.log(`  repeat buyers:   ${repeatBuyers} (${((repeatBuyers / uniqueBuyers) * 100).toFixed(1)}%)`);
  const topBuyers = Object.entries(buyerCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(`  top 5 buyers by orders:`);
  topBuyers.forEach(([b, n]) => console.log(`    ${b.padEnd(24)} ${n} orders`));

  // Write full sales dataset for reuse
  const outPath = resolve(ROOT, "data-import/ml-sales-6mo.json");
  writeFileSync(
    outPath,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        period: "2025-11 to 2026-04",
        totals: {
          sales: sales.length,
          units: totalUnits,
          revenue: Math.round(totalRevenue),
          fees: Math.round(totalFees),
          net_revenue: Math.round(netRevenue),
          avg_ticket: Math.round(avgTicket),
          unique_buyers: uniqueBuyers,
          repeat_buyer_rate: repeatBuyers / uniqueBuyers,
        },
        by_month: Object.fromEntries(
          Object.entries(byMonth).map(([k, v]) => [
            k,
            {
              sales: v.sales,
              units: v.units,
              revenue: Math.round(v.revenue),
              fees: Math.round(v.fees),
              net: Math.round(v.revenue - v.fees),
              buyers: v.buyers.size,
            },
          ])
        ),
        by_product_top: topProducts.slice(0, 50),
        by_category: byCat,
        by_province: byProv,
        sales,
      },
      null,
      2
    )
  );
  console.log(`\n[done] wrote ${outPath}`);
}

main();
