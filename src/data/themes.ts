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
  | "etiquetas"
  | "toppers"
  | "stickers"
  | "cotillon-banderines"
  | "mega-kit"
  | "souvenirs"
  | "otros";

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
    ageRange: "10-15 años",
    popular: true,
    trending: true,
    image: "/images/themes/stranger-things/cover.png",
    palette: { primary: "#b91c1c", secondary: "#fbbf24", accent: "#7f1d1d", light: "#fef3c7", dark: "#1c1917" },
  },
  {
    slug: "wicked",
    name: "Wicked",
    category: "series",
    description: "Magia verde y rosa. Defying gravity en su cumpleaños.",
    emoji: "🧙‍♀️",
    gradient: "from-emerald-600 via-green-500 to-pink-400",
    ageRange: "8-14 años",
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
    ageRange: "9-16 años",
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
    ageRange: "6-13 años",
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
    ageRange: "5-15 años",
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
    ageRange: "3-7 años",
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
    ageRange: "4-10 años",
    popular: true,
    image: "/images/themes/disney-princesas/cover.png",
    palette: { primary: "#ec4899", secondary: "#fbbf24", accent: "#be185d", light: "#fdf2f8", dark: "#831843" },
  },
  {
    slug: "spider-man",
    name: "Spider-Man",
    category: "series",
    description: "Con gran poder, viene un gran cumpleaños.",
    emoji: "🕷️",
    gradient: "from-red-600 via-red-500 to-blue-700",
    ageRange: "5-12 años",
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
    ageRange: "6-14 años",
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
    ageRange: "8-16 años",
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
    ageRange: "5-12 años",
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
    ageRange: "8-15 años",
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
    ageRange: "4-11 años",
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
    ageRange: "7-14 años",
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
    ageRange: "7-14 años",
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
    ageRange: "8-14 años",
    popular: false,
    image: "/images/themes/among-us/cover.png",
    palette: { primary: "#312e81", secondary: "#06b6d4", accent: "#1e1b4b", light: "#eef2ff", dark: "#1e1b4b" },
  },
  {
    slug: "guerreras-kpop",
    name: "Guerreras K-Pop",
    category: "musica",
    description: "Huntrix, Saja Boys y la saga de Demon Hunters. Ramen, soda pop y magia.",
    emoji: "🗡️",
    gradient: "from-fuchsia-500 via-red-500 to-blue-600",
    ageRange: "9-16 años",
    popular: true,
    trending: true,
    image: "/images/themes/guerreras-kpop/cover.png",
    palette: { primary: "#d946ef", secondary: "#ef4444", accent: "#1e3a8a", light: "#fdf4ff", dark: "#701a75" },
  },
  {
    slug: "italian-brainrot",
    name: "Italian Brainrot",
    category: "gaming",
    description: "Tralalero Tralala, Tung Tung Sahur, Bombardino. El viral que aman.",
    emoji: "🦈",
    gradient: "from-teal-400 via-pink-400 to-yellow-400",
    ageRange: "7-13 años",
    popular: true,
    trending: true,
    image: "/images/themes/italian-brainrot/cover.png",
    palette: { primary: "#14b8a6", secondary: "#ec4899", accent: "#f59e0b", light: "#f0fdfa", dark: "#134e4a" },
  },
  {
    slug: "99-noches-bosque",
    name: "99 Noches en el Bosque",
    category: "gaming",
    description: "El juego de Roblox que esta rompiendola. Misterio y aventura.",
    emoji: "🌲",
    gradient: "from-emerald-800 via-slate-900 to-amber-800",
    ageRange: "7-14 años",
    popular: true,
    trending: true,
    image: "/images/themes/99-noches-bosque/cover.png",
    palette: { primary: "#065f46", secondary: "#b45309", accent: "#1e293b", light: "#f0fdf4", dark: "#022c22" },
  },
  {
    slug: "cinnamoroll",
    name: "Cinnamoroll",
    category: "animacion",
    description: "Cinnamoroll y el universo Sanrio. Ultra tierno, pastel y celestial.",
    emoji: "☁️",
    gradient: "from-sky-200 via-pink-200 to-purple-200",
    ageRange: "4-10 años",
    popular: true,
    image: "/images/themes/cinnamoroll/cover.png",
    palette: { primary: "#7dd3fc", secondary: "#f9a8d4", accent: "#a78bfa", light: "#f0f9ff", dark: "#0c4a6e" },
  },
  {
    slug: "fortnite",
    name: "Fortnite",
    category: "gaming",
    description: "Battle royale en su cumple. Neon, skins y victory royale.",
    emoji: "🎮",
    gradient: "from-violet-600 via-orange-500 to-cyan-500",
    ageRange: "7-14 años",
    popular: true,
    image: "/images/themes/fortnite/cover.png",
    palette: { primary: "#7c3aed", secondary: "#f97316", accent: "#06b6d4", light: "#faf5ff", dark: "#4c1d95" },
  },
  {
    slug: "chicas-superpoderosas",
    name: "Chicas Superpoderosas",
    category: "animacion",
    description: "Bombon, Burbuja y Bellota: tres chicas, tres colores, un cumple epico.",
    emoji: "💖",
    gradient: "from-pink-400 via-emerald-300 to-sky-400",
    ageRange: "4-10 años",
    popular: false,
    image: "/images/themes/chicas-superpoderosas/cover.png",
    palette: { primary: "#f472b6", secondary: "#6ee7b7", accent: "#60a5fa", light: "#fdf2f8", dark: "#831843" },
  },
];

export const digitalCategories: DigitalCategoryMeta[] = [
  {
    id: "invitaciones",
    name: "Invitaciones digitales",
    shortName: "Invitaciones",
    description: "Invitacion personalizada lista para mandar por WhatsApp.",
    longDescription: "Invitacion digital en PDF y PNG 4K con el nombre del cumpleañero, edad, fecha, hora y lugar. Entrega al instante apenas compras, lista para compartir por WhatsApp o redes.",
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
  {
    id: "toppers",
    name: "Toppers para torta",
    shortName: "Toppers",
    description: "Toppers imprimibles para la torta del cumple.",
    longDescription: "Pack de toppers en PDF alta calidad listos para imprimir y pegar en palillos. Ideal para torta central y cupcakes. Personalizable con nombre y edad.",
    emoji: "🎂",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    price: 3500,
    originalPrice: 6500,
    requiresEvent: false,
  },
  {
    id: "stickers",
    name: "Stickers",
    shortName: "Stickers",
    description: "Stickers imprimibles para decorar todo.",
    longDescription: "Pack de stickers en PDF listos para imprimir en papel adhesivo o vinilo. Para cuadernos, mochilas, regalos y deco.",
    emoji: "✨",
    gradient: "from-purple-400 via-pink-400 to-rose-400",
    price: 3500,
    originalPrice: 6300,
    requiresEvent: false,
  },
  {
    id: "cotillon-banderines",
    name: "Banderines y cotillon",
    shortName: "Cotillon",
    description: "Banderines, guirnaldas y decoracion imprimible.",
    longDescription: "Pack de cotillon imprimible: banderines, guirnaldas, individuales y deco de mesa. Solo imprimir, recortar y armar.",
    emoji: "🎉",
    gradient: "from-pink-400 via-purple-500 to-indigo-500",
    price: 4500,
    originalPrice: 8100,
    requiresEvent: false,
  },
  {
    id: "mega-kit",
    name: "Mega Kit",
    shortName: "Mega Kit",
    description: "Packs grandes con 99+ disenos incluidos.",
    longDescription: "Mega Kits con 99, 110 o 127 disenos HD en PNG transparente y PDF. Ideal para sublimar en masa, emprendedores y mamas que quieren tener todo.",
    emoji: "📦",
    gradient: "from-indigo-600 via-purple-600 to-fuchsia-600",
    price: 12900,
    originalPrice: 23000,
    requiresEvent: false,
    badge: "Mejor valor",
  },
  {
    id: "souvenirs",
    name: "Souvenirs",
    shortName: "Souvenirs",
    description: "Detalles de agradecimiento para invitados.",
    longDescription: "Souvenirs imprimibles con personalizacion: 'Gracias por venir', cajitas, tarjetas, etiquetas para golosinas. El toque final del cumple.",
    emoji: "🎁",
    gradient: "from-rose-400 via-amber-400 to-yellow-400",
    price: 2900,
    originalPrice: 5200,
    requiresEvent: false,
  },
  {
    id: "otros",
    name: "Otros imprimibles",
    shortName: "Otros",
    description: "Juegos, wellness, afirmaciones y mas.",
    longDescription: "Imprimibles variados: juegos de rol, tarjetas de afirmaciones, wellness, organizadores y mucho mas.",
    emoji: "🧩",
    gradient: "from-slate-400 via-gray-500 to-zinc-500",
    price: 3900,
    originalPrice: 7000,
    requiresEvent: false,
  },
];

export function getThemeBySlug(slug: string): ThemeData | undefined {
  return themes.find((t) => t.slug === slug);
}

export function getDigitalCategory(id: string): DigitalCategoryMeta | undefined {
  return digitalCategories.find((c) => c.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
