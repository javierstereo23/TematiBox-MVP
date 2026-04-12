import type { ThemePalette, Personalization } from "@/data/themes";

export interface TemplateProps {
  palette: ThemePalette;
  personalization: Partial<Personalization>;
  themeName: string;
  themeEmoji: string;
}

const P = {
  name: (p: Partial<Personalization>, fallback = "Tu nombre") => (p.name?.trim() ? p.name.trim() : fallback),
  age: (p: Partial<Personalization>, fallback = "__") => (p.age !== undefined && p.age !== "" ? String(p.age) : fallback),
  date: (p: Partial<Personalization>) => p.eventDate?.trim() || "",
  time: (p: Partial<Personalization>) => p.eventTime?.trim() || "",
  venue: (p: Partial<Personalization>) => p.venue?.trim() || "",
  address: (p: Partial<Personalization>) => p.address?.trim() || "",
};

function formatDate(iso: string): string {
  if (!iso) return "";
  try {
    const d = new Date(iso + "T12:00:00");
    return d.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" });
  } catch {
    return iso;
  }
}

export function InvitacionTemplate({ palette, personalization, themeName }: TemplateProps) {
  const name = P.name(personalization);
  const age = P.age(personalization);
  const dateStr = formatDate(P.date(personalization));
  const time = P.time(personalization);
  const venue = P.venue(personalization);
  const address = P.address(personalization);

  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="inv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={palette.primary} />
          <stop offset="60%" stopColor={palette.secondary} />
          <stop offset="100%" stopColor={palette.accent} />
        </linearGradient>
        <radialGradient id="inv-glow" cx="50%" cy="30%" r="60%">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="600" height="800" fill="url(#inv-bg)" />
      <rect width="600" height="800" fill="url(#inv-glow)" />

      {/* confetti dots */}
      {[
        [60, 120, 8], [120, 80, 5], [480, 100, 6], [540, 160, 4], [80, 680, 6],
        [520, 720, 7], [70, 400, 4], [530, 440, 5], [180, 740, 5], [420, 60, 5],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="white" opacity="0.55" />
      ))}

      {/* inner card */}
      <rect x="44" y="64" width="512" height="672" rx="28" fill={palette.light} />

      {/* top label */}
      <g>
        <rect x="240" y="96" width="120" height="36" rx="18" fill={palette.primary} />
        <text x="300" y="121" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
          TE INVITO
        </text>
      </g>

      {/* greeting */}
      <text x="300" y="220" textAnchor="middle" fill={palette.accent} fontSize="22" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
        Vamos a festejar los
      </text>
      {/* age big */}
      <text x="300" y="340" textAnchor="middle" fill={palette.primary} fontSize="140" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-4">
        {age}
      </text>
      <text x="300" y="380" textAnchor="middle" fill={palette.accent} fontSize="22" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
        años de
      </text>

      {/* name */}
      <text x="300" y="450" textAnchor="middle" fill={palette.dark} fontSize="56" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-2">
        {name}
      </text>

      {/* divider */}
      <line x1="220" y1="490" x2="380" y2="490" stroke={palette.primary} strokeWidth="2" />

      {/* theme pill */}
      <g transform="translate(300, 512)">
        <rect x="-110" y="0" width="220" height="36" rx="18" fill={palette.secondary} />
        <text x="0" y="24" textAnchor="middle" fill={palette.dark} fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          Tema: {themeName}
        </text>
      </g>

      {/* event details */}
      <g transform="translate(76, 580)">
        {dateStr ? (
          <>
            <text x="0" y="0" fill={palette.primary} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
              CUANDO
            </text>
            <text x="0" y="24" fill={palette.dark} fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
              {dateStr}{time ? ` · ${time}` : ""}
            </text>
          </>
        ) : (
          <text x="0" y="14" fill={palette.dark} opacity="0.35" fontSize="14" fontFamily="Inter, system-ui, sans-serif">
            Completa la fecha del evento
          </text>
        )}
      </g>

      {(venue || address) && (
        <g transform="translate(76, 640)">
          <text x="0" y="0" fill={palette.primary} fontSize="12" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
            DONDE
          </text>
          {venue && (
            <text x="0" y="24" fill={palette.dark} fontSize="18" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
              {venue}
            </text>
          )}
          {address && (
            <text x="0" y="46" fill={palette.dark} opacity="0.7" fontSize="13" fontFamily="Inter, system-ui, sans-serif">
              {address}
            </text>
          )}
        </g>
      )}

      {/* footer */}
      <text x="300" y="720" textAnchor="middle" fill={palette.primary} fontSize="11" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="4" opacity="0.7">
        TEMATIBOX
      </text>
    </svg>
  );
}

export function ColorearTemplate({ palette, personalization, themeName, themeEmoji }: TemplateProps) {
  const name = P.name(personalization);
  const age = P.age(personalization);

  return (
    <svg viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <linearGradient id="col-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={palette.light} />
          <stop offset="100%" stopColor="white" />
        </linearGradient>
      </defs>
      <rect width="600" height="800" fill="url(#col-bg)" />

      {/* top band */}
      <rect x="0" y="0" width="600" height="120" fill={palette.primary} />
      <text x="40" y="50" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="3">
        LIBRO PARA COLOREAR
      </text>
      <text x="40" y="90" fill="white" fontSize="32" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        {themeName}
      </text>

      {/* decorative outlines - balloons */}
      <g stroke={palette.primary} strokeWidth="3" fill="none" opacity="0.9">
        <ellipse cx="120" cy="290" rx="40" ry="52" />
        <line x1="120" y1="342" x2="120" y2="420" />
        <ellipse cx="200" cy="250" rx="36" ry="48" />
        <line x1="200" y1="298" x2="200" y2="420" />
        <ellipse cx="470" cy="270" rx="40" ry="52" />
        <line x1="470" y1="322" x2="470" y2="420" />
      </g>

      {/* stars */}
      <g fill={palette.secondary} opacity="0.6">
        <polygon points="330,220 340,245 365,245 345,260 355,285 330,270 305,285 315,260 295,245 320,245" />
        <polygon points="420,380 428,398 447,398 432,410 438,428 420,418 402,428 408,410 393,398 412,398" transform="scale(0.7) translate(180, 170)" />
      </g>

      {/* emoji decoration */}
      <text x="300" y="510" textAnchor="middle" fontSize="90">{themeEmoji}</text>

      {/* name section */}
      <text x="300" y="600" textAnchor="middle" fill={palette.accent} fontSize="18" fontWeight="500" fontFamily="Inter, system-ui, sans-serif">
        Para colorear de
      </text>
      <text x="300" y="660" textAnchor="middle" fill={palette.dark} fontSize="56" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-2">
        {name}
      </text>

      {/* age */}
      <g transform="translate(300, 700)">
        <rect x="-70" y="0" width="140" height="36" rx="18" fill={palette.secondary} />
        <text x="0" y="24" textAnchor="middle" fill={palette.dark} fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          {age} años
        </text>
      </g>

      <text x="300" y="770" textAnchor="middle" fill={palette.primary} fontSize="10" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="4" opacity="0.6">
        20 PAGINAS PARA COLOREAR · TEMATIBOX
      </text>
    </svg>
  );
}

export function EscolaresTemplate({ palette, personalization, themeName, themeEmoji }: TemplateProps) {
  const name = P.name(personalization);
  const age = P.age(personalization);
  const letters = ["A", "B", "C", "1", "2", "3"];

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="800" height="600" fill={palette.light} />

      {/* header */}
      <rect x="0" y="0" width="800" height="100" fill={palette.primary} />
      <text x="40" y="42" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="3">
        MATERIAL EDUCATIVO PERSONALIZADO
      </text>
      <text x="40" y="78" fill="white" fontSize="26" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        Aprendo con {name}
      </text>
      <text x="760" y="60" textAnchor="end" fontSize="50">{themeEmoji}</text>

      {/* flashcards grid */}
      {letters.map((l, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 60 + col * 240;
        const y = 140 + row * 200;
        const isNumber = !isNaN(Number(l));
        const bg = isNumber ? palette.secondary : palette.primary;
        return (
          <g key={l}>
            <rect x={x} y={y} width="200" height="170" rx="16" fill="white" stroke={palette.primary} strokeWidth="2" />
            <rect x={x} y={y} width="200" height="40" rx="16" fill={bg} />
            <text x={x + 100} y={y + 27} textAnchor="middle" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
              {isNumber ? "NUMERO" : "LETRA"}
            </text>
            <text x={x + 100} y={y + 130} textAnchor="middle" fill={palette.dark} fontSize="96" fontWeight="900" fontFamily="Inter, system-ui, sans-serif">
              {l}
            </text>
          </g>
        );
      })}

      {/* footer pill */}
      <g transform="translate(400, 560)">
        <rect x="-180" y="-20" width="360" height="36" rx="18" fill={palette.accent} />
        <text x="0" y="4" textAnchor="middle" fill="white" fontSize="14" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
          {themeName} · {age} años · Pack completo
        </text>
      </g>
    </svg>
  );
}

export function CliparsTemplate({ palette, personalization, themeName, themeEmoji }: TemplateProps) {
  const name = P.name(personalization);
  const shapes = [
    { type: "star", color: palette.primary },
    { type: "circle", color: palette.secondary },
    { type: "heart", color: palette.accent },
    { type: "balloon", color: palette.primary },
    { type: "star", color: palette.secondary },
    { type: "circle", color: palette.accent },
    { type: "heart", color: palette.primary },
    { type: "balloon", color: palette.secondary },
    { type: "star", color: palette.accent },
  ];

  return (
    <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <defs>
        <pattern id="checker" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill="#fafafa" />
          <rect width="20" height="20" fill="#f0f0f0" />
          <rect x="20" y="20" width="20" height="20" fill="#f0f0f0" />
        </pattern>
      </defs>
      <rect width="800" height="800" fill="url(#checker)" />

      {/* header */}
      <rect x="0" y="0" width="800" height="110" fill={palette.primary} />
      <text x="40" y="44" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="3">
        PACK CLIPARTS PARA SUBLIMAR · 300 DPI
      </text>
      <text x="40" y="84" fill="white" fontSize="28" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        Pack {themeName}
      </text>
      <text x="760" y="72" textAnchor="end" fontSize="54">{themeEmoji}</text>

      {/* clipart grid 3x3 */}
      {shapes.map((s, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const cx = 160 + col * 240;
        const cy = 240 + row * 170;
        return (
          <g key={i}>
            <rect x={cx - 90} y={cy - 70} width="180" height="140" rx="12" fill="white" stroke={palette.light} strokeWidth="1" />
            {s.type === "star" && (
              <polygon
                points={`${cx},${cy - 40} ${cx + 12},${cy - 10} ${cx + 40},${cy - 10} ${cx + 16},${cy + 10} ${cx + 24},${cy + 40} ${cx},${cy + 20} ${cx - 24},${cy + 40} ${cx - 16},${cy + 10} ${cx - 40},${cy - 10} ${cx - 12},${cy - 10}`}
                fill={s.color}
              />
            )}
            {s.type === "circle" && <circle cx={cx} cy={cy} r="40" fill={s.color} />}
            {s.type === "heart" && (
              <path
                d={`M ${cx} ${cy + 30} C ${cx - 50} ${cy - 10}, ${cx - 30} ${cy - 50}, ${cx} ${cy - 20} C ${cx + 30} ${cy - 50}, ${cx + 50} ${cy - 10}, ${cx} ${cy + 30} Z`}
                fill={s.color}
              />
            )}
            {s.type === "balloon" && (
              <>
                <ellipse cx={cx} cy={cy - 10} rx="32" ry="42" fill={s.color} />
                <polygon points={`${cx - 4},${cy + 30} ${cx + 4},${cy + 30} ${cx},${cy + 38}`} fill={s.color} />
                <line x1={cx} y1={cy + 38} x2={cx} y2={cy + 60} stroke={palette.dark} strokeWidth="1.5" />
              </>
            )}
          </g>
        );
      })}

      {/* bottom bar */}
      <rect x="0" y="720" width="800" height="80" fill={palette.accent} />
      <text x="40" y="760" fill="white" fontSize="16" fontWeight="700" fontFamily="Inter, system-ui, sans-serif">
        Personalizado para {name}
      </text>
      <text x="760" y="760" textAnchor="end" fill="white" fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" opacity="0.8" letterSpacing="3">
        30+ ARCHIVOS PNG · USO COMERCIAL
      </text>
    </svg>
  );
}

export function EtiquetasTemplate({ palette, personalization, themeName, themeEmoji }: TemplateProps) {
  const name = P.name(personalization);
  const age = P.age(personalization);
  const labels = [
    "MATEMATICA", "LENGUA", "CIENCIAS", "INGLES", "HISTORIA", "GEOGRAFIA"
  ];

  return (
    <svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
      <rect width="800" height="600" fill={palette.light} />

      {/* header */}
      <rect x="0" y="0" width="800" height="90" fill={palette.primary} />
      <text x="40" y="40" fill="white" fontSize="13" fontWeight="700" fontFamily="Inter, system-ui, sans-serif" letterSpacing="3">
        ETIQUETAS ESCOLARES · PACK COMPLETO
      </text>
      <text x="40" y="72" fill="white" fontSize="22" fontWeight="800" fontFamily="Inter, system-ui, sans-serif">
        Utiles de {name} · {age} años
      </text>
      <text x="760" y="58" textAnchor="end" fontSize="42">{themeEmoji}</text>

      {/* labels grid 3x2 */}
      {labels.map((lbl, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const x = 40 + col * 246;
        const y = 120 + row * 210;
        return (
          <g key={lbl}>
            <rect x={x} y={y} width="220" height="180" rx="12" fill="white" stroke={palette.primary} strokeWidth="2" />
            <rect x={x} y={y} width="220" height="44" rx="12" fill={palette.primary} />
            <text x={x + 110} y={y + 29} textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
              {lbl}
            </text>
            <text x={x + 110} y={y + 116} textAnchor="middle" fill={palette.dark} fontSize="32" fontWeight="900" fontFamily="Inter, system-ui, sans-serif" letterSpacing="-1">
              {name}
            </text>
            <text x={x + 110} y={y + 152} textAnchor="middle" fill={palette.accent} fontSize="12" fontWeight="600" fontFamily="Inter, system-ui, sans-serif" letterSpacing="2">
              {themeName.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* footer */}
      <text x="400" y="560" textAnchor="middle" fill={palette.primary} fontSize="10" fontWeight="800" fontFamily="Inter, system-ui, sans-serif" letterSpacing="4" opacity="0.6">
        INCLUYE 40+ ETIQUETAS EN FORMATO A4 · TEMATIBOX
      </text>
    </svg>
  );
}

export function getTemplate(categoryId: string): React.ComponentType<TemplateProps> {
  switch (categoryId) {
    case "invitaciones":
      return InvitacionTemplate;
    case "colorear":
      return ColorearTemplate;
    case "escolares":
      return EscolaresTemplate;
    case "cliparts":
      return CliparsTemplate;
    case "etiquetas":
      return EtiquetasTemplate;
    default:
      return InvitacionTemplate;
  }
}
