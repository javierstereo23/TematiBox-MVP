import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/data/themes";
import { WashiTape } from "@/components/scrapbook/WashiTape";
import { HandStar } from "@/components/scrapbook/HandDrawn";

export const metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

function isAdmin(email?: string | null) {
  if (!email) return false;
  const list = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return list.includes(email.toLowerCase());
}

type Order = {
  id: string;
  email: string;
  product_title: string;
  amount: number;
  discount_applied: number;
  mp_status: string;
  mp_payment_id: string | null;
  created_at: string;
  personalization: { name?: string; age?: number } | null;
};

type Coupon = {
  id: string;
  email: string;
  code: string;
  percent_off: number;
  times_used: number;
  max_uses: number;
  valid_until: string | null;
  created_at: string;
};

type Event = {
  id: string;
  email: string | null;
  event_type: string;
  metadata: Record<string, unknown> | null;
  created_at: string;
};

export default async function AdminPage() {
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getUser();
  const email = auth?.user?.email;

  if (!email) redirect("/cuenta?next=/admin");
  if (!isAdmin(email)) {
    return (
      <section className="py-24 px-6">
        <div className="max-w-md mx-auto text-center">
          <p className="font-hand text-2xl text-primary/85 -rotate-1 mb-4">
            uy, esto no es para vos
          </p>
          <p className="text-text-secondary">
            Tu cuenta <strong>{email}</strong> no tiene permisos de admin.
          </p>
          <p className="text-text-tertiary text-xs mt-4">
            Seteá <code>ADMIN_EMAILS</code> en Vercel para habilitar acceso.
          </p>
        </div>
      </section>
    );
  }

  const [ordersRes, couponsRes, eventsRes] = await Promise.all([
    supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("coupons")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("events")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(80),
  ]);

  const orders = (ordersRes.data as Order[] | null) || [];
  const coupons = (couponsRes.data as Coupon[] | null) || [];
  const events = (eventsRes.data as Event[] | null) || [];

  const approvedOrders = orders.filter((o) => o.mp_status === "approved");
  const revenue = approvedOrders.reduce((acc, o) => acc + Number(o.amount || 0), 0);
  const couponsUsed = coupons.filter((c) => c.times_used > 0).length;
  const leadEmails = new Set(events.filter((e) => e.email).map((e) => e.email!));

  return (
    <section className="relative py-16 md:py-20 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[#FBF6EA]" />
      <div className="absolute inset-0 -z-10 paper-grid opacity-40" />

      <WashiTape
        color="pink"
        rotate={-10}
        width={160}
        height={26}
        className="absolute -top-1 left-[6%] z-10"
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <HandStar className="w-5 h-5" color="#E0B252" />
            <p className="font-hand text-xl text-primary/80 -rotate-[0.5deg]">
              admin · {email}
            </p>
          </div>
          <h1 className="font-display text-[44px] md:text-[56px] font-medium text-text-primary leading-[0.96] tracking-[-0.025em]">
            Panel de control
          </h1>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[
            { label: "ingresos (approved)", value: formatPrice(revenue), rot: -1.5, bg: "#FFF3A8" },
            { label: "pedidos", value: String(orders.length), rot: 0.8, bg: "#FFDBE6" },
            { label: "cupones usados", value: `${couponsUsed} / ${coupons.length}`, rot: -0.7, bg: "#D9E8D3" },
            { label: "leads únicos", value: String(leadEmails.size), rot: 1.2, bg: "#E0D5F0" },
          ].map((k) => (
            <div
              key={k.label}
              className="p-5"
              style={{
                background: k.bg,
                transform: `rotate(${k.rot}deg)`,
                boxShadow: "0 8px 20px -8px rgba(42,45,37,0.2)",
              }}
            >
              <p className="font-hand text-sm text-text-primary/70 -rotate-[0.3deg] leading-tight">
                {k.label}
              </p>
              <p className="font-display text-3xl md:text-4xl font-medium text-text-primary mt-1 leading-none">
                {k.value}
              </p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <h2 className="font-display text-2xl md:text-3xl font-medium text-text-primary mb-4">
          Pedidos recientes
        </h2>
        <div className="bg-[#FFFDF8] border border-text-primary/15 overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead className="bg-[#F4EEDF] text-xs uppercase tracking-wider text-text-secondary">
              <tr>
                <th className="text-left px-4 py-2.5">Fecha</th>
                <th className="text-left px-4 py-2.5">Email</th>
                <th className="text-left px-4 py-2.5">Producto</th>
                <th className="text-left px-4 py-2.5">Nombre</th>
                <th className="text-right px-4 py-2.5">Total</th>
                <th className="text-left px-4 py-2.5">Estado</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-text-tertiary">
                    Sin pedidos todavía
                  </td>
                </tr>
              )}
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-text-primary/10">
                  <td className="px-4 py-2.5 text-text-secondary whitespace-nowrap">
                    {new Date(o.created_at).toLocaleString("es-AR", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs">{o.email}</td>
                  <td className="px-4 py-2.5 max-w-[220px] truncate">{o.product_title}</td>
                  <td className="px-4 py-2.5 font-hand text-base">
                    {o.personalization?.name || "—"}
                    {o.personalization?.age ? `, ${o.personalization.age}` : ""}
                  </td>
                  <td className="px-4 py-2.5 text-right font-display">
                    {formatPrice(Number(o.amount))}
                  </td>
                  <td className="px-4 py-2.5">
                    <span
                      className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${
                        o.mp_status === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {o.mp_status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Coupons table */}
        <h2 className="font-display text-2xl md:text-3xl font-medium text-text-primary mb-4">
          Cupones
        </h2>
        <div className="bg-[#FFFDF8] border border-text-primary/15 overflow-x-auto mb-12">
          <table className="w-full text-sm">
            <thead className="bg-[#F4EEDF] text-xs uppercase tracking-wider text-text-secondary">
              <tr>
                <th className="text-left px-4 py-2.5">Código</th>
                <th className="text-left px-4 py-2.5">Email</th>
                <th className="text-right px-4 py-2.5">% off</th>
                <th className="text-center px-4 py-2.5">Usos</th>
                <th className="text-left px-4 py-2.5">Vence</th>
                <th className="text-left px-4 py-2.5">Creado</th>
              </tr>
            </thead>
            <tbody>
              {coupons.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-text-tertiary">
                    Sin cupones todavía
                  </td>
                </tr>
              )}
              {coupons.map((c) => (
                <tr key={c.id} className="border-t border-text-primary/10">
                  <td className="px-4 py-2.5 font-mono text-xs font-bold">{c.code}</td>
                  <td className="px-4 py-2.5 font-mono text-xs">{c.email}</td>
                  <td className="px-4 py-2.5 text-right">{c.percent_off}%</td>
                  <td className="px-4 py-2.5 text-center">
                    {c.times_used}/{c.max_uses}
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary text-xs">
                    {c.valid_until
                      ? new Date(c.valid_until).toLocaleDateString("es-AR")
                      : "sin vto."}
                  </td>
                  <td className="px-4 py-2.5 text-text-secondary text-xs">
                    {new Date(c.created_at).toLocaleDateString("es-AR")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Events feed */}
        <h2 className="font-display text-2xl md:text-3xl font-medium text-text-primary mb-4">
          Eventos recientes
        </h2>
        <div className="bg-[#FFFDF8] border border-text-primary/15 max-h-[500px] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F4EEDF] text-xs uppercase tracking-wider text-text-secondary sticky top-0">
              <tr>
                <th className="text-left px-4 py-2.5">Fecha</th>
                <th className="text-left px-4 py-2.5">Tipo</th>
                <th className="text-left px-4 py-2.5">Email</th>
                <th className="text-left px-4 py-2.5">Metadata</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-4 py-6 text-center text-text-tertiary">
                    Sin eventos
                  </td>
                </tr>
              )}
              {events.map((e) => (
                <tr key={e.id} className="border-t border-text-primary/10">
                  <td className="px-4 py-2.5 text-xs text-text-secondary whitespace-nowrap">
                    {new Date(e.created_at).toLocaleTimeString("es-AR", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "2-digit",
                      month: "2-digit",
                    })}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="inline-block px-2 py-0.5 bg-primary/10 text-primary text-xs font-semibold rounded">
                      {e.event_type}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 font-mono text-xs">{e.email || "—"}</td>
                  <td className="px-4 py-2.5 font-mono text-[11px] text-text-secondary max-w-[400px] truncate">
                    {e.metadata ? JSON.stringify(e.metadata) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
