import type { Metadata } from "next";
import Link from "next/link";
import { getLocale } from "next-intl/server";
import { getAlternates } from "@/lib/seo";
import { Shield, ArrowLeft } from "lucide-react";

/* ─── i18n ─── */
const texts: Record<string, {
  metaTitle: string; metaDesc: string;
  title: string; subtitle: string; lastUpdate: string;
  backToLegal: string; contactCta: string;
  sections: { title: string; content: string[] }[];
}> = {
  es: {
    metaTitle: "Política de Privacidad — DYNAMO",
    metaDesc: "Política de privacidad de DYNAMO y DynamoStudio. Información sobre recopilación, uso y protección de datos personales conforme a GDPR, LGPD y legislación argentina.",
    title: "Política de Privacidad",
    subtitle: "Esta política describe cómo DYNAMO y sus productos (incluyendo DynamoStudio) recopilan, usan y protegen los datos personales de los usuarios.",
    lastUpdate: "Última actualización: 1 de abril de 2026",
    backToLegal: "Volver a Legal",
    contactCta: "Para consultas sobre privacidad: privacy@dynamo.tech",
    sections: [
      {
        title: "1. Responsable del tratamiento",
        content: [
          "El responsable del tratamiento de los datos personales recopilados a través de este sitio web, la plataforma DynamoStudio y demás productos de DYNAMO es DYNAMO, con domicilio en Francisco N. de Laprida 771, 7mo piso, B1638 Florida, Buenos Aires, Argentina.",
          "Para consultas sobre privacidad y protección de datos puede contactarnos en privacy@dynamo.tech.",
        ],
      },
      {
        title: "2. Datos que recopilamos",
        content: [
          "Datos de navegación: dirección IP, tipo de navegador y dispositivo, sistema operativo, páginas visitadas, duración de la visita, fuente de tráfico y datos anonimizados de interacción mediante cookies y tecnologías similares.",
          "Datos de formulario de contacto: nombre, dirección de correo electrónico, empresa, rol o cargo, país y el contenido del mensaje enviado a través de nuestro formulario.",
          "Datos de WhatsApp: si el usuario nos contacta a través de WhatsApp, recopilaremos el número de teléfono y el contenido de la conversación en la medida necesaria para responder la consulta.",
          "Datos de aplicaciones (DynamoStudio): cuando el usuario utiliza DynamoStudio u otras aplicaciones conectadas a plataformas de terceros (como Meta/Facebook, WhatsApp Business API), podemos recopilar datos necesarios para el funcionamiento del servicio según los permisos otorgados.",
        ],
      },
      {
        title: "3. Finalidad del tratamiento",
        content: [
          "Los datos personales recopilados se utilizan exclusivamente para:",
          "• Responder consultas comerciales y solicitudes de información recibidas a través del formulario de contacto o WhatsApp.",
          "• Mejorar la experiencia de navegación y el rendimiento del sitio web mediante análisis estadístico anonimizado.",
          "• Enviar información comercial sobre nuestros servicios, únicamente cuando el usuario haya prestado su consentimiento expreso.",
          "• Prestar los servicios contratados a través de DynamoStudio y demás productos de DYNAMO.",
          "• Realizar análisis de tráfico web para optimizar contenidos.",
        ],
      },
      {
        title: "4. Base legal del tratamiento",
        content: [
          "Consentimiento: para el uso de cookies no esenciales y el envío de comunicaciones comerciales.",
          "Interés legítimo: para el análisis de tráfico web y la mejora continua del sitio.",
          "Ejecución precontractual: para gestionar y responder las consultas recibidas.",
          "Ejecución contractual: para la prestación de los servicios contratados a través de DynamoStudio y demás productos.",
        ],
      },
      {
        title: "5. Cookies",
        content: [
          "Este sitio web utiliza las siguientes categorías de cookies:",
          "• Cookies esenciales: necesarias para el funcionamiento básico del sitio, incluyendo la preferencia de idioma.",
          "• Cookies de consentimiento: almacenan la elección del usuario respecto a la aceptación o rechazo de cookies.",
          "• Cookies analíticas (Google Analytics 4): información anonimizada sobre el uso del sitio web.",
          "• Cookies funcionales: mejoran la experiencia del usuario recordando preferencias de navegación.",
          "El usuario puede gestionar sus preferencias de cookies en cualquier momento a través del banner de consentimiento o la configuración de su navegador.",
        ],
      },
      {
        title: "6. Compartición con terceros",
        content: [
          "DYNAMO no vende, alquila ni comercializa datos personales de los usuarios a terceros bajo ninguna circunstancia.",
          "Los datos podrán ser compartidos únicamente con los siguientes proveedores de servicios, en la medida necesaria para el funcionamiento:",
          "• Google Analytics (Google LLC): análisis estadístico del tráfico web.",
          "• Vercel Inc.: hosting e infraestructura del sitio web.",
          "• Meta Platforms Inc.: en el marco de la integración de DynamoStudio con la plataforma Meta for Developers (WhatsApp Business API, Facebook).",
          "Estos proveedores actúan como encargados del tratamiento y están obligados contractualmente a tratar los datos conforme a esta política.",
        ],
      },
      {
        title: "7. Transferencias internacionales",
        content: [
          "Los datos personales pueden ser transferidos y almacenados en servidores ubicados en Estados Unidos (Vercel, Meta) y en Argentina. Estas transferencias se realizan con medidas de protección adecuadas, incluyendo cláusulas contractuales estándar y el cumplimiento de las regulaciones aplicables.",
        ],
      },
      {
        title: "8. Seguridad de los datos",
        content: [
          "DYNAMO implementa medidas técnicas y organizativas apropiadas para proteger los datos personales:",
          "• Encriptación de datos en tránsito mediante TLS.",
          "• Encriptación de datos en reposo.",
          "• Acceso restringido exclusivamente a personal autorizado.",
          "• Medidas de seguridad alineadas con estándares de la industria.",
        ],
      },
      {
        title: "9. Plazos de retención",
        content: [
          "• Datos de formulario de contacto: dos (2) años desde la última interacción.",
          "• Cookies: entre la duración de la sesión y un máximo de trece (13) meses para cookies analíticas.",
          "• Registros de servidor: noventa (90) días.",
        ],
      },
      {
        title: "10. Derechos del titular",
        content: [
          "De conformidad con la legislación aplicable, el usuario tiene derecho a:",
          "• Acceso: solicitar confirmación sobre si sus datos están siendo tratados y obtener una copia.",
          "• Rectificación: solicitar la corrección de datos inexactos o incompletos.",
          "• Supresión: solicitar la eliminación de sus datos personales.",
          "• Oposición: oponerse al tratamiento de sus datos en determinadas circunstancias.",
          "• Portabilidad: solicitar la entrega de sus datos en un formato estructurado y de uso común.",
          "Para ejercer estos derechos, envíe su solicitud a privacy@dynamo.tech indicando su nombre completo y el derecho que desea ejercer. DYNAMO responderá en un plazo máximo de treinta (30) días hábiles.",
        ],
      },
      {
        title: "11. Legislación aplicable",
        content: [
          "Argentina: Ley 25.326 de Protección de Datos Personales y normas reglamentarias (AAIP).",
          "Unión Europea: Reglamento General de Protección de Datos (RGPD/GDPR - Reglamento UE 2016/679).",
          "Brasil: Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).",
        ],
      },
      {
        title: "12. Productos y aplicaciones de DYNAMO",
        content: [
          "Esta política de privacidad aplica a todos los productos y servicios de DYNAMO, incluyendo pero no limitado a:",
          "• DynamoStudio (ID de aplicación: 2538317079678816): plataforma conversacional para empresas integrada con Meta/WhatsApp Business API.",
          "• DYNAMO Journeys: plataforma de orquestación omnicanal para operadores de telecomunicaciones.",
          "• Cualquier otro producto o servicio operado por Dynamo Mobile (ID de empresa: 1206642973233071).",
          "El uso de cualquiera de estos productos implica la aceptación de esta política de privacidad.",
        ],
      },
      {
        title: "13. Actualizaciones de esta política",
        content: [
          "DYNAMO se reserva el derecho de modificar esta política de privacidad en cualquier momento. Las modificaciones serán publicadas en esta página con indicación de la fecha de última actualización.",
        ],
      },
    ],
  },
  en: {
    metaTitle: "Privacy Policy — DYNAMO",
    metaDesc: "DYNAMO and DynamoStudio privacy policy. Information about the collection, use, and protection of personal data in compliance with GDPR, LGPD, and Argentine law.",
    title: "Privacy Policy",
    subtitle: "This policy describes how DYNAMO and its products (including DynamoStudio) collect, use, and protect users' personal data.",
    lastUpdate: "Last updated: April 1, 2026",
    backToLegal: "Back to Legal",
    contactCta: "For privacy inquiries: privacy@dynamo.tech",
    sections: [
      {
        title: "1. Data controller",
        content: [
          "The data controller for personal data collected through this website, the DynamoStudio platform, and other DYNAMO products is DYNAMO, with registered address at Francisco N. de Laprida 771, 7th floor, B1638 Florida, Buenos Aires, Argentina.",
          "For privacy and data protection inquiries, you can contact us at privacy@dynamo.tech.",
        ],
      },
      {
        title: "2. Data we collect",
        content: [
          "Browsing data: IP address, browser and device type, operating system, pages visited, visit duration, traffic source, and anonymized interaction data through cookies and similar technologies.",
          "Contact form data: name, email address, company, role or position, country, and the content of the message sent through our form.",
          "WhatsApp data: if the user contacts us through WhatsApp, we will collect the phone number and conversation content as necessary to respond to the inquiry.",
          "Application data (DynamoStudio): when the user uses DynamoStudio or other applications connected to third-party platforms (such as Meta/Facebook, WhatsApp Business API), we may collect data necessary for service operation according to the permissions granted.",
        ],
      },
      {
        title: "3. Purpose of processing",
        content: [
          "Personal data collected is used exclusively for:",
          "• Responding to commercial inquiries and information requests received through the contact form or WhatsApp.",
          "• Improving browsing experience and website performance through anonymized statistical analysis.",
          "• Sending commercial information about our services, only when the user has given express consent.",
          "• Providing services contracted through DynamoStudio and other DYNAMO products.",
          "• Conducting web traffic analysis to optimize content.",
        ],
      },
      {
        title: "4. Legal basis for processing",
        content: [
          "Consent: for the use of non-essential cookies and sending commercial communications.",
          "Legitimate interest: for web traffic analysis and continuous site improvement.",
          "Pre-contractual execution: for managing and responding to inquiries received.",
          "Contractual execution: for providing services contracted through DynamoStudio and other products.",
        ],
      },
      {
        title: "5. Cookies",
        content: [
          "This website uses the following categories of cookies:",
          "• Essential cookies: necessary for basic site operation, including language preference.",
          "• Consent cookies: store the user's choice regarding cookie acceptance or rejection.",
          "• Analytics cookies (Google Analytics 4): anonymized information about website usage.",
          "• Functional cookies: improve user experience by remembering browsing preferences.",
          "Users can manage their cookie preferences at any time through the consent banner or browser settings.",
        ],
      },
      {
        title: "6. Sharing with third parties",
        content: [
          "DYNAMO does not sell, rent, or commercialize users' personal data to third parties under any circumstances.",
          "Data may only be shared with the following service providers, to the extent necessary for operation:",
          "• Google Analytics (Google LLC): statistical analysis of web traffic.",
          "• Vercel Inc.: website hosting and infrastructure.",
          "• Meta Platforms Inc.: as part of DynamoStudio's integration with the Meta for Developers platform (WhatsApp Business API, Facebook).",
          "These providers act as data processors and are contractually bound to process data in accordance with this policy.",
        ],
      },
      {
        title: "7. International transfers",
        content: [
          "Personal data may be transferred and stored on servers located in the United States (Vercel, Meta) and Argentina. These transfers are carried out with adequate protection measures, including standard contractual clauses and compliance with applicable regulations.",
        ],
      },
      {
        title: "8. Data security",
        content: [
          "DYNAMO implements appropriate technical and organizational measures to protect personal data:",
          "• Data encryption in transit via TLS.",
          "• Data encryption at rest.",
          "• Access restricted exclusively to authorized personnel.",
          "• Security measures aligned with industry standards.",
        ],
      },
      {
        title: "9. Retention periods",
        content: [
          "• Contact form data: two (2) years from the last interaction.",
          "• Cookies: between session duration and a maximum of thirteen (13) months for analytics cookies.",
          "• Server logs: ninety (90) days.",
        ],
      },
      {
        title: "10. Data subject rights",
        content: [
          "In accordance with applicable legislation, users have the right to:",
          "• Access: request confirmation of whether their data is being processed and obtain a copy.",
          "• Rectification: request correction of inaccurate or incomplete data.",
          "• Erasure: request deletion of their personal data.",
          "• Objection: object to the processing of their data in certain circumstances.",
          "• Portability: request delivery of their data in a structured and commonly used format.",
          "To exercise these rights, send your request to privacy@dynamo.tech indicating your full name and the right you wish to exercise. DYNAMO will respond within a maximum of thirty (30) business days.",
        ],
      },
      {
        title: "11. Applicable legislation",
        content: [
          "Argentina: Personal Data Protection Act 25.326 and its regulations (AAIP).",
          "European Union: General Data Protection Regulation (GDPR - Regulation EU 2016/679).",
          "Brazil: Lei Geral de Proteção de Dados (LGPD - Lei 13.709/2018).",
        ],
      },
      {
        title: "12. DYNAMO products and applications",
        content: [
          "This privacy policy applies to all DYNAMO products and services, including but not limited to:",
          "• DynamoStudio (Application ID: 2538317079678816): conversational platform for businesses integrated with Meta/WhatsApp Business API.",
          "• DYNAMO Journeys: omnichannel orchestration platform for telecommunications operators.",
          "• Any other product or service operated by Dynamo Mobile (Business ID: 1206642973233071).",
          "Use of any of these products implies acceptance of this privacy policy.",
        ],
      },
      {
        title: "13. Updates to this policy",
        content: [
          "DYNAMO reserves the right to modify this privacy policy at any time. Modifications will be published on this page with an indication of the last update date.",
        ],
      },
    ],
  },
  fr: {
    metaTitle: "Politique de Confidentialité — DYNAMO",
    metaDesc: "Politique de confidentialité de DYNAMO et DynamoStudio. Informations sur la collecte, l'utilisation et la protection des données personnelles conformément au RGPD.",
    title: "Politique de Confidentialité",
    subtitle: "Cette politique décrit comment DYNAMO et ses produits (y compris DynamoStudio) collectent, utilisent et protègent les données personnelles des utilisateurs.",
    lastUpdate: "Dernière mise à jour : 1er avril 2026",
    backToLegal: "Retour aux mentions légales",
    contactCta: "Pour les questions de confidentialité : privacy@dynamo.tech",
    sections: [
      { title: "1. Responsable du traitement", content: ["Le responsable du traitement des données personnelles collectées via ce site web, la plateforme DynamoStudio et les autres produits DYNAMO est DYNAMO, dont le siège est situé au Francisco N. de Laprida 771, 7ème étage, B1638 Florida, Buenos Aires, Argentine.", "Pour toute question relative à la confidentialité et à la protection des données, vous pouvez nous contacter à privacy@dynamo.tech."] },
      { title: "2. Données collectées", content: ["Données de navigation : adresse IP, type de navigateur et d'appareil, système d'exploitation, pages visitées, durée de visite, source du trafic et données d'interaction anonymisées.", "Données du formulaire de contact : nom, adresse e-mail, entreprise, poste, pays et contenu du message.", "Données WhatsApp : si l'utilisateur nous contacte via WhatsApp, nous collecterons le numéro de téléphone et le contenu de la conversation.", "Données d'applications (DynamoStudio) : lorsque l'utilisateur utilise DynamoStudio ou d'autres applications connectées à des plateformes tierces (Meta/Facebook, WhatsApp Business API), nous pouvons collecter les données nécessaires au fonctionnement du service."] },
      { title: "3. Finalité du traitement", content: ["Les données personnelles sont utilisées exclusivement pour :", "• Répondre aux demandes commerciales et aux demandes d'information.", "• Améliorer l'expérience de navigation et les performances du site.", "• Envoyer des informations commerciales, uniquement avec le consentement de l'utilisateur.", "• Fournir les services contractés via DynamoStudio et autres produits DYNAMO.", "• Réaliser des analyses de trafic web pour optimiser les contenus."] },
      { title: "4. Base légale du traitement", content: ["Consentement : pour les cookies non essentiels et les communications commerciales.", "Intérêt légitime : pour l'analyse du trafic web et l'amélioration du site.", "Exécution précontractuelle : pour la gestion des demandes reçues.", "Exécution contractuelle : pour la prestation des services via DynamoStudio."] },
      { title: "5. Cookies", content: ["Ce site utilise les catégories de cookies suivantes :", "• Cookies essentiels : nécessaires au fonctionnement de base du site.", "• Cookies de consentement : stockent le choix de l'utilisateur.", "• Cookies analytiques (Google Analytics 4) : informations anonymisées sur l'utilisation du site.", "• Cookies fonctionnels : améliorent l'expérience en mémorisant les préférences.", "L'utilisateur peut gérer ses préférences de cookies à tout moment."] },
      { title: "6. Partage avec des tiers", content: ["DYNAMO ne vend, ne loue ni ne commercialise les données personnelles des utilisateurs.", "Les données ne peuvent être partagées qu'avec : Google Analytics (Google LLC), Vercel Inc. (hébergement), Meta Platforms Inc. (intégration DynamoStudio).", "Ces prestataires sont contractuellement tenus de traiter les données conformément à cette politique."] },
      { title: "7. Transferts internationaux", content: ["Les données peuvent être transférées vers des serveurs aux États-Unis (Vercel, Meta) et en Argentine, avec des mesures de protection adéquates."] },
      { title: "8. Sécurité des données", content: ["DYNAMO met en œuvre des mesures techniques et organisationnelles : chiffrement en transit (TLS), chiffrement au repos, accès restreint au personnel autorisé, mesures de sécurité conformes aux standards de l'industrie."] },
      { title: "9. Durées de conservation", content: ["• Données de formulaire : deux (2) ans depuis la dernière interaction.", "• Cookies : entre la durée de session et treize (13) mois maximum.", "• Journaux serveur : quatre-vingt-dix (90) jours."] },
      { title: "10. Droits des personnes concernées", content: ["Conformément à la législation applicable : droit d'accès, de rectification, de suppression, d'opposition et de portabilité.", "Pour exercer vos droits : privacy@dynamo.tech. Réponse sous trente (30) jours ouvrables."] },
      { title: "11. Législation applicable", content: ["Argentine : Loi 25.326. Union Européenne : RGPD (Règlement UE 2016/679). Brésil : LGPD (Lei 13.709/2018)."] },
      { title: "12. Produits et applications DYNAMO", content: ["Cette politique s'applique à tous les produits DYNAMO :", "• DynamoStudio (ID application : 2538317079678816)", "• DYNAMO Journeys", "• Tout autre produit de Dynamo Mobile (ID entreprise : 1206642973233071)."] },
      { title: "13. Mises à jour", content: ["DYNAMO se réserve le droit de modifier cette politique à tout moment. Les modifications seront publiées sur cette page."] },
    ],
  },
  pt: {
    metaTitle: "Política de Privacidade — DYNAMO",
    metaDesc: "Política de privacidade da DYNAMO e DynamoStudio. Informações sobre coleta, uso e proteção de dados pessoais conforme GDPR, LGPD e legislação argentina.",
    title: "Política de Privacidade",
    subtitle: "Esta política descreve como a DYNAMO e seus produtos (incluindo DynamoStudio) coletam, usam e protegem os dados pessoais dos usuários.",
    lastUpdate: "Última atualização: 1 de abril de 2026",
    backToLegal: "Voltar para Legal",
    contactCta: "Para consultas sobre privacidade: privacy@dynamo.tech",
    sections: [
      { title: "1. Responsável pelo tratamento", content: ["O responsável pelo tratamento dos dados pessoais coletados através deste site, da plataforma DynamoStudio e demais produtos DYNAMO é a DYNAMO, com sede em Francisco N. de Laprida 771, 7º andar, B1638 Florida, Buenos Aires, Argentina.", "Para consultas sobre privacidade e proteção de dados: privacy@dynamo.tech."] },
      { title: "2. Dados que coletamos", content: ["Dados de navegação: endereço IP, tipo de navegador e dispositivo, sistema operacional, páginas visitadas, duração da visita, fonte de tráfego e dados anonimizados de interação.", "Dados do formulário de contato: nome, endereço de e-mail, empresa, cargo, país e conteúdo da mensagem.", "Dados do WhatsApp: se o usuário nos contatar pelo WhatsApp, coletaremos o número de telefone e o conteúdo da conversa.", "Dados de aplicativos (DynamoStudio): quando o usuário utiliza DynamoStudio ou outros aplicativos conectados a plataformas de terceiros (Meta/Facebook, WhatsApp Business API), podemos coletar dados necessários para o funcionamento do serviço."] },
      { title: "3. Finalidade do tratamento", content: ["Os dados pessoais são utilizados exclusivamente para:", "• Responder consultas comerciais e solicitações de informação.", "• Melhorar a experiência de navegação e o desempenho do site.", "• Enviar informações comerciais, apenas com consentimento expresso.", "• Prestar os serviços contratados através do DynamoStudio e outros produtos.", "• Realizar análises de tráfego web para otimizar conteúdos."] },
      { title: "4. Base legal do tratamento", content: ["Consentimento: para cookies não essenciais e comunicações comerciais.", "Interesse legítimo: para análise de tráfego e melhoria do site.", "Execução pré-contratual: para gestão de consultas recebidas.", "Execução contratual: para prestação de serviços via DynamoStudio."] },
      { title: "5. Cookies", content: ["Este site utiliza: cookies essenciais, cookies de consentimento, cookies analíticos (Google Analytics 4) e cookies funcionais.", "O usuário pode gerenciar suas preferências a qualquer momento."] },
      { title: "6. Compartilhamento com terceiros", content: ["A DYNAMO não vende, aluga nem comercializa dados pessoais.", "Dados podem ser compartilhados com: Google Analytics (Google LLC), Vercel Inc. (hospedagem), Meta Platforms Inc. (integração DynamoStudio).", "Estes provedores estão contratualmente obrigados a tratar os dados conforme esta política."] },
      { title: "7. Transferências internacionais", content: ["Os dados podem ser transferidos para servidores nos Estados Unidos (Vercel, Meta) e Argentina, com medidas de proteção adequadas."] },
      { title: "8. Segurança dos dados", content: ["A DYNAMO implementa medidas técnicas e organizacionais: criptografia em trânsito (TLS), criptografia em repouso, acesso restrito a pessoal autorizado, medidas de segurança alinhadas com padrões da indústria."] },
      { title: "9. Prazos de retenção", content: ["• Dados de formulário: dois (2) anos desde a última interação.", "• Cookies: entre a duração da sessão e treze (13) meses máximo.", "• Logs do servidor: noventa (90) dias."] },
      { title: "10. Direitos do titular", content: ["Conforme legislação aplicável: direito de acesso, retificação, eliminação, oposição e portabilidade.", "Para exercer seus direitos: privacy@dynamo.tech. Resposta em até trinta (30) dias úteis."] },
      { title: "11. Legislação aplicável", content: ["Argentina: Lei 25.326. União Europeia: RGPD (Regulamento UE 2016/679). Brasil: LGPD (Lei 13.709/2018)."] },
      { title: "12. Produtos e aplicativos DYNAMO", content: ["Esta política se aplica a todos os produtos DYNAMO:", "• DynamoStudio (ID do aplicativo: 2538317079678816)", "• DYNAMO Journeys", "• Qualquer outro produto da Dynamo Mobile (ID da empresa: 1206642973233071)."] },
      { title: "13. Atualizações desta política", content: ["A DYNAMO reserva-se o direito de modificar esta política a qualquer momento. As modificações serão publicadas nesta página."] },
    ],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = texts[locale] || texts.es;
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: getAlternates("/privacy-policy"),
    openGraph: { title: t.metaTitle, description: t.metaDesc },
  };
}

export default async function PrivacyPolicyPage() {
  const locale = await getLocale();
  const t = texts[locale] || texts.es;

  return (
    <div className="min-h-screen bg-deep">
      {/* Hero */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-purple-300">Privacy Policy</span>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t.title}
          </h1>
          <p className="mt-4 text-lg text-white/60 leading-relaxed max-w-3xl">
            {t.subtitle}
          </p>
          <p className="mt-3 text-sm text-white/40">{t.lastUpdate}</p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-12">
            {t.sections.map((section) => (
              <div key={section.title} className="scroll-mt-24">
                <h2 className="font-heading text-xl md:text-2xl font-bold text-white mb-4">
                  {section.title}
                </h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, i) => (
                    <p key={i} className="text-white/70 leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 p-6 rounded-xl border border-purple-500/20 bg-purple-500/5 text-center">
            <p className="text-white/70">{t.contactCta}</p>
          </div>

          {/* Back link */}
          <div className="mt-8">
            <Link
              href={`/${locale}/legal`}
              className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToLegal}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
