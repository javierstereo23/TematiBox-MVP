const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, PageBreak, PageNumber,
  ExternalHyperlink
} = require('docx');

// ═══════════════════════════════════════════════════════════════
// DYNAMO Website Content — Complete Document
// ═══════════════════════════════════════════════════════════════

const PURPLE = '6B21A8';
const LIME = '84CC16';
const DARK = '0F0A1A';
const GRAY = '6B7280';
const LIGHT_PURPLE = 'F3E8FF';
const WHITE = 'FFFFFF';

const border = { style: BorderStyle.SINGLE, size: 1, color: 'D1D5DB' };
const borders = { top: border, bottom: border, left: border, right: border };
const noBorder = { style: BorderStyle.NONE, size: 0 };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };
const cellMargins = { top: 80, bottom: 80, left: 120, right: 120 };

function heading1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 400, after: 200 },
    children: [new TextRun({ text, bold: true, size: 36, font: 'Arial', color: PURPLE })]
  });
}

function heading2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 150 },
    children: [new TextRun({ text, bold: true, size: 28, font: 'Arial', color: DARK })]
  });
}

function heading3(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 24, font: 'Arial', color: PURPLE })]
  });
}

function bodyText(text) {
  return new Paragraph({
    spacing: { after: 120 },
    children: [new TextRun({ text, size: 20, font: 'Arial', color: '374151' })]
  });
}

function tagLine(text) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [new TextRun({ text: text.toUpperCase(), size: 16, font: 'Arial', color: PURPLE, bold: true })]
  });
}

function bulletPoint(text, bold_prefix) {
  const children = [];
  if (bold_prefix) {
    children.push(new TextRun({ text: bold_prefix + ' ', bold: true, size: 20, font: 'Arial' }));
    children.push(new TextRun({ text, size: 20, font: 'Arial', color: '374151' }));
  } else {
    children.push(new TextRun({ text, size: 20, font: 'Arial', color: '374151' }));
  }
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 60 },
    children
  });
}

function statItem(value, label) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: value + ' ', bold: true, size: 24, font: 'Arial', color: PURPLE }),
      new TextRun({ text: label, size: 20, font: 'Arial', color: GRAY })
    ]
  });
}

function ctaButton(text) {
  return new Paragraph({
    spacing: { after: 60 },
    children: [
      new TextRun({ text: '\u27A4 ', size: 20, font: 'Arial', color: PURPLE }),
      new TextRun({ text, bold: true, size: 20, font: 'Arial', color: PURPLE })
    ]
  });
}

function separator() {
  return new Paragraph({
    spacing: { before: 200, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: PURPLE, space: 8 } },
    children: []
  });
}

function cardBlock(title, description) {
  return [
    new Paragraph({
      spacing: { before: 120, after: 40 },
      children: [new TextRun({ text: title, bold: true, size: 20, font: 'Arial', color: DARK })]
    }),
    new Paragraph({
      spacing: { after: 100 },
      children: [new TextRun({ text: description, size: 18, font: 'Arial', color: GRAY })]
    })
  ];
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// ═══════════════════════════════════════════════════════════════
// BUILD DOCUMENT
// ═══════════════════════════════════════════════════════════════

const children = [];

// ── COVER PAGE ──
children.push(
  new Paragraph({ spacing: { before: 3000 }, children: [] }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'DYNAMO', bold: true, size: 72, font: 'Arial', color: PURPLE })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: 'Website Content Document', size: 36, font: 'Arial', color: DARK })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 400 },
    children: [new TextRun({ text: 'Contenido completo del sitio web \u2014 Todas las p\u00e1ginas', size: 24, font: 'Arial', color: GRAY })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: 'dynamo.tech', size: 22, font: 'Arial', color: PURPLE, bold: true })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 100 },
    children: [new TextRun({ text: 'Abril 2026', size: 20, font: 'Arial', color: GRAY })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: '13 p\u00e1ginas \u00b7 4 idiomas \u00b7 60+ rutas', size: 18, font: 'Arial', color: GRAY })]
  }),
  pageBreak()
);

// ── TABLE OF CONTENTS ──
children.push(
  heading1('Contenido del Documento'),
  bodyText(''),
  ...[
    '1. HOME \u2014 P\u00e1gina principal',
    '2. JOURNEYS \u2014 Plataforma de orquestaci\u00f3n omnicanal',
    '3. SAT PUSH \u2014 Canal diferencial',
    '4. CVM / CORE \u2014 Self-service para equipos de CVM',
    '5. VAS & MANAGED SERVICES \u2014 Monetizaci\u00f3n de inventario',
    '6. OTA CLOUD & SIM \u2014 Tecnolog\u00eda propietaria',
    '7. INTEGRACIONES \u2014 Ecosistema conectado',
    '8. STUDIO (EMPRESAS) \u2014 Plataforma conversacional',
    '9. SOBRE NOSOTROS \u2014 Historia, equipo y valores',
    '10. CASOS DE \u00c9XITO \u2014 Resultados reales',
    '11. QUALIFY \u2014 Journey de calificaci\u00f3n de leads',
    '12. CONTACTO \u2014 Formulario y datos',
    '13. BLOG \u2014 Art\u00edculos y tendencias Telco',
    '14. ONE-PAGERS \u2014 Res\u00famenes ejecutivos (CVM, VAS, SMB)',
  ].map(t => bulletPoint(t)),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 1: HOME
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('1. HOME'),
  bodyText('Ruta: / (ra\u00edz del sitio)'),
  separator(),

  // Hero
  heading2('Hero Section'),
  tagLine('Orquestaci\u00f3n omnicanal para Telcos'),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'El mensaje justo, el canal preciso, el momento exacto.', bold: true, size: 32, font: 'Arial', color: DARK })]
  }),
  bodyText('Captur\u00e1 eventos en tiempo real, constru\u00ed audiencias por afinidad y activ\u00e1 journeys automatizados impulsados por AI, en todos los canales, con cero fricci\u00f3n y orquestaci\u00f3n total de la operaci\u00f3n.'),
  bodyText(''),
  bodyText('Visualizaci\u00f3n interactiva del Journey Flow:'),
  bulletPoint('Evento: \u201cPlan de datos vencido\u201d'),
  bulletPoint('AI Brain procesa el evento'),
  bulletPoint('Env\u00eda SAT Push: \u201cTu plan de datos est\u00e1 a punto de vencerse. Tenemos un mejor plan para vos.\u201d'),
  bulletPoint('Confirmaci\u00f3n WhatsApp: \u201cTe compartimos 3 opciones para activar tu nuevo plan\u201d'),
  bulletPoint('Opciones: 4GB $5/mes \u00b7 2GB $3/mes \u00b7 Ilimitados $10/mes'),
  bodyText(''),
  bodyText('Canales mostrados: SAT Push, WhatsApp, RCS, SMS, Email, Instagram, Messenger, USSD'),
  bodyText(''),
  ctaButton('Agendar Demo'),
  ctaButton('Descubr\u00ed tu soluci\u00f3n'),
  bodyText(''),
  statItem('+500M', 'usuarios/mes'),
  statItem('+20', 'Telcos'),
  statItem('+10', 'pa\u00edses'),
  statItem('15+', 'a\u00f1os'),
  separator(),

  // Logo Bar
  heading2('Logo Bar'),
  bodyText('Operadores que conf\u00edan en nosotros: Claro, Tigo, Telef\u00f3nica, MTN, WOM, Altice, Cell C, Entel'),
  separator(),

  // Challenge
  heading2('El Desaf\u00edo'),
  tagLine('El desaf\u00edo'),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'Los problemas que frenan tu operaci\u00f3n hoy', bold: true, size: 28, font: 'Arial', color: DARK })]
  }),
  ...cardBlock('Problema 01: Canales que no se hablan', 'Cada canal opera en su silo. La experiencia del usuario se fragmenta y la conversi\u00f3n cae.'),
  ...cardBlock('Problema 02: Campa\u00f1as manuales que pierden timing', 'Sin automatizaci\u00f3n real, cada campa\u00f1a requiere intervenci\u00f3n. Imposible operar a escala.'),
  ...cardBlock('Problema 03: Segmentaci\u00f3n que no distingue', 'Mensajes gen\u00e9ricos para todos. Sin capacidad de segmentar por comportamiento, afinidad o momento del usuario.'),
  ...cardBlock('Problema 04: Sin visibilidad del impacto real', '\u00bfQu\u00e9 canal convierte m\u00e1s? \u00bfQu\u00e9 producto performa mejor? Sin datos end-to-end, las decisiones son a ciegas.'),
  ...cardBlock('Problema 05: Fraude en pauta digital y sin gobernanza', 'Altas tasas de reclamaci\u00f3n por fraude en pauta digital. Baja capacidad de control y gobernanza sobre los canales de adquisici\u00f3n de servicios VAS.'),
  separator(),

  // Journeys Section (Home)
  heading2('DYNAMO Journeys \u2014 Journey Builder'),
  tagLine('DYNAMO Journeys'),
  new Paragraph({
    spacing: { after: 150 },
    children: [new TextRun({ text: 'La plataforma que conecta tu infraestructura con cada canal', bold: true, size: 28, font: 'Arial', color: DARK })]
  }),
  bodyText('Capturamos eventos en tiempo real desde tu HLR, Billing y CRM. Construimos audiencias por afinidad con AI. Activamos journeys omnicanal automatizados que convierten.'),
  bodyText(''),
  heading3('Journey Builder \u2014 Migraci\u00f3n Prepago a Pospago'),
  bodyText('Triggers: Fin de cuota \u00b7 Data plan agotado \u00b7 Vencimiento \u00b7 Nuevo cliente'),
  bodyText('Canal principal: SAT Push \u2014 \u201cDetectamos que tu plan prepago no te alcanza. Migr\u00e1 a Pospago Ilimitado 10GB por $15/mes.\u201d (89% delivery)'),
  bulletPoint('ACEPTA \u2192 Conversi\u00f3n directa (22% conv.)'),
  bulletPoint('RECHAZA \u2192 WhatsApp 50% OFF (18% CTR)'),
  bulletPoint('NO ENTREGADO \u2192 SMS fallback (94% delivery)'),
  bodyText(''),

  heading3('6 Capacidades'),
  ...cardBlock('1. Orquestaci\u00f3n completa de canales', 'Coordina, automatiza y encadena experiencias en todos los canales Telco y OTT. SAT Push, RCS, WhatsApp, SMS, Instagram, Messenger, flashSMS y Email.'),
  ...cardBlock('2. Estad\u00edsticas y KPIs en tiempo real', 'Analiza el rendimiento de cada journey como embudo completo: intenci\u00f3n, env\u00edos, impactos, clics, conversiones y ventas reales.'),
  ...cardBlock('3. Triggers basados en comportamiento', 'Activa journeys autom\u00e1ticamente ante eventos cr\u00edticos: vencimiento de datos, recargas, compra de terminal, consumo superior al plan, riesgo de churn.'),
  ...cardBlock('4. Motor de reglas de negocio avanzadas', 'Windowing, filtros anti-spam, blacklists/whitelists, priorizaci\u00f3n de canales con fallbacks, ancho de banda controlado.'),
  ...cardBlock('5. Campaign Manager 4-en-1', 'Single-channel, A/B testing, campa\u00f1as program\u00e1ticas y eventos en tiempo real.'),
  ...cardBlock('6. Copilot AI + Real-Time Bidding', 'IA que construye audiencias por afinidad y comportamiento en tiempo real. Incluye RTB para la venta de inventario a Content Providers.'),
  ctaButton('Conocer DYNAMO Journeys en detalle'),
  separator(),

  // SAT Push Differentiator
  heading2('SAT Push: El Arma Secreta del Operador'),
  tagLine('Diferencial clave'),
  ...cardBlock('M\u00faltiples formatos', 'Display, Men\u00fa y Get Input. Combine m\u00faltiples pantallas, con o sin men\u00fa de opciones.'),
  ...cardBlock('Compatibilidad y alcance', 'Compatible con el 95% de los dispositivos m\u00f3viles: b\u00e1sicos, feature phones y smartphones.'),
  ...cardBlock('Interactividad real', 'No solo para adquisici\u00f3n \u2014 permite crear un verdadero di\u00e1logo con el consumidor.'),
  ...cardBlock('10x m\u00e1s conversi\u00f3n', 'SAT Push genera tasas de conversi\u00f3n de 2 a 10 veces m\u00e1s altas que SMS o email marketing.'),
  bodyText(''),
  heading3('Applet propietario + OTA Cloud'),
  bodyText('Compatibilizamos over-the-air toda la base legacy del Operador, sin necesidad de cambiar la SIM card (SIM swap). Compatible con todos los SIM vendors del mercado, incluyendo eSIMs.'),
  bulletPoint('Instalaci\u00f3n OTA sin SIM swap'),
  bulletPoint('Compatible con todos los SIM vendors'),
  bulletPoint('Soporte eSIM'),
  bulletPoint('Encriptaci\u00f3n end-to-end'),
  bulletPoint('Cloud del Operador'),
  separator(),

  // Results
  heading2('Resultados Reales'),
  tagLine('Resultados reales'),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'Telcos que ya transformaron su operaci\u00f3n', bold: true, size: 28, font: 'Arial', color: DARK })]
  }),
  ...cardBlock('Operador Tier 1 \u2014 LATAM', '22% incremento en conversi\u00f3n de campa\u00f1as de upsell con journeys automatizados.'),
  ...cardBlock('Operador l\u00edder \u2014 Chile', '4% CTR con segmentaci\u00f3n AI y fraseolog\u00eda optimizada, +67% vs campa\u00f1as anteriores.'),
  ...cardBlock('Operador \u2014 Sud\u00e1frica', 'USD 2M+ revenue incremental con despliegue OTA del applet SAT Push.'),
  separator(),

  // Testimonials
  heading2('Testimonios'),
  bodyText('\u201cDynamo ha sido aliado de WOM desde su llegada a Colombia y de manera conjunta se ha trabajado, logrando resultados consistentes en \u00e1reas como experiencia y rentabilizaci\u00f3n.\u201d \u2014 Tom\u00e1s Vel\u00e1zquez, Gerente CVM, WOM Colombia'),
  bodyText(''),
  bodyText('\u201cDynamo es un excelente aliado para cualquier compa\u00f1\u00eda. Su capacidad de respuesta, siempre dispuestos a ayudar, a buscar soluciones, su perspectiva de innovaci\u00f3n y su indiscutible conocimiento de las herramientas tecnol\u00f3gicas los hacen el partner perfecto.\u201d \u2014 Juli\u00e1n Tamayo Arias, Product Manager Prepaid, Tigo'),
  bodyText(''),
  bodyText('\u201cDynamo ofrece un excelente servicio, especialmente en atenci\u00f3n y soporte al cliente, que destaca por su alta calidad.\u201d \u2014 Rosanna Ferreira Casado, Lealtad de Clientes, Altice'),
  separator(),

  // Solution Paths
  heading2('Eleg\u00ed tu Camino'),
  tagLine('Tu modelo, tu soluci\u00f3n'),
  heading3('CVM / CORE \u2014 Tu equipo controla todo'),
  bodyText('Plataforma SaaS self-service para equipos de CVM y CORE.'),
  bulletPoint('Journey builder visual drag-and-drop'),
  bulletPoint('Triggers en tiempo real desde tu infraestructura (HLR, Billing, CRM)'),
  bulletPoint('Segmentaci\u00f3n AI con clusters por afinidad'),
  bulletPoint('Campaign Manager 4-en-1'),
  bulletPoint('Motor de reglas: windowing, anti-spam, priorizaci\u00f3n de canales'),
  bulletPoint('Analytics full-funnel: intenci\u00f3n \u2192 conversi\u00f3n \u2192 venta real'),
  bulletPoint('Control de impactos por usuario, canal y per\u00edodo'),
  bulletPoint('Orquestaci\u00f3n de 8+ canales con fallback inteligente'),
  ctaButton('Conocer Journeys para CVM'),
  bodyText(''),
  heading3('VAS + DYNAMO Plus \u2014 Nosotros operamos por vos'),
  bodyText('Managed services + marketplace para \u00e1reas de VAS. Incluye DYNAMO Plus+.'),
  bulletPoint('Marketplace transparente para Content Providers'),
  bulletPoint('Modelos de monetizaci\u00f3n CPM, CPC y CPA'),
  bulletPoint('Sistema de bidding para compra de inventario'),
  bulletPoint('Dashboard ROI en tiempo real por CP y producto'),
  bulletPoint('Wallet integrado con m\u00faltiples medios de pago'),
  bulletPoint('Operaci\u00f3n diaria experta con equipo dedicado DYNAMO'),
  bulletPoint('Integraci\u00f3n con MCP/SDP para optimizaci\u00f3n de audiencias'),
  bulletPoint('Anti-fraude y compliance regulatorio por pa\u00eds'),
  ctaButton('Conocer Journeys para VAS'),
  separator(),

  // CTA
  heading2('CTA Final'),
  new Paragraph({
    spacing: { after: 150 },
    children: [new TextRun({ text: 'Tu pr\u00f3ximo journey empieza ac\u00e1', bold: true, size: 28, font: 'Arial', color: DARK })]
  }),
  bodyText('Eleg\u00ed c\u00f3mo quer\u00e9s avanzar \u2014 agenda una demo personalizada o descubr\u00ed qu\u00e9 soluci\u00f3n se adapta mejor a tu operaci\u00f3n.'),
  ctaButton('Agendar Demo \u2014 Demo personalizada de 30 min'),
  ctaButton('Descubr\u00ed tu soluci\u00f3n \u2014 Respond\u00e9 5 preguntas'),
  ctaButton('Calcular tu ROI \u2014 Simul\u00e1 cu\u00e1nto pod\u00e9s ahorrar'),
  bodyText('+20 Telcos conf\u00edan en nosotros \u00b7 Prueba gratuita por 30 d\u00edas'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 2: JOURNEYS
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('2. JOURNEYS'),
  bodyText('Ruta: /journeys'),
  separator(),

  heading2('Hero'),
  tagLine('DYNAMO Journeys'),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'Orquestaci\u00f3n omnicanal impulsada por AI', bold: true, size: 32, font: 'Arial', color: DARK })]
  }),
  bodyText('Conect\u00e1 tu infraestructura, captur\u00e1 eventos en tiempo real, constru\u00ed audiencias con AI y activ\u00e1 journeys automatizados en todos los canales. Todo desde una sola plataforma.'),
  statItem('+500M', 'usuarios/mes'),
  statItem('+20', 'Telcos'),
  statItem('8+', 'canales'),
  statItem('22%', 'conversi\u00f3n promedio'),
  separator(),

  heading2('El Problema \u2014 \u00bfTe suena familiar?'),
  ...cardBlock('Canales en silos', 'Cada canal opera con su propia herramienta, sin visi\u00f3n unificada del suscriptor ni coordinaci\u00f3n entre equipos.'),
  ...cardBlock('Campa\u00f1as manuales', 'Tu equipo pasa semanas configurando campa\u00f1as que deber\u00edan tomar minutos. Sin automatizaci\u00f3n real.'),
  ...cardBlock('Sin visibilidad', 'No sab\u00e9s qu\u00e9 funciona, qu\u00e9 no, ni pod\u00e9s medir el impacto real de tus comunicaciones.'),
  separator(),

  heading2('As\u00ed lo resolvemos'),
  bodyText('Una sola plataforma para toda tu operaci\u00f3n de CVM. DYNAMO Journeys unifica todos tus canales, automatiza la orquestaci\u00f3n con reglas de negocio inteligentes y te da visibilidad completa del funnel.'),
  bulletPoint('8+ canales orquestados desde un solo lugar'),
  bulletPoint('Journeys automatizados con triggers en tiempo real'),
  bulletPoint('Analytics de funnel completo con KPIs accionables'),
  separator(),

  heading2('Journey Builder \u2014 7 Casos de Uso'),
  bodyText('Arrastr\u00e1, conect\u00e1 y public\u00e1. As\u00ed de simple.'),
  bodyText(''),

  heading3('Tab 1: Migraci\u00f3n de Plan'),
  bodyText('Triggers: Fin de cuota \u00b7 Vencimiento \u00b7 Nuevo cliente \u00b7 Portabilidad'),
  bodyText('Canal: SAT Push \u2014 \u201cMigr\u00e1 a Pospago y llevate 50GB + Netflix gratis\u201d (89% delivery)'),
  bulletPoint('Acepta \u2192 Conversi\u00f3n + SMS (22% conv.)'),
  bulletPoint('Rechaza \u2192 WhatsApp 50% OFF (18% CTR)'),
  bulletPoint('No entregado \u2192 SMS fallback (94% delivery)'),
  bodyText(''),

  heading3('Tab 2: Vencimiento de Datos'),
  bodyText('Triggers: Consumo >80% \u00b7 Cuota al 95% \u00b7 Plan vence 24hs \u00b7 Recarga frecuente'),
  bodyText('Canal: SAT Push \u2014 \u201cTu plan de datos est\u00e1 por vencerse. Activ\u00e1 5GB extra por $3/mes\u201d (91% delivery)'),
  bulletPoint('Acepta \u2192 Conversi\u00f3n + SMS (28% conv.)'),
  bulletPoint('Rechaza \u2192 WhatsApp planes (15% CTR)'),
  bulletPoint('No entregado \u2192 Email recordatorio (92% delivery)'),
  bodyText(''),

  heading3('Tab 3: Prevenci\u00f3n de Churn'),
  bodyText('Triggers: Portabilidad \u00b7 NPS negativo \u00b7 Inactividad 15d \u00b7 Reclamo abierto'),
  bodyText('Canal: WhatsApp \u2014 \u201cSabemos que est\u00e1s evaluando opciones. Tenemos una oferta exclusiva para vos\u201d (92% delivery)'),
  bulletPoint('Acepta \u2192 SAT Push loyalty (34% retenci\u00f3n)'),
  bulletPoint('Rechaza \u2192 Llamada agente (62% contacto)'),
  bulletPoint('No entregado \u2192 SMS oferta final (96% delivery)'),
  bodyText(''),

  heading3('Tab 4: Onboarding'),
  bodyText('Triggers: Alta nueva SIM \u00b7 eSIM provisionada \u00b7 Primera recarga \u00b7 App instalada'),
  bodyText('Canal: SMS \u2014 \u201cBienvenido a [Operador]! Configur\u00e1 tu plan ideal en 2 minutos\u201d (97% delivery)'),
  bulletPoint('Acepta \u2192 WhatsApp tutorial (71% engagement)'),
  bulletPoint('No responde \u2192 SAT Push reminder (89% apertura)'),
  bulletPoint('Completa \u2192 Email resumen (+12pts NPS)'),
  bodyText(''),

  heading3('Tab 5: Cross-sell Terminal'),
  bodyText('Triggers: Contrato >12m \u00b7 Terminal antigua \u00b7 Consumo data alto \u00b7 Upgrade elegible'),
  bodyText('Canal: RCS \u2014 Carrusel de equipos con im\u00e1genes y precios (85% delivery)'),
  bulletPoint('Acepta \u2192 WhatsApp financiaci\u00f3n (8% conversion)'),
  bulletPoint('Rechaza \u2192 SAT Push oferta (12% CTR)'),
  bulletPoint('No entregado \u2192 SMS link web (95% delivery)'),
  bodyText(''),

  heading3('Tab 6: Recupero de Carrito'),
  bodyText('Triggers: Carrito abandonado \u00b7 Compra iniciada \u00b7 Checkout incompleto \u00b7 Pago fallido'),
  bodyText('Canal: WhatsApp \u2014 \u201cTu [producto] te est\u00e1 esperando. Complet\u00e1 tu compra con 10% OFF\u201d (93% delivery)'),
  bulletPoint('Acepta \u2192 Conversi\u00f3n directa (19% recupero)'),
  bulletPoint('Rechaza \u2192 SAT Push 24hs (22% CTR)'),
  bulletPoint('No entregado \u2192 Email con cup\u00f3n (91% delivery)'),
  bodyText(''),

  heading3('Tab 7: Reactivaci\u00f3n'),
  bodyText('Triggers: Inactivo 30 d\u00edas \u00b7 Sin recarga 45d \u00b7 Saldo $0 \u00b7 \u00daltima sesi\u00f3n >30d'),
  bodyText('Canal: SAT Push \u2014 \u201cTe extra\u00f1amos! Recarg\u00e1 hoy y llevate el doble de datos\u201d (90% delivery)'),
  bulletPoint('Acepta \u2192 Conversi\u00f3n + SMS (15% reactivaci\u00f3n)'),
  bulletPoint('Rechaza \u2192 WhatsApp beneficio (11% CTR)'),
  bulletPoint('No entregado \u2192 Email win-back (89% delivery)'),
  separator(),

  heading2('8+ Canales Orquestados'),
  ...cardBlock('SAT Push (Canal estrella)', 'Notificaciones nativas en la SIM del suscriptor. Sin app, sin internet. El canal con mayor alcance y deliverability del mercado.'),
  ...cardBlock('WhatsApp', 'Mensajes ricos con botones, listas y carruseles. Ideal para conversaciones interactivas.'),
  ...cardBlock('RCS', 'El futuro del SMS. Carruseles, botones y rich media directamente en la app de mensajes.'),
  ...cardBlock('SMS', 'El canal universal. Llega a todos los dispositivos, sin importar la tecnolog\u00eda.'),
  ...cardBlock('Email', 'Comunicaciones detalladas con dise\u00f1o responsive y tracking completo.'),
  ...cardBlock('Instagram DM', 'Respuestas automatizadas y campa\u00f1as en el DM m\u00e1s usado por los j\u00f3venes.'),
  ...cardBlock('Messenger', 'Chatbots y flows automatizados en Facebook Messenger para atenci\u00f3n y ventas.'),
  ...cardBlock('USSD', 'Men\u00fas interactivos en dispositivos b\u00e1sicos. Perfecto para mercados emergentes.'),
  separator(),

  heading2('6 Capacidades que Transforman tu Operaci\u00f3n'),
  ...cardBlock('1. Orquestaci\u00f3n completa', 'Coordina 8+ canales con l\u00f3gica de prioridad, fallback y timing.'),
  ...cardBlock('2. Estad\u00edsticas y KPIs', 'Medi todo el funnel: desde el env\u00edo hasta la conversi\u00f3n final. Dashboards en tiempo real.'),
  ...cardBlock('3. Triggers basados en comportamiento', 'Detecta eventos de red, billing y comportamiento en tiempo real.'),
  ...cardBlock('4. Motor de reglas', 'Controla cu\u00e1ndo, c\u00f3mo y a qui\u00e9n le envi\u00e1s. Windowing, anti-spam, blacklist/whitelist.'),
  ...cardBlock('5. Campaign Manager 4-en-1', 'Cuatro modos: single, program\u00e1ticas, event-based y journeys completos.'),
  ...cardBlock('6. Copilot AI + RTB', 'Segmentaci\u00f3n predictiva, personalizaci\u00f3n de contenido y bidding inteligente.'),
  separator(),

  heading2('Triggers + Rules'),
  bodyText('Decisiones inteligentes basadas en comportamiento. Detectamos eventos en tiempo real desde tu infraestructura y activamos el canal correcto.'),
  bodyText('Eventos detectados: Nuevo cliente \u00b7 Fin de cuota \u00b7 Falta de saldo \u00b7 Servicios VAS \u00b7 Compras/Beneficios \u00b7 Llamadas perdidas \u00b7 Perfil de usuario'),
  bodyText('Reglas: Windowing \u00b7 Blacklist \u00b7 Whitelist \u00b7 Anti-spam \u00b7 User Profile + Segmentaci\u00f3n AI'),
  separator(),

  heading2('Analytics'),
  bodyText('Med\u00ed todo el funnel, en tiempo real. Desde el env\u00edo hasta la conversi\u00f3n. Cada paso medido, cada canal comparado.'),
  separator(),

  heading2('CTA Final'),
  bodyText('Tu equipo merece la mejor plataforma. Agenda una demo personalizada y descubr\u00ed c\u00f3mo Journeys puede transformar tu operaci\u00f3n en semanas.'),
  ctaButton('Agendar Demo'),
  ctaButton('Descubr\u00ed tu soluci\u00f3n'),
  ctaButton('Calcular ROI'),
  bodyText('+20 Telcos ya transformaron su operaci\u00f3n'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 3: SAT PUSH
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('3. SAT PUSH'),
  bodyText('Ruta: /sat-push'),
  separator(),

  heading2('Hero'),
  tagLine('Diferencial clave'),
  new Paragraph({
    spacing: { after: 200 },
    children: [new TextRun({ text: 'SAT Push: el canal m\u00e1s performante, ahora con superpowers', bold: true, size: 28, font: 'Arial', color: DARK })]
  }),
  bodyText('Notificaciones nativas de la SIM card con interactividad real, hasta 10x m\u00e1s conversi\u00f3n que SMS y compatible con el 95% de las terminales. Con applet propietario y OTA Cloud de DYNAMO.'),
  statItem('10x', 'Conversi\u00f3n'),
  statItem('95%', 'Compatibilidad'),
  statItem('15+', 'A\u00f1os'),
  separator(),

  heading2('Flujo Interactivo \u2014 5 Pasos'),
  bodyText('Un journey completo que convierte usuarios an\u00f3nimos en miembros VIP.'),
  bulletPoint('Step 1 (Discovery): \u201cHola! Respond\u00e9 3 preguntas y convertite en miembro VIP. Es gratis.\u201d'),
  bulletPoint('Step 2 (Relevancia): \u201c\u00bfCu\u00e1l es tu nombre?\u201d'),
  bulletPoint('Step 3 (Interacci\u00f3n): \u201cSeleccion\u00e1 tu inter\u00e9s:\u201d Travel, Sports, Music, Shopping, Technology'),
  bulletPoint('Step 4 (Optimizaci\u00f3n): \u201cTu rango de edad:\u201d 18-25, 26-35, 36-45, 46-55, 56+'),
  bulletPoint('Step 5 (Efectividad): \u201cGracias Caroline! Ya sos miembro VIP.\u201d'),
  separator(),

  heading2('3 Formatos, Infinitas Posibilidades'),
  ...cardBlock('Display', 'Mensajes informativos con botones de acci\u00f3n. \u201cSu plan de datos est\u00e1 a punto de agotarse. Renu\u00e9velo ahora por $5/semana.\u201d'),
  ...cardBlock('Men\u00fa', 'Men\u00fa de opciones seleccionables: Plan B\u00e1sico 2GB $3/mes \u00b7 Plan Plus 5GB $5/mes \u00b7 Plan Ilimitado 10GB $10/mes \u00b7 Plan Familiar 20GB $15/mes'),
  ...cardBlock('Get Input', 'Recolecci\u00f3n de datos del usuario. Deportes, M\u00fasica, Noticias, Gaming.'),
  separator(),

  heading2('Media Kit \u2014 Casos de Uso SAT Push'),
  heading3('Core Services (9 casos)'),
  bulletPoint('Drive to Call \u2014 Dirigir clientes deudores a llamar al centro de atenci\u00f3n'),
  bulletPoint('Drive to Web \u2014 Enviar teaser con intereses del usuario para generar tr\u00e1fico web'),
  bulletPoint('Notificaciones \u2014 Derivar al men\u00fa SIM Toolkit'),
  bulletPoint('Venta cruzada \u2014 Notificaciones personalizadas con oferta extra'),
  bulletPoint('Nuevo tel\u00e9fono/SIM \u2014 Reducir churn con campa\u00f1as proactivas'),
  bulletPoint('Seguro de tel\u00e9fono \u2014 Seguros, try & buy de datos'),
  bulletPoint('Minutos internacionales \u2014 Revenue de tr\u00e1fico internacional'),
  bulletPoint('Cuota de datos alcanzada \u2014 Vender paquete extra de datos'),
  bulletPoint('Opciones de roaming \u2014 Vender opciones seg\u00fan pa\u00eds destino'),
  bodyText(''),
  heading3('Marcas (5 casos)'),
  bulletPoint('Confirmaci\u00f3n de cita \u00b7 Seguimiento de pago \u00b7 Registro \u00b7 Alerta de oferta \u00b7 Call back'),
  bodyText(''),
  heading3('VAS (4 casos)'),
  bulletPoint('Double opt-in \u00b7 Single opt-in + men\u00fa \u00b7 Cupones y promociones \u00b7 Descarga de apps'),
  bodyText(''),
  heading3('Engagement (4 casos)'),
  bulletPoint('Encuestas \u00b7 Trivias \u00b7 Segmentaci\u00f3n y venta \u00b7 Concursos'),
  bodyText(''),
  heading3('Multimedia (4 casos)'),
  bulletPoint('Branding \u00b7 Core \u00b7 Valor agregado \u00b7 Descarga de apps'),
  bodyText(''),
  bodyText('CTAs disponibles: SMS \u00b7 Llamada \u00b7 USSD \u00b7 Web \u00b7 Descarga de Apps'),
  separator(),

  heading2('Objeciones Resueltas'),
  bodyText('\u00bfYa usaste SAT Push y no tuviste los mejores resultados? Con DYNAMO, la historia es diferente.'),
  ...cardBlock('Antes: \u201cEs invasivo\u201d \u2192 Con DYNAMO: Windowing inteligente', 'Frecuencia controlada, segmentaci\u00f3n AI, ventanas de entrega optimizadas.'),
  ...cardBlock('Antes: \u201cGeneraba reclamos\u201d \u2192 Con DYNAMO: Anti-spam nativo', 'Blacklists autom\u00e1ticas, \u00edndice de repetici\u00f3n y opt-out garantizado.'),
  ...cardBlock('Antes: \u201cHab\u00eda fraude VAS\u201d \u2192 Con DYNAMO: Compliance total', 'Double opt-in obligatorio, marketplace transparente, aprobaci\u00f3n del operador.'),
  separator(),

  heading2('Campaign Manager Mobile Programmatic'),
  bodyText('No somos senders. Optimizamos cada impresi\u00f3n.'),
  bulletPoint('01 Productos \u2014 El Operador define comunicaci\u00f3n y CTA mediante templates'),
  bulletPoint('02 Audiencia \u2014 Selecci\u00f3n por fuente de datos interna o externa'),
  bulletPoint('03 Estrategia \u2014 4 modos: Performance, The Best One, Above X%, Revenue Driven'),
  separator(),

  heading2('8 Diferenciales'),
  bulletPoint('Soluci\u00f3n autoescalable \u2014 100% cloud SaaS'),
  bulletPoint('Expertos a su servicio \u2014 Presentes d\u00eda a d\u00eda'),
  bulletPoint('Sin costos de HW/SW \u2014 Bajos costos mantenimiento'),
  bulletPoint('Estad\u00edsticas aumentadas \u2014 Resultados detallados'),
  bulletPoint('Desarrollos e integraciones \u2014 Software factory a medida'),
  bulletPoint('Campaign Manager inteligente \u2014 Mobile programmatic'),
  bulletPoint('Generamos nuevos ingresos \u2014 Inventario con marcas/CPs'),
  bulletPoint('Implementaci\u00f3n r\u00e1pida \u2014 SAT Push 48hs, RCS 2 semanas'),
  separator(),

  heading2('OTA + Analytics + Resultados'),
  bodyText('Applet propietario + OTA Cloud. Instalaci\u00f3n OTA sin cambiar SIM. Compatible todos los SIM vendors + eSIM.'),
  bodyText(''),
  bodyText('Resultados comprobados:'),
  ...cardBlock('Operador \u2014 Sud\u00e1frica', 'USD 2M+ revenue generado con SAT Push'),
  ...cardBlock('Operador Tier 1 \u2014 LATAM', '22% tasa de conversi\u00f3n promedio'),
  ...cardBlock('Operador \u2014 \u00c1frica Occidental', '8.3% CTR en campa\u00f1as de adquisici\u00f3n'),
  bodyText(''),
  bodyText('CTA: Activ\u00e1 SAT Push en tu red. +20 Telcos ya usan SAT Push con DYNAMO.'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 4: CVM
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('4. CVM & CORE SERVICES'),
  bodyText('Ruta: /cvm'),
  separator(),

  heading2('Hero'),
  tagLine('CVM & CORE Services'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Dale a tu equipo de CVM el control total', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('Plataforma SaaS self-service. Tu equipo construye, lanza y mide journeys omnicanal sin depender de nadie.'),
  separator(),

  heading2('6 Capacidades Self-Service'),
  ...cardBlock('1. Construir journeys visuales drag & drop', 'Dise\u00f1\u00e1 flows omnicanal con l\u00f3gica de fallback, esperas, decisiones y ramificaciones. Sin c\u00f3digo, sin IT.'),
  ...cardBlock('2. Configurar triggers desde tu infraestructura', 'Eventos reales de HLR, Billing y CRM activan journeys autom\u00e1ticamente.'),
  ...cardBlock('3. Segmentar con AI y clusters por afinidad', 'Modelos de machine learning construyen audiencias din\u00e1micas basadas en consumo y comportamiento.'),
  ...cardBlock('4. Lanzar campa\u00f1as en 4 modalidades', 'Single-channel, A/B testing program\u00e1tico, eventos en tiempo real y journeys completos.'),
  ...cardBlock('5. Definir reglas: windowing, anti-spam, priorizaci\u00f3n', 'Control total de frecuencia, blacklists/whitelists, priorizaci\u00f3n de canales.'),
  ...cardBlock('6. Medir el funnel completo: intenci\u00f3n \u2192 venta real', 'Analytics end-to-end segmentado por canal, producto y automatizaci\u00f3n.'),
  bodyText('Tu equipo configura, ejecuta y mide. Sin intervenci\u00f3n t\u00e9cnica. Autonom\u00eda total para el \u00e1rea de CVM.'),
  separator(),

  heading2('8 Casos de Uso'),
  bulletPoint('Migraci\u00f3n de plan \u00b7 Vencimiento de datos \u00b7 Prevenci\u00f3n de churn \u00b7 Onboarding SIM/eSIM'),
  bulletPoint('Mejora NPS \u00b7 Incentivos de recarga \u00b7 Cross-sell terminal \u00b7 Retenci\u00f3n y loyalty'),
  separator(),

  heading2('Integraciones'),
  bulletPoint('HLR \u2014 Estado de SIM, tipo de terminal, zona'),
  bulletPoint('Billing \u2014 Saldo, ciclo de facturaci\u00f3n, consumo, plan activo'),
  bulletPoint('CRM \u2014 Perfil de cliente, historial, NPS, segmentos'),
  bulletPoint('SDP \u2014 Cat\u00e1logo de productos, aprovisionamiento VAS'),
  bulletPoint('LBS \u2014 Geolocalizaci\u00f3n para campa\u00f1as'),
  bulletPoint('CDRs \u2014 Registros de llamadas y datos'),
  separator(),

  heading2('Resultados CVM'),
  ...cardBlock('Operador Tier 1 \u2014 LATAM', '24MM usuarios, 98% entrega, 22% conversi\u00f3n end-to-end'),
  ...cardBlock('Operador l\u00edder \u2014 Chile', '4% CTR con AI, +67% mejora vs anterior'),
  ...cardBlock('Operador \u2014 \u00c1frica Occidental', '8.3% conversi\u00f3n con control anti-spam'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 5: VAS
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('5. VAS & MANAGED SERVICES'),
  bodyText('Ruta: /vas'),
  separator(),

  heading2('Hero'),
  tagLine('VAS & Managed Services'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Monetiz\u00e1 tu inventario con operaci\u00f3n experta y marketplace transparente', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('DYNAMO opera el negocio VAS de punta a punta. Desde la generaci\u00f3n de audiencias hasta el collection.'),
  statItem('+45MM', 'transacciones procesadas'),
  statItem('98%', 'tr\u00e1fico sin fraude'),
  statItem('7.8%', 'conversi\u00f3n promedio'),
  separator(),

  heading2('Modelo Operativo en 6 Pasos'),
  bulletPoint('01 Generaci\u00f3n de audiencias por afinidad \u2014 Cruce de datos HLR/Billing/CDRs'),
  bulletPoint('02 Marketplace transparente \u2014 CPs cargan ofertas bajo modelos CPM o CPA'),
  bulletPoint('03 Aprobaci\u00f3n del Operador \u2014 Validaci\u00f3n de servicios, precios y creatividades'),
  bulletPoint('04 Activaci\u00f3n inteligente \u2014 Campaign Manager con A/B testing'),
  bulletPoint('05 Operaci\u00f3n diaria experta \u2014 Equipo DYNAMO dedicado'),
  bulletPoint('06 Collection integrado \u2014 Wallet con m\u00faltiples medios de pago'),
  separator(),

  heading2('Para Content Providers'),
  bulletPoint('Plataforma de bidding \u2014 Compra de inventario en tiempo real'),
  bulletPoint('Templates por producto \u2014 Carga para aprobaci\u00f3n directa'),
  bulletPoint('Dashboard de ROI \u2014 Estad\u00edsticas en tiempo real'),
  bulletPoint('Wallet virtual \u2014 Gesti\u00f3n de IOs y pagos integrada'),
  bulletPoint('Modelos CPM y CPA \u2014 Flexibilidad total'),
  bodyText('Categor\u00edas: Entertainment, Gaming, Infotainment, Lifestyle, Fintech, Utilities, Sports, Education'),
  separator(),

  heading2('Para el Operador'),
  bulletPoint('Aprobaci\u00f3n de campa\u00f1as y creatividades'),
  bulletPoint('Definici\u00f3n de reglas de pricing'),
  bulletPoint('Aceptar o rechazar IOs'),
  bulletPoint('Estad\u00edsticas completas abiertas por CP, producto/servicio'),
  separator(),

  heading2('Operaci\u00f3n Hands-On'),
  bodyText('No somos un proveedor de tecnolog\u00eda m\u00e1s. Somos owners de tu operaci\u00f3n VAS.'),
  bulletPoint('Equipo dedicado \u2014 Trabajan como extensi\u00f3n de tu equipo'),
  bulletPoint('Optimizaci\u00f3n diaria \u2014 Ajuste continuo de audiencias y creatividades'),
  bulletPoint('Integraci\u00f3n MCP/SDP \u2014 Conexi\u00f3n profunda con la plataforma'),
  bulletPoint('Compliance regulatorio \u2014 Cumplimiento normativo por pa\u00eds'),
  bulletPoint('Anti-saturaci\u00f3n \u2014 Windowing, frequency capping, rotaci\u00f3n inteligente'),
  bulletPoint('Gesti\u00f3n de collection \u2014 Wallet integrada'),
  separator(),

  heading2('Resultados VAS'),
  ...cardBlock('Operador multinacional \u2014 Caribe', '7.8% conversi\u00f3n con bidding abierto'),
  ...cardBlock('Operador regional \u2014 Colombia', '98% tr\u00e1fico sin fraude, +45MM transacciones'),
  ...cardBlock('Operador \u2014 Sud\u00e1frica', 'USD 2M+ revenue anual, 6M+ usuarios activos'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 6: OTA CLOUD & SIM
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('6. OTA CLOUD & SIM CARD APPLICATION'),
  bodyText('Ruta: /ota-sim'),
  separator(),

  heading2('Hero'),
  tagLine('Tecnolog\u00eda Propietaria'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'OTA Cloud & SIM Card Application \u2014 la tecnolog\u00eda que nadie m\u00e1s tiene', bold: true, size: 26, font: 'Arial', color: DARK })] }),
  bodyText('15+ a\u00f1os de expertise en soluciones SIM card. Applet propietario capaz de ser instalado over-the-air en cualquier SIM del mundo.'),
  statItem('95%', 'compatibilidad SIM'),
  statItem('6M+', 'usuarios Cell C'),
  statItem('4', 'SIM manufacturers'),
  separator(),

  heading2('\u00bfQu\u00e9 es SAT Push?'),
  bodyText('SAT Push (SIM Application Toolkit) es una tecnolog\u00eda nativa de la SIM card que permite enviar mensajes interactivos directamente al dispositivo sin necesidad de app, datos m\u00f3viles ni smartphone.'),
  bulletPoint('Nativo de la SIM: funciona en cualquier celular, incluso b\u00e1sicos'),
  bulletPoint('No requiere app ni conexi\u00f3n a datos'),
  bulletPoint('10x conversi\u00f3n vs SMS en campa\u00f1as de DCB'),
  bulletPoint('Formatos interactivos: display, men\u00fa, get input'),
  separator(),

  heading2('Applet Propietario: ad-engine'),
  bodyText('Nuestro applet propietario se instala remotamente en cualquier SIM del mundo v\u00eda OTA.'),
  bulletPoint('Desarrollado in-house por el equipo de DYNAMO'),
  bulletPoint('Instalable over-the-air (OTA) sin intervenci\u00f3n del usuario'),
  bulletPoint('Independiente del SIM vendor: Gemalto, G&D, IDEMIA'),
  bulletPoint('Compatible con eSIM y SIM tradicionales'),
  separator(),

  heading2('OTA Cloud'),
  bodyText('Plataforma cloud para gestionar millones de SIMs de forma remota: despliegue masivo, actualizaciones y monitoreo en tiempo real.'),
  bulletPoint('Despliegue masivo \u2014 Instalaci\u00f3n en millones de SIMs simult\u00e1neamente'),
  bulletPoint('Gesti\u00f3n remota del ciclo de vida \u2014 Actualizaci\u00f3n, desactivaci\u00f3n y reinstalaci\u00f3n'),
  bulletPoint('Actualizaciones OTA \u2014 Push de nuevas versiones de forma transparente'),
  bulletPoint('Monitoreo en tiempo real \u2014 Dashboard de estado de instalaci\u00f3n'),
  bulletPoint('Multi-vendor \u2014 Compatible con Gemalto/Thales, G&D, IDEMIA y eSIM'),
  bulletPoint('Seguridad end-to-end \u2014 Encriptaci\u00f3n de canal OTA, keys del operador'),
  separator(),

  heading2('Caso: Operador \u2014 Sud\u00e1frica'),
  bodyText('De incompatibilidad a USD 2M+. C\u00f3mo DYNAMO transform\u00f3 una base de 10M de usuarios incompatibles en un canal de revenue de alta performance.'),
  bulletPoint('Desaf\u00edo: 10M de usuarios con SIMs incompatibles con SAT Push'),
  bulletPoint('Plan: Desarrollo de applet compatible con m\u00faltiples vendors de SIM + despliegue OTA por lotes'),
  bulletPoint('Soluci\u00f3n: Instalaci\u00f3n OTA masiva. A\u00f1o 1: 60% penetraci\u00f3n. Optimizaci\u00f3n hasta 80%.'),
  bulletPoint('Resultados: 6M+ usuarios activos \u00b7 USD 2M+ revenue anual \u00b7 10x superior a SMS'),
  separator(),

  heading2('Framework de Seguridad'),
  bulletPoint('Encriptaci\u00f3n end-to-end'),
  bulletPoint('Cloud del operador'),
  bulletPoint('Compliance GlobalPlatform, GSMA'),
  bulletPoint('Auditor\u00eda y trazabilidad completa'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 7: INTEGRACIONES
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('7. INTEGRACIONES'),
  bodyText('Ruta: /integraciones'),
  separator(),

  heading2('Hero'),
  tagLine('Integraciones'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Conectamos todo tu ecosistema en una sola plataforma', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('DYNAMO se integra con tu infraestructura Telco, CRMs, herramientas de negocio y todos los canales de comunicaci\u00f3n.'),
  separator(),

  heading2('Infraestructura Telco'),
  bulletPoint('HLR \u2014 Estado del suscriptor, tipo de terminal, ubicaci\u00f3n'),
  bulletPoint('Billing System \u2014 Saldo, consumo, historial de pagos, cobros DCB'),
  bulletPoint('CRM \u2014 Perfil del cliente, historial de interacciones, segmentos'),
  bulletPoint('SDP \u2014 Activaci\u00f3n/desactivaci\u00f3n de servicios, suscripciones VAS'),
  bulletPoint('SMSC \u2014 Conexi\u00f3n SMPP directa para env\u00edo masivo SMS y SAT Push'),
  bulletPoint('LBS \u2014 Ubicaci\u00f3n geogr\u00e1fica para geo-targeting'),
  bulletPoint('CDRs \u2014 Patrones de consumo, comportamiento de llamadas y datos'),
  separator(),

  heading2('12 Canales Integrados'),
  bodyText('SAT Push (Canal estrella) \u00b7 SMS \u00b7 FlashSMS \u00b7 USSD \u00b7 Email \u00b7 WhatsApp \u00b7 Instagram DM \u00b7 Facebook Messenger \u00b7 Webchat \u00b7 RCS \u00b7 SDK App Notifications \u00b7 API de Canales'),
  separator(),

  heading2('Herramientas de Negocio'),
  bulletPoint('Salesforce \u2014 Sincronizaci\u00f3n bidireccional'),
  bulletPoint('HubSpot \u2014 Integraci\u00f3n con workflows'),
  bulletPoint('Pipedrive \u2014 Conexi\u00f3n con deals'),
  bulletPoint('Google Drive \u2014 Acceso a documentos y reportes'),
  separator(),

  heading2('API-First'),
  bodyText('Si ya cont\u00e1s con una plataforma de CVM, pod\u00e9s integrar todos los canales de DYNAMO v\u00eda API.'),
  bulletPoint('API REST completa con documentaci\u00f3n Swagger'),
  bulletPoint('Webhooks para eventos en tiempo real'),
  bulletPoint('SDKs disponibles para integraci\u00f3n r\u00e1pida'),
  bulletPoint('Soporte t\u00e9cnico dedicado para onboarding'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 8: STUDIO (EMPRESAS)
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('8. DYNAMO STUDIO (EMPRESAS)'),
  bodyText('Ruta: /studio'),
  separator(),

  heading2('Hero'),
  tagLine('Para Empresas'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'La plataforma conversacional que impulsa tus ventas', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('Automatiz\u00e1 la comunicaci\u00f3n con tus clientes, gener\u00e1 leads de calidad y brind\u00e1 atenci\u00f3n 24/7 con chatbots inteligentes y campa\u00f1as omnicanal. Sin c\u00f3digo.'),
  separator(),

  heading2('4 M\u00f3dulos'),
  heading3('Chatbot Builder'),
  bodyText('Cre\u00e1 flujos de chatbot sin c\u00f3digo, con drag & drop. Dise\u00f1\u00e1 conversaciones inteligentes que resuelven consultas, capturan datos y escalan a humanos cuando es necesario.'),
  bulletPoint('Flujos sin c\u00f3digo para cualquier canal'),
  bulletPoint('Captura de datos durante la interacci\u00f3n'),
  bulletPoint('Encuestas de satisfacci\u00f3n post-atenci\u00f3n'),
  bulletPoint('Templates pre-armados por industria'),
  bulletPoint('90% de satisfacci\u00f3n promedio en implementaciones'),
  bodyText(''),

  heading3('Campaign Manager'),
  bodyText('Dise\u00f1\u00e1 campa\u00f1as personalizadas con templates multimedia y envi\u00e1 notificaciones a millones de usuarios.'),
  bulletPoint('Templates multimedia: texto, im\u00e1genes, video, botones'),
  bulletPoint('Importaci\u00f3n y validaci\u00f3n autom\u00e1tica de audiencias'),
  bulletPoint('Env\u00edo manual, programado o automatizado'),
  bulletPoint('M\u00e9tricas de entrega, apertura y conversi\u00f3n en tiempo real'),
  bodyText(''),

  heading3('Contact Center'),
  bodyText('Gesti\u00f3n centralizada de TODAS las conversaciones en una sola interfaz.'),
  bulletPoint('Unificaci\u00f3n de WhatsApp, Instagram, Facebook, Google Business, SMS, RCS, Webchat'),
  bulletPoint('Routing inteligente: conecta cada cliente con el especialista correcto'),
  bulletPoint('Historial completo de conversaciones con auditor\u00eda'),
  bodyText(''),

  heading3('Metrics'),
  bodyText('Dashboards operativos en tiempo real.'),
  bulletPoint('Estad\u00edsticas de campa\u00f1as por canal, producto y segmento'),
  bulletPoint('Evaluaci\u00f3n de performance de chatbots'),
  bulletPoint('KPIs descargables para reportes'),
  separator(),

  heading2('8 Canales Disponibles'),
  bodyText('WhatsApp \u00b7 Facebook Messenger \u00b7 Instagram DM \u00b7 Webchat \u00b7 Google Business \u00b7 SMS \u00b7 SAT Push \u00b7 RCS'),
  separator(),

  heading2('5 Industrias'),
  ...cardBlock('E-commerce', 'Automatiz\u00e1 la experiencia de compra. Recupero de carrito, recomendaciones personalizadas, notificaciones de env\u00edo. +15% m\u00e1s de ingresos.'),
  ...cardBlock('Turismo y hoteler\u00eda', 'Consultas de disponibilidad, reservas automatizadas, check-in digital, concierge virtual 24/7.'),
  ...cardBlock('Seguros', 'Consulta de p\u00f3lizas, gesti\u00f3n de siniestros, recordatorios de pago, escalaci\u00f3n a asesores.'),
  ...cardBlock('Salud', 'Agendamiento de turnos, acceso a resultados, recordatorios de citas, informaci\u00f3n de servicios.'),
  ...cardBlock('Educaci\u00f3n', 'Soporte acad\u00e9mico automatizado, tutor\u00edas personalizadas, automatizaci\u00f3n administrativa.'),
  separator(),

  heading2('Impacto'),
  statItem('90%', 'Satisfacci\u00f3n promedio con chatbots'),
  statItem('+15%', 'M\u00e1s ingresos con personalizaci\u00f3n'),
  statItem('24/7', 'Atenci\u00f3n sin intervenci\u00f3n humana'),
  statItem('+70', 'Empresas conf\u00edan en DYNAMO'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 9: SOBRE NOSOTROS
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('9. SOBRE NOSOTROS'),
  bodyText('Ruta: /sobre-nosotros'),
  separator(),

  heading2('Hero'),
  tagLine('Sobre DYNAMO'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'M\u00e1s de una d\u00e9cada transformando la comunicaci\u00f3n m\u00f3vil', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('El poder transformador de la comunicaci\u00f3n genera impacto, establece conexiones valiosas y deja una huella duradera.'),
  statItem('+100', 'clientes globales'),
  statItem('+500M', 'usuarios/mes'),
  statItem('+15', 'pa\u00edses'),
  statItem('+12', 'a\u00f1os de trayectoria'),
  separator(),

  heading2('Nuestra Historia'),
  bodyText('En 2013, Javier Badaracco y Andr\u00e9s Boffa fundaron DYNAMO con una visi\u00f3n clara: transformar la manera en que las empresas de telecomunicaciones se comunican con sus usuarios.'),
  bodyText('Lo que empez\u00f3 como una apuesta por la tecnolog\u00eda SAT Push evolucion\u00f3 hacia una plataforma completa de orquestaci\u00f3n omnicanal.'),
  bodyText('Hoy, DYNAMO Journeys es la plataforma elegida por m\u00e1s de 100 operadores en tres continentes.'),
  separator(),

  heading2('Timeline'),
  bulletPoint('2013 \u2014 Fundaci\u00f3n por Javier Badaracco y Andr\u00e9s Boffa'),
  bulletPoint('2015 \u2014 Primeros clientes en LATAM, desarrollo del applet propietario'),
  bulletPoint('2017 \u2014 L\u00edderes en SAT Push en Latinoam\u00e9rica, +70 marcas'),
  bulletPoint('2019 \u2014 Expansi\u00f3n a \u00c1frica (Ghana, Costa de Marfil, Sud\u00e1frica) y Europa'),
  bulletPoint('2022 \u2014 Nace la plataforma omnicanal (Dynamo Studio / Journeys)'),
  bulletPoint('2024 \u2014 DYNAMO Journeys: orquestaci\u00f3n omnicanal con IA'),
  bulletPoint('2025 \u2014 +100 clientes, +30 profesionales, +15 pa\u00edses'),
  separator(),

  heading2('8 Valores'),
  ...cardBlock('1. Hacer que las cosas sucedan', 'Actitud proactiva para superar desaf\u00edos y generar resultados reales.'),
  ...cardBlock('2. Jugar en equipo', 'Colaboramos con confianza y respeto, alineados hacia un objetivo com\u00fan.'),
  ...cardBlock('3. Comunicaci\u00f3n abierta', 'Transparencia, feedback honesto y conversaciones constructivas.'),
  ...cardBlock('4. Nos importa lo que hacemos', 'Atenci\u00f3n y pasi\u00f3n a cada detalle, entregando calidad en todo.'),
  ...cardBlock('5. Mentalidad de crecimiento', 'Cada desaf\u00edo es una oportunidad de aprender, adaptarnos y evolucionar.'),
  ...cardBlock('6. Innovaci\u00f3n constante', 'Redefinir l\u00edmites con tecnolog\u00edas y enfoques que impulsan nuestro impacto.'),
  ...cardBlock('7. Orientaci\u00f3n al cliente', 'El cliente en el centro de todo, anticip\u00e1ndonos a sus necesidades.'),
  ...cardBlock('8. Nos divertimos', 'La diversi\u00f3n, el humor y las buenas relaciones son esenciales para el \u00e9xito com\u00fan.'),
  separator(),

  heading2('Equipo de Liderazgo'),
  bulletPoint('Javier Badaracco \u2014 CEO & Co-founder \u2014 Visi\u00f3n estrat\u00e9gica y desarrollo de negocio global'),
  bulletPoint('Andr\u00e9s Boffa \u2014 CTO & Co-founder \u2014 Arquitectura de plataforma y liderazgo t\u00e9cnico'),
  bulletPoint('Marif\u00e9 Gayo Morano \u2014 COO \u2014 Operaciones, procesos y excelencia operativa'),
  bulletPoint('Juan Bernal \u2014 Director CALA \u2014 Expansi\u00f3n comercial LATAM'),
  bulletPoint('Carolina Sequeira \u2014 L\u00edder de Finanzas \u2014 Gesti\u00f3n financiera y control de gesti\u00f3n'),
  separator(),

  heading2('Presencia Global'),
  bodyText('LATAM: Argentina, Chile, Per\u00fa, Bolivia, Colombia, Brasil, Uruguay, Centroam\u00e9rica, Rep. Dominicana'),
  bodyText('\u00c1frica: Ghana, Costa de Marfil, Rep. del Congo, Sud\u00e1frica'),
  bodyText('Europa: Espa\u00f1a, Grecia'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 10: CASOS DE ÉXITO
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('10. CASOS DE \u00c9XITO'),
  bodyText('Ruta: /casos-de-exito'),
  separator(),

  heading2('Hero'),
  tagLine('Casos de \u00e9xito'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Resultados que hablan por s\u00ed solos', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('Descubr\u00ed c\u00f3mo operadores Telco en tres continentes usan DYNAMO para transformar sus m\u00e9tricas de negocio.'),
  separator(),

  heading2('6 Casos Anonimizados'),
  heading3('1. Operador Tier 1 \u2014 LATAM'),
  bodyText('22% conversi\u00f3n. 24MM usuarios, 98% entrega.'),
  bodyText('Desaf\u00edo: Bajas tasas de conversi\u00f3n, operaciones manuales, segmentaci\u00f3n gen\u00e9rica.'),
  bodyText('Soluci\u00f3n: Canal SAT Push con automatizaci\u00f3n AI y seguimiento en tiempo real.'),
  bodyText(''),

  heading3('2. Operador l\u00edder \u2014 Chile'),
  bodyText('4% CTR con AI, +67% mejora vs anterior.'),
  bodyText('Desaf\u00edo: CTR bajo en VAS con segmentaci\u00f3n est\u00e1tica y mensajes gen\u00e9ricos.'),
  bodyText('Soluci\u00f3n: Segmentaci\u00f3n con AI y clusters por afinidad de contenido.'),
  bodyText(''),

  heading3('3. Operador regional \u2014 Colombia'),
  bodyText('98% tr\u00e1fico sin fraude, +45MM transacciones/mes.'),
  bodyText('Desaf\u00edo: Fraude en red de afiliados sobre productos SVA.'),
  bodyText('Soluci\u00f3n: SAT Push de validaci\u00f3n de identidad integrado con Google Ads.'),
  bodyText(''),

  heading3('4. Operador multinacional \u2014 Caribe'),
  bodyText('7.8% conversi\u00f3n con CPA variable.'),
  bodyText('Desaf\u00edo: Modelo de monetizaci\u00f3n fijo que no maximizaba el revenue.'),
  bodyText('Soluci\u00f3n: Inventario al mejor postor con CPA variable.'),
  bodyText(''),

  heading3('5. Operador \u2014 \u00c1frica Occidental'),
  bodyText('8.3% CTR, 97% alcance.'),
  bodyText('Desaf\u00edo: Spam degradando el canal SAT Push.'),
  bodyText('Soluci\u00f3n: \u00cdndice de repetici\u00f3n con reglas anti-spam.'),
  bodyText(''),

  heading3('6. Operador \u2014 Sud\u00e1frica'),
  bodyText('6M+ usuarios, USD 2M+ revenue anual, 4 SIM vendors.'),
  bodyText('Desaf\u00edo: 10M de usuarios incompatibles con SAT Push.'),
  bodyText('Soluci\u00f3n: Despliegue OTA del applet en SIMs existentes. 80% penetraci\u00f3n.'),
  separator(),

  heading2('Formulario de Acceso (Gated)'),
  bodyText('Bot\u00f3n: \u201cVer caso completo\u201d \u2192 Abre modal de captura de leads.'),
  bodyText('Campos: Nombre \u00b7 Email corporativo \u00b7 Empresa \u00b7 Cargo'),
  bodyText('Respuesta: \u201cTe enviaremos el caso completo a tu email en las pr\u00f3ximas 24hs.\u201d'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 11: QUALIFY
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('11. QUALIFY \u2014 Journey de Calificaci\u00f3n'),
  bodyText('Ruta: /qualify'),
  separator(),

  heading2('Flujo de 6 Pasos'),
  heading3('Paso 0: Tipo de organizaci\u00f3n'),
  bodyText('\u00bfQu\u00e9 tipo de organizaci\u00f3n sos?'),
  bulletPoint('Operador M\u00f3vil / Telco'),
  bulletPoint('Agregador / Proveedor VAS'),
  bulletPoint('IT / Tecnolog\u00eda'),
  bulletPoint('Otro tipo de organizaci\u00f3n'),
  bodyText(''),

  heading3('Paso 1: Pa\u00eds/Regi\u00f3n'),
  bodyText('\u00bfEn qu\u00e9 pa\u00eds o regi\u00f3n oper\u00e1s?'),
  bodyText('Argentina, Chile, Colombia, Per\u00fa, M\u00e9xico, Brasil, Espa\u00f1a, Sud\u00e1frica, Centroam\u00e9rica, Rep. Dominicana, Otro pa\u00eds'),
  bodyText(''),

  heading3('Paso 2: Rol'),
  bodyText('\u00bfCu\u00e1l es tu rol en la organizaci\u00f3n?'),
  bulletPoint('C-Level / Direcci\u00f3n'),
  bulletPoint('Producto / Marketing'),
  bulletPoint('Tecnolog\u00eda / Ingenier\u00eda'),
  bulletPoint('Operaciones / Comercial'),
  bodyText(''),

  heading3('Paso 3: Desaf\u00edos (multi-select)'),
  bodyText('\u00bfQu\u00e9 desaf\u00edos quer\u00e9s resolver?'),
  bulletPoint('Reducir costos de mensajer\u00eda'),
  bulletPoint('Mejorar retenci\u00f3n de suscriptores'),
  bulletPoint('Optimizar campa\u00f1as de CVM'),
  bulletPoint('Automatizar la operaci\u00f3n'),
  bulletPoint('Mejorar segmentaci\u00f3n y personalizaci\u00f3n'),
  bulletPoint('Monetizar servicios VAS'),
  bulletPoint('Aumentar conversi\u00f3n de Adquisici\u00f3n'),
  bodyText(''),

  heading3('Paso 4: Conocimiento SAT Push'),
  bodyText('\u00bfConoc\u00e9s SAT Push como canal de comunicaci\u00f3n?'),
  bulletPoint('S\u00ed, ya lo usamos'),
  bulletPoint('S\u00ed, lo conozco pero no lo uso'),
  bulletPoint('No s\u00e9 qu\u00e9 es'),
  bodyText(''),

  heading3('Paso 5: Operadores'),
  bodyText('\u00bfCon qu\u00e9 operadores o marcas trabaj\u00e1s? (Opcional)'),
  bodyText('Claro, Telef\u00f3nica/Movistar, Tigo, Personal/Telecom, Entel, WOM, Otro'),
  separator(),

  heading2('P\u00e1gina de Resultados'),
  bodyText('T\u00edtulo: \u201cTu soluci\u00f3n recomendada\u201d'),
  bodyText('Bas\u00e1ndonos en tus respuestas, estas son las soluciones que mejor se adaptan a tu operaci\u00f3n.'),
  bulletPoint('Recomendaci\u00f3n CVM \u2192 DYNAMO Journeys \u2014 CVM / CORE'),
  bulletPoint('Recomendaci\u00f3n VAS \u2192 DYNAMO Journeys \u2014 VAS'),
  bulletPoint('Recomendaci\u00f3n IT \u2192 DYNAMO para empresas de tecnolog\u00eda'),
  bulletPoint('Default \u2192 Hablemos sobre tu caso'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 12: CONTACTO
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('12. CONTACTO'),
  bodyText('Ruta: /contacto'),
  separator(),

  heading2('Formulario'),
  bodyText('T\u00edtulo: Solicita una demo'),
  bodyText('Campos: Nombre completo* \u00b7 Email corporativo* \u00b7 Empresa/Operador* \u00b7 \u00c1rea/Rol* \u00b7 Mensaje (opcional)'),
  bodyText('Opciones de \u00c1rea: CVM/Lifecycle \u00b7 VAS/Content \u00b7 IT/Sistemas \u00b7 Marketing \u00b7 C-Level/Direcci\u00f3n \u00b7 Otro'),
  bodyText('Bot\u00f3n: \u201cEnviar solicitud\u201d'),
  bodyText('\u00c9xito: \u201cRecibimos tu mensaje. Nos pondremos en contacto en menos de 24 horas h\u00e1biles.\u201d'),
  separator(),

  heading2('Informaci\u00f3n de Contacto'),
  bulletPoint('WhatsApp: +54 9 11 2330-6752'),
  bulletPoint('Email: hello@dynamo.tech'),
  bulletPoint('Web: dynamo.tech'),
  bulletPoint('Oficina: Francisco N. de Laprida 771, 7mo piso, B1638 Florida, Buenos Aires, Argentina'),
  bulletPoint('LinkedIn: dynamo-tech \u00b7 Instagram: @dynamo.tech'),
  bodyText(''),
  bodyText('Presencia en 3 continentes: LATAM (9 pa\u00edses) \u00b7 \u00c1frica (4 pa\u00edses) \u00b7 Europa (2 pa\u00edses)'),
  bodyText('Prueba gratuita por 30 d\u00edas. Sin compromiso, sin tarjeta de cr\u00e9dito.'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 13: BLOG
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('13. BLOG'),
  bodyText('Ruta: /blog'),
  separator(),

  heading2('Hero'),
  tagLine('Blog'),
  new Paragraph({ spacing: { after: 200 }, children: [new TextRun({ text: 'Insights y tendencias para la industria Telco', bold: true, size: 28, font: 'Arial', color: DARK })] }),
  bodyText('Art\u00edculos, an\u00e1lisis y casos de uso sobre orquestaci\u00f3n omnicanal, SAT Push, inteligencia artificial, segmentaci\u00f3n de audiencias y estrategias de monetizaci\u00f3n para operadores m\u00f3viles.'),
  bodyText('Categor\u00edas: Todos \u00b7 Omnichannel \u00b7 SAT Push \u00b7 AI & Data \u00b7 Channels \u00b7 Security \u00b7 Industry \u00b7 VAS \u00b7 Product'),
  separator(),

  heading2('Art\u00edculos (21 posts)'),
  ...([
    ['Orquestaci\u00f3n omnicanal: c\u00f3mo las Telcos l\u00edderes est\u00e1n multiplicando sus conversiones en 2026', 'Omnichannel', '9 min'],
    ['5 KPIs cr\u00edticos para medir el rendimiento de tus campa\u00f1as multicanal', 'AI & Data', '8 min'],
    ['Customer Journey Mapping para Telcos: de la teor\u00eda a la automatizaci\u00f3n', 'Omnichannel', '10 min'],
    ['SAT Push: el canal que las Telcos est\u00e1n redescubriendo en 2026', 'SAT Push', '8 min'],
    ['C\u00f3mo Cell C Sud\u00e1frica gener\u00f3 2M en ingresos con OTA y SAT Push', 'SAT Push', '7 min'],
    ['OTA Cloud: la tecnolog\u00eda que permite activar SAT Push en cualquier SIM del mundo', 'SAT Push', '8 min'],
    ['Segmentaci\u00f3n AI para Telcos: clusters inteligentes que predicen comportamiento', 'AI & Data', '9 min'],
    ['Machine Learning aplicado a campa\u00f1as m\u00f3viles: del manual al scoring predictivo', 'AI & Data', '8 min'],
    ['WhatsApp Business API para Telcos: gu\u00eda completa 2026', 'Channels', '10 min'],
    ['RCS: el canal que est\u00e1 transformando la comunicaci\u00f3n Telco-usuario', 'Channels', '7 min'],
    ['SMS seguro: buenas pr\u00e1cticas para proteger del fraude', 'Security', '7 min'],
    ['MWC Barcelona 2026: las 5 tendencias que definir\u00e1n las Telcos', 'Industry', '8 min'],
    ['Telemedia Barcelona 2026: el futuro del VAS', 'Industry', '7 min'],
  ].flatMap(([ title, cat, time ]) => [
    new Paragraph({
      spacing: { before: 100, after: 40 },
      children: [
        new TextRun({ text: title, bold: true, size: 20, font: 'Arial', color: DARK }),
        new TextRun({ text: ` \u2014 ${cat} \u2014 ${time}`, size: 18, font: 'Arial', color: GRAY }),
      ]
    })
  ])),
  bodyText('(+ 8 art\u00edculos adicionales sobre churn, GDPR, 5G, monetizaci\u00f3n VAS, trigger-based marketing, ROI calculator, NPS, y objeciones SAT Push)'),
  pageBreak()
);


// ═══════════════════════════════════════════════════════════════
// PAGE 14: ONE-PAGERS
// ═══════════════════════════════════════════════════════════════
children.push(
  heading1('14. ONE-PAGERS (Res\u00famenes Ejecutivos)'),
  bodyText('3 documentos gated con captura de email'),
  separator(),

  heading2('One-Pager CVM & CORE'),
  bodyText('Ruta: /one-pager-cvm'),
  bodyText('Gate: \u201cIngres\u00e1 tu email para acceder al resumen ejecutivo de DYNAMO Journeys para CVM.\u201d'),
  bodyText('Contenido: 6 capacidades clave \u00b7 8+ canales integrados \u00b7 Resultados reales (22%, 4%, 8.3%) \u00b7 DYNAMO en n\u00fameros (+500M usuarios, +20 Telcos, 8+ canales, 15+ a\u00f1os)'),
  separator(),

  heading2('One-Pager VAS & Managed Services'),
  bodyText('Ruta: /one-pager-vas'),
  bodyText('Gate: \u201cIngres\u00e1 tu email para acceder al resumen ejecutivo de DYNAMO para VAS.\u201d'),
  bodyText('Contenido: Modelo operativo en 6 pasos \u00b7 Para CPs y para el Operador \u00b7 Resultados (7.8%, 98%, USD 2M+)'),
  separator(),

  heading2('One-Pager DYNAMO Studio (Empresas)'),
  bodyText('Ruta: /one-pager-smb'),
  bodyText('Gate: \u201cIngres\u00e1 tu email para acceder al resumen ejecutivo de DYNAMO Studio para Empresas.\u201d'),
  bodyText('Contenido: 4 m\u00f3dulos \u00b7 8 canales \u00b7 5 industrias \u00b7 DYNAMO Studio en n\u00fameros (90%, +70, 8, 24/7)'),
  separator(),
  separator(),

  // Footer note
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { before: 400 },
    children: [new TextRun({ text: '\u2014 Fin del documento \u2014', size: 20, font: 'Arial', color: GRAY })]
  }),
  new Paragraph({
    alignment: AlignmentType.CENTER,
    spacing: { after: 200 },
    children: [new TextRun({ text: 'dynamo.tech \u00b7 hello@dynamo.tech \u00b7 +54 9 11 2330-6752', size: 18, font: 'Arial', color: PURPLE })]
  }),
);

// ═══════════════════════════════════════════════════════════════
// CREATE DOCUMENT
// ═══════════════════════════════════════════════════════════════

const doc = new Document({
  numbering: {
    config: [
      {
        reference: 'bullets',
        levels: [{
          level: 0,
          format: LevelFormat.BULLET,
          text: '\u2022',
          alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } }
        }]
      }
    ]
  },
  styles: {
    default: {
      document: { run: { font: 'Arial', size: 20 } }
    },
    paragraphStyles: [
      {
        id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 36, bold: true, font: 'Arial', color: PURPLE },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, font: 'Arial', color: DARK },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      },
      {
        id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: 'Arial', color: PURPLE },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 }
      }
    ]
  },
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
      }
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: 'DYNAMO \u2014 Website Content Document', size: 16, font: 'Arial', color: GRAY })]
        })]
      })
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: 'DYNAMO \u00b7 dynamo.tech \u00b7 P\u00e1gina ', size: 14, font: 'Arial', color: GRAY }),
            new TextRun({ children: [PageNumber.CURRENT], size: 14, font: 'Arial', color: GRAY })
          ]
        })]
      })
    },
    children
  }]
});

// Generate
const outputPath = path.join(__dirname, '..', 'DYNAMO_Website_Content_Complete.docx');
Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync(outputPath, buffer);
  console.log(`\u2705 Document generated: ${outputPath}`);
  console.log(`   Size: ${(buffer.length / 1024).toFixed(0)} KB`);
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
