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
}

export interface ComboItem {
  name: string;
  emoji: string;
}

export type ComboType = "fiesta" | "regalo" | "completo" | "digital";

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
  { slug: "stranger-things", name: "Stranger Things", category: "series", description: "El Upside Down llega a la fiesta. Luces y aventura.", emoji: "🔦", gradient: "from-red-900 via-red-700 to-amber-900", ageRange: "10-15 anos", popular: true, trending: true },
  { slug: "wicked", name: "Wicked", category: "series", description: "Magia verde y rosa. Defying gravity en su cumpleanos.", emoji: "🧙‍♀️", gradient: "from-emerald-600 via-green-500 to-pink-400", ageRange: "8-14 anos", popular: true, trending: true },
  { slug: "kpop-bts", name: "K-Pop / BTS", category: "musica", description: "Army presente. Violeta, estrellas y K-Pop.", emoji: "💜", gradient: "from-violet-600 via-purple-500 to-fuchsia-500", ageRange: "9-16 anos", popular: true },
  { slug: "minecraft", name: "Minecraft", category: "gaming", description: "Bloques, creepers y aventura pixelada.", emoji: "⛏️", gradient: "from-green-700 via-emerald-600 to-lime-500", ageRange: "6-13 anos", popular: true },
  { slug: "futbol-argentina", name: "Futbol Argentina", category: "deportes", description: "La Scaloneta en la fiesta. Camiseta y pasion.", emoji: "🏆", gradient: "from-sky-500 via-sky-400 to-white", ageRange: "5-15 anos", popular: true },
  { slug: "bluey", name: "Bluey", category: "animacion", description: "La familia Heeler llega al cumple.", emoji: "🐕", gradient: "from-sky-400 via-blue-500 to-orange-400", ageRange: "3-7 anos", popular: true, trending: true },
  { slug: "disney-princesas", name: "Disney Princesas", category: "animacion", description: "Magia, castillos y coronas.", emoji: "👑", gradient: "from-pink-400 via-rose-300 to-amber-200", ageRange: "4-10 anos", popular: true },
  { slug: "spider-man", name: "Spider-Man", category: "series", description: "Con gran poder, viene un gran cumpleanos.", emoji: "🕷️", gradient: "from-red-600 via-red-500 to-blue-700", ageRange: "5-12 anos", popular: true },
  { slug: "dragon-ball", name: "Dragon Ball", category: "animacion", description: "Goku, Vegeta y las esferas del dragon.", emoji: "🐉", gradient: "from-orange-500 via-amber-500 to-yellow-400", ageRange: "6-14 anos", popular: true, trending: true },
  { slug: "taylor-swift", name: "Taylor Swift", category: "musica", description: "Eras Tour en version cumple.", emoji: "✨", gradient: "from-violet-400 via-pink-300 to-amber-200", ageRange: "8-16 anos", popular: false },
  { slug: "pokemon", name: "Pokemon", category: "gaming", description: "Pikachu y amigos en la fiesta.", emoji: "⚡", gradient: "from-yellow-400 via-amber-400 to-red-500", ageRange: "5-12 anos", popular: false },
  { slug: "harry-potter", name: "Harry Potter", category: "series", description: "Magia, varitas y Hogwarts.", emoji: "🧙", gradient: "from-amber-700 via-yellow-600 to-purple-900", ageRange: "8-15 anos", popular: false },
  { slug: "barbie", name: "Barbie", category: "moda", description: "Think pink. Todo el universo Barbie.", emoji: "💖", gradient: "from-pink-500 via-pink-400 to-fuchsia-400", ageRange: "4-11 anos", popular: false },
  { slug: "roblox", name: "Roblox", category: "gaming", description: "El metaverso llega al cumple.", emoji: "🎲", gradient: "from-red-500 via-gray-800 to-gray-900", ageRange: "7-14 anos", popular: false },
  { slug: "sprunki", name: "Sprunki", category: "gaming", description: "El fenomeno viral que aman los chicos.", emoji: "🎵", gradient: "from-purple-500 via-pink-500 to-red-500", ageRange: "7-14 anos", popular: false, trending: true },
  { slug: "among-us", name: "Among Us", category: "gaming", description: "Quien es el impostor? Misterio en el espacio.", emoji: "🚀", gradient: "from-indigo-900 via-blue-800 to-cyan-500", ageRange: "8-14 anos", popular: false },
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
function makeDigital(id: string, theme: string, price: number, items: ComboItem[]): Combo {
  return { id: `${id}-digital`, themeSlug: id, name: "Kit Digital", type: "digital", description: `Imprimibles ${theme}: libro para colorear, cotillon y toppers.`, price, originalPrice: Math.round(price * 1.8), items, badge: "Descarga al instante" };
}

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
  { name: "Pinata tematica", emoji: "🪥" },
];
const defaultDigitalItems: ComboItem[] = [
  { name: "Libro para colorear (20 pags)", emoji: "🎨" },
  { name: "Kit cotillon imprimible", emoji: "🎉" },
  { name: "Banderines editables", emoji: "🏳️" },
  { name: "Toppers para torta", emoji: "🎂" },
  { name: "Invitaciones editables", emoji: "💌" },
  { name: "Actividades para imprimir", emoji: "📝" },
];

export const combos: Combo[] = [
  makeFiesta("stranger-things", "Stranger Things", 45000, defaultFiestaItems, "Mas vendido"),
  makeRegalo("stranger-things", "Stranger Things", 68000, [{ name: "Remera Stranger Things", emoji: "👕" }, { name: "Funko Pop Eleven", emoji: "🎭" }, { name: "Set stickers", emoji: "🏷️" }, { name: "Mochila", emoji: "🎒" }, { name: "Gorra bordada", emoji: "🧮" }]),
  makeCompleto("stranger-things", "Stranger Things", 135000, defaultCompletoItems),
  makeDigital("stranger-things", "Stranger Things", 4500, defaultDigitalItems),
  makeFiesta("wicked", "Wicked", 43000, defaultFiestaItems, "Nuevo"),
  makeRegalo("wicked", "Wicked", 62000, [{ name: "Varita magica luminosa", emoji: "✨" }, { name: "Capa de Elphaba", emoji: "🧙‍♀️" }, { name: "Libro de canciones", emoji: "📖" }, { name: "Set maquillaje verde", emoji: "💚" }, { name: "Diadema Glinda", emoji: "🎀" }]),
  makeCompleto("wicked", "Wicked", 125000, defaultCompletoItems),
  makeDigital("wicked", "Wicked", 4500, defaultDigitalItems),
  makeFiesta("kpop-bts", "K-Pop", 42000, defaultFiestaItems),
  makeRegalo("kpop-bts", "K-Pop", 72000, [{ name: "Lightstick oficial", emoji: "🔦" }, { name: "Photocards", emoji: "🃏" }, { name: "Remera BTS", emoji: "👕" }, { name: "Set pulseras", emoji: "📿" }, { name: "Poster", emoji: "🖼️" }], "Mas vendido"),
  makeCompleto("kpop-bts", "K-Pop", 139000, defaultCompletoItems),
  makeDigital("kpop-bts", "K-Pop", 4500, defaultDigitalItems),
  makeFiesta("minecraft", "Minecraft", 38000, defaultFiestaItems),
  makeRegalo("minecraft", "Minecraft", 58000, [{ name: "Espada de diamante", emoji: "⚔️" }, { name: "Remera Creeper", emoji: "👕" }, { name: "Set LEGO Minecraft", emoji: "🧱" }, { name: "Peluche Creeper", emoji: "🧸" }, { name: "Lampara bloque", emoji: "💡" }]),
  makeCompleto("minecraft", "Minecraft", 119000, defaultCompletoItems),
  makeDigital("minecraft", "Minecraft", 3900, defaultDigitalItems),
  makeFiesta("futbol-argentina", "Argentina", 40000, defaultFiestaItems, "Mas vendido"),
  makeRegalo("futbol-argentina", "Argentina", 75000, [{ name: "Camiseta Seleccion", emoji: "👕" }, { name: "Pelota N5", emoji: "⚽" }, { name: "Medias", emoji: "🧦" }, { name: "Botella AFA", emoji: "🥤" }, { name: "Album de figuritas", emoji: "🃏" }]),
  makeCompleto("futbol-argentina", "Argentina", 145000, defaultCompletoItems),
  makeDigital("futbol-argentina", "Messi/Argentina", 4500, defaultDigitalItems),
  makeFiesta("bluey", "Bluey", 39000, defaultFiestaItems, "Tendencia"),
  makeRegalo("bluey", "Bluey", 55000, [{ name: "Peluche Bluey", emoji: "🐕" }, { name: "Peluche Bingo", emoji: "🐶" }, { name: "Juegos familiares", emoji: "🎲" }, { name: "Remera Bluey", emoji: "👕" }, { name: "Libro actividades", emoji: "📖" }]),
  makeCompleto("bluey", "Bluey", 115000, defaultCompletoItems),
  makeDigital("bluey", "Bluey", 3900, defaultDigitalItems),
  makeFiesta("disney-princesas", "Princesas", 43000, defaultFiestaItems),
  makeRegalo("disney-princesas", "Princesas", 65000, [{ name: "Vestido de princesa", emoji: "👗" }, { name: "Corona con brillos", emoji: "👑" }, { name: "Muneca Disney", emoji: "🧸" }, { name: "Set joyeria", emoji: "💎" }, { name: "Varita luminosa", emoji: "✨" }]),
  makeCompleto("disney-princesas", "Princesas", 129000, defaultCompletoItems),
  makeDigital("disney-princesas", "Princesas", 4500, defaultDigitalItems),
  makeFiesta("spider-man", "Spider-Man", 41000, defaultFiestaItems),
  makeRegalo("spider-man", "Spider-Man", 62000, [{ name: "Disfraz Spider-Man", emoji: "🦸" }, { name: "Lanzador de telaranas", emoji: "🕸️" }, { name: "Figura de accion", emoji: "🧸" }, { name: "Remera Spider-Man", emoji: "👕" }, { name: "Mochila", emoji: "🎒" }]),
  makeCompleto("spider-man", "Spider-Man", 125000, defaultCompletoItems),
  makeDigital("spider-man", "Spider-Man", 4500, defaultDigitalItems),
  makeFiesta("dragon-ball", "Dragon Ball", 41000, defaultFiestaItems, "Tendencia"),
  makeRegalo("dragon-ball", "Dragon Ball", 65000, [{ name: "7 esferas del dragon", emoji: "🔮" }, { name: "Figura Goku", emoji: "🥋" }, { name: "Remera Kame House", emoji: "👕" }, { name: "Gorra Z", emoji: "🧮" }, { name: "Manga Dragon Ball #1", emoji: "📖" }]),
  makeCompleto("dragon-ball", "Dragon Ball", 127000, defaultCompletoItems),
  makeDigital("dragon-ball", "Dragon Ball", 4500, defaultDigitalItems),
  makeFiesta("taylor-swift", "Taylor Swift", 44000, defaultFiestaItems),
  makeDigital("taylor-swift", "Taylor Swift", 4500, defaultDigitalItems),
  makeFiesta("pokemon", "Pokemon", 40000, defaultFiestaItems),
  makeDigital("pokemon", "Pokemon", 3900, defaultDigitalItems),
  makeFiesta("sprunki", "Sprunki", 38000, defaultFiestaItems, "Viral"),
  makeDigital("sprunki", "Sprunki", 3500, defaultDigitalItems),
];

export function getThemeBySlug(slug: string): ThemeData | undefined {
  return themes.find((t) => t.slug === slug);
}

export function getCombosByTheme(themeSlug: string): Combo[] {
  return combos.filter((c) => c.themeSlug === themeSlug);
}

export function getComboById(id: string): Combo | undefined {
  return combos.find((c) => c.id === id);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
