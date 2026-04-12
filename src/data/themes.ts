export interface ThemePalette {
  primary: string;
  secondary: string;
  accent: string;
  light: string;
  dark: string;
}

export interface ThemeData {
  slug: string;
  name: string;
  category: string;
  description: string;
  emoji: string;
  gradient: string;
  ageRange: string;
  popular: boolean;
  trending?: boolean;
  image: string;
  palette: ThemePalette;
}

export interface ComboItem {
  name: string;
  emoji: string;
}

export type ComboType = "fiesta" | "regalo" | "completo";

export interface Combo {
  id: string;
  themeSlug: string;
  name: string;
  type: ComboType;
  description: string;
  price: number;
  originalPrice: number;
  items: ComboItem[];
  badge?: string;
  popular?: boolean;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export type DigitalCategoryId =
  | "invitaciones"
  | "colorear"
  | "escolares"
  | "cliparts"
  | "etiquetas";

export interface DigitalCategoryMeta {
  id: DigitalCategoryId;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  emoji: string;
  gradient: string;
  price: number;
  originalPrice: number;
  requiresEvent: boolean;
  badge?: string;
}

export interface DigitalProduct {
  id: string;
  themeSlug: string;
  category: DigitalCategoryId;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  coverImage: string;
}

export interface Personalization {
  name: string;
  age: number | "";
  eventDate?: string;
  eventTime?: string;
  venue?: string;
  address?: string;
}

export const categories: Category[] = [
  { id: "all", name: "Todos", emoji: "✨" },
  { id: "series", name: "Series & Pelis", emoji: "🎬" },
  { id: "musica", name: "Musica", emoji: "🎵" },
  { id: "deportes", name: "Deportes", emoji: "⚽" },
  { id: "gaming", name: "Gaming", emoji: "🎮" },
  { id: "animacion", name: "Animacion", emoji: "🧸" },
  { id: "moda", name: "Moda & Lifestyle", emoji: "👗" },
];

export const themes: ThemeData[] = [
  {
    slug: "stranger-things",
    name: "Stranger Things",
    category: "series",
    description: "El Upside Down llega a la fiesta. Luces y aventura.",
    emoji: "🔦",
    gradient: "from-red-900 via-red-700 to-amber-900",
    ageRange: "10-15 anos",
    popular: true,
    trending: true,
    image: "/images/themes/stranger-things/cover.png",
    palette: { primary: "#b91c1c", secondary: "#fbbf24", accent: "#7f1d1d", light: "#fef3c7", dark: "#1c1917" },
  },
  {
    slug: "wicked",
    name: "Wicked",
    category: "series",
    description: "Magia verde y rosa. Defying gravity en su cumpleanos.",
    emoji: "🧙‍♀️",
    gradient: "from-emerald-600 via-green-500 to-pink-400",
    ageRange: "8-14 anos",
    popular: true,
    trending: true,
    image: "/images/themes/wicked/cover.png",
    palette: { primary: "#10b981", secondary: "#ec4899", accent: "#065f46", light: "#ecfdf5", dark: "#064e3b" },
  },
  {
    slug: "kpop-bts",
    name: "K-Pop / BTS",
    category: "musica",
    description: "Army presente. Violeta, estrellas y K-Pop.",
    emoji: "💜",
    gradient: "from-violet-600 via-purple-500 to-fuchsia-500",
    ageRange: "9-16 anos",
    popular: true,
    image: "/images/themes/kpop-bts/cover.png",
    palette: { primary: "#7c3aed", secondary: "#d946ef", accent: "#4c1d95", light: "#f5f3ff", dark: "#3b0764" },
  },
  {
    slug: "minecraft",
    name: "Minecraft",
    category: "gaming",
    description: "Bloques, creepers y aventura pixelada.",
    emoji: "⛏️",
    gradient: "from-green-700 via-emerald-600 to-lime-500",
    ageRange: "6-13 anos",
    popular: true,
    image: "/images/themes/minecraft/cover.png",
    palette: { primary: "#15803d", secondary: "#84cc16", accent: "#78350f", light: "#f7fee7", dark: "#14532d" },
  },
  {
    slug: "futbol-argentina",
    name: "Futbol Argentina",
    category: "deportes",
    description: "La Scaloneta en la fiesta. Camiseta y pasion.",
    emoji: "🏆",
    gradient: "from-sky-500 via-sky-400 to-white",
    ageRange: "5-15 anos",
    popular: true,
    image: "/images/themes/futbol-argentina/cover.png",
    palette: { primary: "#0ea5e9", secondary: "#fbbf24", accent: "#075985", light: "#e0f2fe", dark: "#0c4a6e" },
  },
  {
    slug: "bluey",
    name: "Bluey",
    category: "animacion",
    description: "La familia Heeler llega al cumple.",
    emoji: "🐕",
    gradient: "from-sky-400 via-blue-500 to-orange-400",
    ageRange: "3-7 anos",
    popular: true,
    trending: true,
    image: "/images/themes/bluey/cover.png",
    palette: { primary: "#3b82f6", secondary: "#fb923c", accent: "#0ea5e9", light: "#eff6ff", dark: "#1e3a8a" },
  },
  {
    slug: "disney-princesas",
    name: "Disney Princesas",
    category: "animacion",
    description: "Magia, castillos y coronas.",
    emoji: "👑",
    gradient: "from-pink-400 via-rose-300 to-amber-200",
    ageRange: "4-10 anos",
    popular: true,
    image: "/images/themes/disney-princesas/cover.png",
    palette: { primary: "#ec4899", secondary: "#fbbf24", accent: "#be185d", light: "#fdf2f8", dark: "#831843" },
  },
  {
    slug: "spider-man",
    name: "Spider-Man",
    category: "series",
    description: "Con gran poder, viene un gran cumpleanos.",
    emoji: "🕷️",
    gradient: "from-red-600 via-red-500 to-blue-700",
    ageRange: "5-12 anos",
    popular: true,
    image: "/images/themes/spider-man/cover.png",
    palette: { primary: "#dc2626", secondary: "#1d4ed8", accent: "#991b1b", light: "#fef2f2", dark: "#7f1d1d" },
  },
  {
    slug: "dragon-ball",
    name: "Dragon Ball",
    category: "animacion",
    description: "Goku, Vegeta y las esferas del dragon.",
    emoji: "🐉",
    gradient: "from-orange-500 via-amber-500 to-yellow-400",
    ageRange: "6-14 anos",
    popular: true,
    trending: true,
    image: "/images/themes/dragon-ball/cover.png",
    palette: { primary: "#f97316", secondary: "#fbbf24", accent: "#c2410c", light: "#fff7ed", dark: "#7c2d12" },
  },
  {
    slug: "taylor-swift",
    name: "Taylor Swift",
    category: "musica",
    description: "Eras Tour en version cumple.",
    emoji: "✨",
    gradient: "from-violet-400 via-pink-300 to-amber-200",
    ageRange: "8-16 anos",
    popular: false,
    image: "/images/themes/taylor-swift/cover.png",
    palette: { primary: "#a78bfa", secondary: "#f9a8d4", accent: "#7c3aed", light: "#f5f3ff", dark: "#5b21b6" },
  },
  {
    slug: "pokemon",
    name: "Pokemon",
    category: "gaming",
    description: "Pikachu y amigos en la fiesta.",
    emoji: "⚡",
    gradient: "from-yellow-400 via-amber-400 to-red-500",
    ageRange: "5-12 anos",
    popular: false,
    image: "/images/themes/pokemon/cover.png",
    palette: { primary: "#facc15", secondary: "#ef4444", accent: "#eab308", light: "#fefce8", dark: "#713f12" },
  },
  {
    slug: "harry-potter",
    name: "Harry Potter",
    category: "series",
    description: "Magia, varitas y Hogwarts.",
    emoji: "🧙",
    gradient: "from-amber-700 via-yellow-600 to-purple-900",
    ageRange: "8-15 anos",
    popular: false,
    image: "/images/themes/harry-potter/cover.png",
    palette: { primary: "#b45309", secondary: "#581c87", accent: "#78350f", light: "#fef3c7", dark: "#451a03" },
  },
  {
    slug: "barbie",
    name: "Barbie",
    category: "moda",
    description: "Think pink. Todo el universo Barbie.",
    emoji: "💖",
    gradient: "from-pink-500 via-pink-400 to-fuchsia-400",
    ageRange: "4-11 anos",
    popular: false,
    image: "/images/themes/barbie/cover.png",
    palette: { primary: "#ec4899", secondary: "#e879f9", accent: "#db2777", light: "#fdf2f8", dark: "#831843" },
  },
  {
    slug: "roblox",
    name: "Roblox",
    category: "gaming",
    description: "El metaverso llega al cumple.",
    emoji: "🎲",
    gradient: "from-red-500 via-gray-800 to-gray-900",
    ageRange: "7-14 anos",
    popular: false,
    image: "/images/themes/roblox/cover.png",
    palette: { primary: "#ef4444", secondary: "#1f2937", accent: "#dc2626", light: "#f9fafb", dark: "#111827" },
  },
  {
    slug: "sprunki",
    name: "Sprunki",
    category: "gaming",
    description: "El fenomeno viral que aman los chicos.",
    emoji: "🎵",
    gradient: "from-purple-500 via-pink-500 to-red-500",
    ageRange: "7-14 anos",
    popular: false,
    trending: true,
    image: "/images/themes/sprunki/cover.png",
    palette: { primary: "#a855f7", secondary: "#ec4899", accent: "#7c3aed", light: "#faf5ff", dark: "#4a044e" },
  },
  {
    slug: "among-us",
    name: "Among Us",
    category: "gaming",
    description: "Quien es el impostor? Misterio en el espacio.",
    emoji: "🚀",
    gradient: "from-indigo-900 via-blue-800 to-cyan-500",
    ageRange: "8-14 anos",
    popular: false,
    image: "/images/themes/among-us/cover.png",
    palette: { primary: "#312e81", secondary: "#06b6d4", accent: "#1e1b4b", light: "#eef2ff", dark: "#1e1b4b" },
  },
];

export const digitalCategories: DigitalCategoryMeta[] = [
  {
    id: "invitaciones",
    name: "Invitaciones digitales",
    shortName: "Invitaciones",
    description: "Invitacion personalizada lista para mandar por WhatsApp.",
    longDescription: "Invitacion digital en PDF y PNG 4K con el nombre del cumpleanero, edad, fecha, hora y lugar. Entrega al instante apenas compras, lista para compartir por WhatsApp o redes.",
    emoji: "💌",
    gradient: "from-rose-400 via-pink-400 to-fuchsia-500",
    price: 2500,
    originalPrice: 4500,
    requiresEvent: true,
    badge: "Mas vendido",
  },
  {
    id: "colorear",
    name: "Para colorear",
    shortName: "Para colorear",
    description: "Libro de 20 paginas para colorear personalizado.",
    longDescription: "Libro digital de 20 paginas en formato PDF con ilustraciones tematicas para colorear, personalizado con el nombre del chico. Listo para imprimir en A4.",
    emoji: "🎨",
    gradient: "from-amber-400 via-orange-400 to-pink-400",
    price: 3500,
    originalPrice: 6300,
    requiresEvent: false,
  },
  {
    id: "escolares",
    name: "Material escolar",
    shortName: "Escolares",
    description: "Abecedario, flashcards y actividades didacticas.",
    longDescription: "Pack educativo digital: abecedario ilustrado, tarjetas de numeros, flashcards de vocabulario y actividades cognitivas, todo personalizado con el nombre del chico.",
    emoji: "📚",
    gradient: "from-sky-400 via-blue-500 to-indigo-500",
    price: 4500,
    originalPrice: 8100,
    requiresEvent: false,
  },
  {
    id: "cliparts",
    name: "Cliparts para sublimar",
    shortName: "Cliparts",
    description: "30+ PNG transparente en alta resolucion.",
    longDescription: "Pack profesional de 30 cliparts en PNG transparente 300dpi, ideal para sublimar en tazas, remeras y bolsos. Uso personal y comercial permitido.",
    emoji: "🖼️",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    price: 5500,
    originalPrice: 9900,
    requiresEvent: false,
    badge: "Pro",
  },
  {
    id: "etiquetas",
    name: "Etiquetas escolares",
    shortName: "Etiquetas",
    description: "Caratulas, cuadernos, utiles y cartuchera.",
    longDescription: "Pack completo de etiquetas personalizadas para caratulas, cuadernos, lapices, cartuchera, botella y mochila. Con el nombre del chico, listas para imprimir y recortar.",
    emoji: "🏷️",
    gradient: "from-teal-400 via-cyan-400 to-sky-500",
    price: 3900,
    originalPrice: 7020,
    requiresEvent: false,
  },
];

const defaultFiestaItems: ComboItem[] = [
  { name: "Banner tematico", emoji: "🎉" },
  { name: "20 globos impresos", emoji: "🎈" },
  { name: "Platos x12", emoji: "🍽️" },
  { name: "Vasos x12", emoji: "🥤" },
  { name: "Servilletas x20", emoji: "🧻" },
  { name: "Mantel tematico", emoji: "🎨" },
  { name: "Toppers para torta", emoji: "🎂" },
];
const defaultCompletoItems: ComboItem[] = [
  { name: "Todo el Combo Fiesta", emoji: "🎉" },
  { name: "Todo el Combo Regalo", emoji: "🎁" },
  { name: "Torta tematica para 15", emoji: "🎂" },
  { name: "Bolsitas sorpresa x10", emoji: "🛍️" },
  { name: "Pinata tematica", emoji: "🪅" },
];

function makeFiesta(id: string, theme: string, price: number, items: ComboItem[], badge?: string): Combo {
  return { id: `${id}-fiesta`, themeSlug: id, name: "Combo Fiesta", type: "fiesta", description: `Cotillon y decoracion ${theme}.`, price, originalPrice: Math.round(price * 1.35), items, badge, popular: !!badge };
}
function makeRegalo(id: string, theme: string, price: number, items: ComboItem[], badge?: string): Combo {
  return { id: `${id}-regalo`, themeSlug: id, name: "Combo Regalo", type: "regalo", description: `Los mejores regalos tematicos de ${theme}.`, price, originalPrice: Math.round(price * 1.3), items, badge };
}
function makeCompleto(id: string, theme: string, price: number, items: ComboItem[]): Combo {
  return { id: `${id}-completo`, themeSlug: id, name: "Combo Cumple Completo", type: "completo", description: `Fiesta + regalos + torta ${theme}.`, price, originalPrice: Math.round(price * 1.4), items, badge: "Mejor valor", popular: true };
}

export const combos: Combo[] = [
  makeFiesta("stranger-things", "Stranger Things", 45000, defaultFiestaItems, "Mas vendido"),
  makeRegalo("stranger-things", "Stranger Things", 68000, [{ name: "Remera Stranger Things", emoji: "👕" }, { name: "Funko Pop Eleven", emoji: "🎭" }, { name: "Set stickers", emoji: "🏷️" }, { name: "Mochila", emoji: "🎒" }, { name: "Gorra bordada", emoji: "🧢" }]),
  makeCompleto("stranger-things", "Stranger Things", 135000, defaultCompletoItems),
  makeFiesta("wicked", "Wicked", 43000, defaultFiestaItems, "Nuevo"),
  makeRegalo("wicked", "Wicked", 62000, [{ name: "Varita magica luminosa", emoji: "✨" }, { name: "Capa de Elphaba", emoji: "🧙‍♀️" }, { name: "Libro de canciones", emoji: "📖" }, { name: "Set maquillaje verde", emoji: "💚" }, { name: "Diadema Glinda", emoji: "🎀" }]),
  makeCompleto("wicked", "Wicked", 125000, defaultCompletoItems),
  makeFiesta("kpop-bts", "K-Pop", 42000, defaultFiestaItems),
  makeRegalo("kpop-bts", "K-Pop", 72000, [{ name: "Lightstick oficial", emoji: "🔦" }, { name: "Photocards", emoji: "🃏" }, { name: "Remera BTS", emoji: "👕" }, { name: "Set pulseras", emoji: "📿" }, { name: "Poster", emoji: "🖼️" }], "Mas vendido"),
  makeCompleto("kpop-bts", "K-Pop", 139000, defaultCompletoItems),
  makeFiesta("minecraft", "Minecraft", 38000, defaultFiestaItems),
  makeRegalo("minecraft", "Minecraft", 58000, [{ name: "Espada de diamante", emoji: "⚔️" }, { name: "Remera Creeper", emoji: "👕" }, { name: "Set LEGO Minecraft", emoji: "🧱" }, { name: "Peluche Creeper", emoji: "🧸" }, { name: "Lampara bloque", emoji: "💡" }]),
  makeCompleto("minecraft", "Minecraft", 119000, defaultCompletoItems),
  makeFiesta("futbol-argentina", "Argentina", 40000, defaultFiestaItems, "Mas vendido"),
  makeRegalo("futbol-argentina", "Argentina", 75000, [{ name: "Camiseta Seleccion", emoji: "👕" }, { name: "Pelota N5", emoji: "⚽" }, { name: "Medias", emoji: "🧦" }, { name: "Botella AFA", emoji: "🥤" }, { name: "Album de figuritas", emoji: "🃏" }]),
  makeCompleto("futbol-argentina", "Argentina", 145000, defaultCompletoItems),
  makeFiesta("bluey", "Bluey", 39000, defaultFiestaItems, "Tendencia"),
  makeRegalo("bluey", "Bluey", 55000, [{ name: "Peluche Bluey", emoji: "🐕" }, { name: "Peluche Bingo", emoji: "🐶" }, { name: "Juegos familiares", emoji: "🎲" }, { name: "Remera Bluey", emoji: "👕" }, { name: "Libro actividades", emoji: "📖" }]),
  makeCompleto("bluey", "Bluey", 115000, defaultCompletoItems),
  makeFiesta("disney-princesas", "Princesas", 43000, defaultFiestaItems),
  makeRegalo("disney-princesas", "Princesas", 65000, [{ name: "Vestido de princesa", emoji: "👗" }, { name: "Corona con brillos", emoji: "👑" }, { name: "Muneca Disney", emoji: "🧸" }, { name: "Set joyeria", emoji: "💎" }, { name: "Varita luminosa", emoji: "✨" }]),
  makeCompleto("disney-princesas", "Princesas", 129000, defaultCompletoItems),
  makeFiesta("spider-man", "Spider-Man", 41000, defaultFiestaItems),
  makeRegalo("spider-man", "Spider-Man", 62000, [{ name: "Disfraz Spider-Man", emoji: "🦸" }, { name: "Lanzador de telaranas", emoji: "🕸️" }, { name: "Figura de accion", emoji: "🧸" }, { name: "Remera Spider-Man", emoji: "👕" }, { name: "Mochila", emoji: "🎒" }]),
  makeCompleto("spider-man", "Spider-Man", 125000, defaultCompletoItems),
  makeFiesta("dragon-ball", "Dragon Ball", 41000, defaultFiestaItems, "Tendencia"),
  makeRegalo("dragon-ball", "Dragon Ball", 65000, [{ name: "7 esferas del dragon", emoji: "🔮" }, { name: "Figura Goku", emoji: "🥋" }, { name: "Remera Kame House", emoji: "👕" }, { name: "Gorra Z", emoji: "🧢" }, { name: "Manga Dragon Ball #1", emoji: "📖" }]),
  makeCompleto("dragon-ball", "Dragon Ball", 127000, defaultCompletoItems),
  makeFiesta("taylor-swift", "Taylor Swift", 44000, defaultFiestaItems),
  makeFiesta("pokemon", "Pokemon", 40000, defaultFiestaItems),
  makeFiesta("sprunki", "Sprunki", 38000, defaultFiestaItems, "Viral"),
];

function buildDigitalProducts(): DigitalProduct[] {
  const list: DigitalProduct[] = [];
  for (const theme of themes) {
    for (const cat of digitalCategories) {
      list.push({
        id: `${cat.id}-${theme.slug}`,
        themeSlug: theme.slug,
        category: cat.id,
        name: `${cat.name} ${theme.name}`,
        description: `${cat.description} Tema ${theme.name}.`,
        price: cat.price,
        originalPrice: cat.originalPrice,
        coverImage: theme.image,
      });
    }
  }
  return list;
}

export const digitalProducts: DigitalProduct[] = buildDigitalProducts();

export function getThemeBySlug(slug: string): ThemeData | undefined {
  return themes.find((t) => t.slug === slug);
}

export function getCombosByTheme(themeSlug: string): Combo[] {
  return combos.filter((c) => c.themeSlug === themeSlug);
}

export function getComboById(id: string): Combo | undefined {
  return combos.find((c) => c.id === id);
}

export function getDigitalCategory(id: string): DigitalCategoryMeta | undefined {
  return digitalCategories.find((c) => c.id === id);
}

export function getDigitalProduct(categoryId: DigitalCategoryId, themeSlug: string): DigitalProduct | undefined {
  return digitalProducts.find((p) => p.category === categoryId && p.themeSlug === themeSlug);
}

export function getDigitalProductsByTheme(themeSlug: string): DigitalProduct[] {
  return digitalProducts.filter((p) => p.themeSlug === themeSlug);
}

export function getDigitalProductsByCategory(categoryId: DigitalCategoryId): DigitalProduct[] {
  return digitalProducts.filter((p) => p.category === categoryId);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
