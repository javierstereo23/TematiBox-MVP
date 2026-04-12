import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import Link from "next/link";
import { ArrowRight, Shield, FileText, Scale } from "lucide-react";
import { getLocale } from "next-intl/server";
import RevealOnScroll from "@/components/RevealOnScroll";

/* ─── i18n texts ─── */
const texts = {
  es: {
    metaLegalTitle: "Legal y Privacidad — DYNAMO",
    metaDesc: "Politica de privacidad, terminos de servicio y compliance de DYNAMO. Informacion legal sobre el uso del sitio web y la plataforma DYNAMO Journeys.",
    heroDesc: "Informacion legal sobre el uso del sitio web de DYNAMO, nuestras politicas de privacidad, terminos de servicio y marco de compliance aplicable a nuestras operaciones globales.",
    tocPrivacy: "Politica de Privacidad",
    tocTerms: "Terminos de Servicio",
    tocCompliance: "Compliance",
    lastUpdate: "Ultima actualizacion",
    lastUpdateDate: "Abril 2026",
    lastUpdateFull: "Ultima actualizacion: 1 de abril de 2026",
    ctaTitle: "Preguntas sobre nuestras politicas?",
    ctaDesc: "Nuestro equipo legal esta disponible para responder cualquier consulta sobre privacidad, terminos de servicio o compliance.",
    ctaButton: "Contactar al equipo legal",
    // Privacy Policy clauses
    p1Title: "Responsable del tratamiento",
    p1Body: "El responsable del tratamiento de los datos personales recopilados a traves de este sitio web es DYNAMO, con domicilio en Francisco N. de Laprida 771, 7mo piso, B1638 Florida, Buenos Aires, Argentina. Para consultas sobre privacidad y proteccion de datos puede contactarnos en",
    p2Title: "Datos que recopilamos",
    p2Intro: "En el marco de la operacion de este sitio web, DYNAMO puede recopilar las siguientes categorias de datos personales:",
    p2Nav: "Datos de navegacion:",
    p2NavDesc: "direccion IP, tipo de navegador y dispositivo, sistema operativo, paginas visitadas, duracion de la visita, fuente de trafico y datos anonimizados de interaccion mediante cookies y tecnologias similares.",
    p2Form: "Datos de formulario de contacto:",
    p2FormDesc: "nombre, direccion de correo electronico, empresa, rol o cargo, pais y el contenido del mensaje enviado a traves de nuestro formulario.",
    p2Wa: "Datos de WhatsApp:",
    p2WaDesc: "si el usuario nos contacta a traves de WhatsApp, recopilaremos el numero de telefono y el contenido de la conversacion en la medida necesaria para responder la consulta.",
    p3Title: "Finalidad del tratamiento",
    p3Intro: "Los datos personales recopilados se utilizan exclusivamente para las siguientes finalidades:",
    p3A: "Responder consultas comerciales y solicitudes de informacion recibidas a traves del formulario de contacto o WhatsApp.",
    p3B: "Mejorar la experiencia de navegacion y el rendimiento del sitio web mediante analisis estadistico anonimizado.",
    p3C: "Enviar informacion comercial sobre nuestros servicios, unicamente cuando el usuario haya prestado su consentimiento expreso para recibirla.",
    p3D: "Realizar analisis de trafico web (analytics) para comprender patrones de uso y optimizar contenidos.",
    p4Title: "Base legal del tratamiento",
    p4Intro: "El tratamiento de datos personales se fundamenta en las siguientes bases legales, segun corresponda:",
    p4Consent: "Consentimiento:",
    p4ConsentDesc: "para el uso de cookies no esenciales y el envio de comunicaciones comerciales.",
    p4Legit: "Interes legitimo:",
    p4LegitDesc: "para el analisis de trafico web y la mejora continua del sitio.",
    p4Precontract: "Ejecucion precontractual:",
    p4PrecontractDesc: "para gestionar y responder las consultas recibidas a traves del formulario de contacto.",
    p5Title: "Cookies",
    p5Intro: "Este sitio web utiliza las siguientes categorias de cookies:",
    p5Essential: "Cookies esenciales:",
    p5EssentialDesc: "necesarias para el funcionamiento basico del sitio, incluyendo la preferencia de idioma del usuario.",
    p5Consent: "Cookies de consentimiento:",
    p5ConsentDesc: "almacenan la eleccion del usuario respecto a la aceptacion o rechazo de cookies.",
    p5Analytics: "Cookies analiticas (Google Analytics 4):",
    p5AnalyticsDesc: "permiten recopilar informacion anonimizada sobre el uso del sitio web, incluyendo paginas visitadas, duracion de sesiones y fuentes de trafico. Estos datos se procesan de forma agregada.",
    p5Functional: "Cookies funcionales:",
    p5FunctionalDesc: "mejoran la experiencia del usuario recordando preferencias de navegacion.",
    p5Manage: "El usuario puede gestionar sus preferencias de cookies en cualquier momento a traves del banner de consentimiento o de la configuracion de su navegador.",
    p6Title: "Comparticion con terceros",
    p6Intro: "DYNAMO no vende, alquila ni comercializa datos personales de los usuarios a terceros bajo ninguna circunstancia. Los datos podran ser compartidos unicamente con los siguientes proveedores de servicios, en la medida necesaria para el funcionamiento del sitio:",
    p6GA: "Google Analytics (Google LLC):",
    p6GADesc: "para el analisis estadistico del trafico web.",
    p6Vercel: "Vercel Inc.:",
    p6VercelDesc: "como proveedor de hosting e infraestructura del sitio web.",
    p6Outro: "Estos proveedores actuan como encargados del tratamiento y estan obligados contractualmente a tratar los datos conforme a esta politica y la normativa aplicable.",
    p7Title: "Transferencias internacionales",
    p7Body: "Dado el caracter global de nuestras operaciones, los datos personales pueden ser transferidos y almacenados en servidores ubicados en Estados Unidos (Vercel) y en Argentina. Estas transferencias se realizan con medidas de proteccion adecuadas, incluyendo clausulas contractuales estandar aprobadas y el cumplimiento de las regulaciones de proteccion de datos aplicables en cada jurisdiccion.",
    p8Title: "Seguridad de los datos",
    p8Intro: "DYNAMO implementa medidas tecnicas y organizativas apropiadas para proteger los datos personales contra acceso no autorizado, perdida, alteracion o destruccion. Estas medidas incluyen:",
    p8A: "Encriptacion de datos en transito mediante protocolo TLS (Transport Layer Security).",
    p8B: "Encriptacion de datos en reposo.",
    p8C: "Acceso restringido exclusivamente a personal autorizado.",
    p8D: "Medidas de seguridad alineadas con estandares corporativos de la industria.",
    p9Title: "Plazos de retencion",
    p9Intro: "Los datos personales se conservan durante los siguientes plazos:",
    p9Form: "Datos de formulario de contacto:",
    p9FormDesc: "dos (2) anos desde la ultima interaccion, salvo que el usuario solicite su eliminacion con anterioridad.",
    p9Cookies: "Cookies:",
    p9CookiesDesc: "segun el tipo de cookie, entre la duracion de la sesion y un maximo de trece (13) meses para cookies analiticas.",
    p9Logs: "Registros de servidor (logs):",
    p9LogsDesc: "noventa (90) dias.",
    p10Title: "Derechos del titular",
    p10Intro: "De conformidad con la legislacion aplicable, el usuario tiene derecho a:",
    p10Access: "Acceso:",
    p10AccessDesc: "solicitar confirmacion sobre si sus datos estan siendo tratados y obtener una copia de los mismos.",
    p10Rectify: "Rectificacion:",
    p10RectifyDesc: "solicitar la correccion de datos inexactos o incompletos.",
    p10Delete: "Supresion:",
    p10DeleteDesc: "solicitar la eliminacion de sus datos personales cuando ya no sean necesarios para la finalidad para la que fueron recopilados.",
    p10Object: "Oposicion:",
    p10ObjectDesc: "oponerse al tratamiento de sus datos en determinadas circunstancias.",
    p10Port: "Portabilidad:",
    p10PortDesc: "solicitar la entrega de sus datos en un formato estructurado y de uso comun.",
    p10Outro: "Para ejercer cualquiera de estos derechos, el usuario puede enviar su solicitud a",
    p10OutroEnd: ", indicando su nombre completo y el derecho que desea ejercer. DYNAMO respondera en un plazo maximo de treinta (30) dias habiles.",
    p11Title: "Legislacion aplicable",
    p11Intro: "La presente politica de privacidad se rige por la legislacion de la Republica Argentina, en particular:",
    p11AR: "Argentina:",
    p11ARDesc: "Ley 25.326 de Proteccion de Datos Personales y sus normas reglamentarias, incluyendo las disposiciones de la Agencia de Acceso a la Informacion Publica (AAIP).",
    p11EU: "Union Europea:",
    p11EUDesc: "para usuarios ubicados en paises miembros de la UE o el EEE, se aplica adicionalmente el Reglamento General de Proteccion de Datos (RGPD/GDPR - Reglamento UE 2016/679).",
    p11BR: "Brasil:",
    p11BRDesc: "para usuarios ubicados en Brasil, se aplica adicionalmente la Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).",
    p12Title: "Actualizaciones de esta politica",
    p12Body: "DYNAMO se reserva el derecho de modificar esta politica de privacidad en cualquier momento. Las modificaciones seran publicadas en esta pagina con indicacion de la fecha de ultima actualizacion. Se recomienda al usuario revisar esta pagina periodicamente.",
    // Terms of Service
    t1Title: "Aceptacion de los terminos",
    t1Body: 'Al acceder, navegar y utilizar el sitio web de DYNAMO (en adelante, "el Sitio"), el usuario acepta quedar vinculado por los presentes Terminos de Servicio. Si no esta de acuerdo con alguno de estos terminos, debera abstenerse de utilizar el Sitio. El uso continuado del Sitio tras la publicacion de modificaciones a estos terminos constituye la aceptacion de dichas modificaciones.',
    t2Title: "Descripcion del servicio",
    t2P1: "El Sitio es un medio informativo sobre DYNAMO y su plataforma DYNAMO Journeys, una solucion de orquestacion omnicanal disenada para operadores de telecomunicaciones. A traves del Sitio, los usuarios pueden obtener informacion sobre nuestros productos y servicios, acceder a contenido institucional y comercial, y ponerse en contacto con nuestro equipo.",
    t2P2: "El Sitio no constituye una oferta de venta ni un compromiso contractual. Las condiciones especificas de prestacion de servicios se rigen por los contratos individuales celebrados con cada cliente.",
    t3Title: "Propiedad intelectual",
    t3P1: "Todo el contenido del Sitio, incluyendo pero no limitado a textos, graficos, imagenes, logotipos, iconos, diseno, estructura de navegacion, codigo fuente, software y compilaciones de datos, es propiedad exclusiva de DYNAMO o de sus licenciantes y esta protegido por las leyes de propiedad intelectual aplicables.",
    t3P2: "La marca DYNAMO, el logotipo de DYNAMO y todas las marcas relacionadas son marcas registradas o de uso exclusivo de DYNAMO. Queda prohibida su reproduccion, distribucion, comunicacion publica o transformacion sin autorizacion previa y por escrito de DYNAMO.",
    t4Title: "Uso permitido",
    t4Intro: "El usuario esta autorizado a utilizar el Sitio exclusivamente para los siguientes fines:",
    t4A: "Navegacion informativa sobre los productos y servicios de DYNAMO.",
    t4B: "Contacto comercial a traves de los formularios y canales habilitados en el Sitio.",
    t4C: "Descarga de materiales publicos expresamente puestos a disposicion para tal fin (brochures, documentos tecnicos, etc.).",
    t5Title: "Uso prohibido",
    t5Intro: "Queda expresamente prohibido, sin la autorizacion previa y por escrito de DYNAMO:",
    t5A: "Realizar scraping, crawling o extraccion automatizada de contenido del Sitio mediante bots, spiders u otras herramientas automatizadas.",
    t5B: "Realizar ingenieria inversa, descompilar o intentar obtener el codigo fuente del Sitio o de cualquier tecnologia subyacente.",
    t5C: "Utilizar el contenido del Sitio con fines competitivos o para desarrollar productos o servicios similares a los de DYNAMO.",
    t5D: "Reproducir, duplicar, copiar, distribuir o explotar cualquier parte del Sitio con fines comerciales sin autorizacion.",
    t5E: "Intentar acceder a areas restringidas del Sitio o vulnerar las medidas de seguridad implementadas.",
    t6Title: "Formularios y datos enviados",
    t6Body: "La informacion proporcionada por el usuario a traves de los formularios del Sitio sera tratada de conformidad con nuestra Politica de Privacidad. El usuario declara que los datos proporcionados son veridicos, actuales y completos, y se compromete a mantenerlos actualizados.",
    t7Title: "Enlaces a sitios de terceros",
    t7Body: "El Sitio puede contener enlaces a sitios web de terceros. Estos enlaces se proporcionan unicamente para conveniencia del usuario. DYNAMO no controla, respalda ni asume responsabilidad alguna por el contenido, las politicas de privacidad o las practicas de sitios web de terceros. El acceso a dichos sitios se realiza bajo la exclusiva responsabilidad del usuario.",
    t8Title: "Limitacion de responsabilidad",
    t8Intro: 'El Sitio se proporciona "tal cual" ("as is") y "segun disponibilidad". DYNAMO no garantiza que el Sitio estara disponible de forma ininterrumpida, libre de errores o seguro en todo momento. En la medida permitida por la ley aplicable, DYNAMO no sera responsable por:',
    t8A: "Danos directos, indirectos, incidentales o consecuentes derivados del uso o la imposibilidad de uso del Sitio.",
    t8B: "Interrupciones temporales del servicio por mantenimiento, actualizaciones o causas de fuerza mayor.",
    t8C: "Inexactitudes u omisiones en el contenido publicado en el Sitio.",
    t9Title: "Ley aplicable y jurisdiccion",
    t9Body: "Los presentes Terminos de Servicio se rigen por las leyes de la Republica Argentina. Para cualquier controversia derivada del uso del Sitio, las partes se someten a la jurisdiccion exclusiva de los Tribunales Ordinarios de la Ciudad Autonoma de Buenos Aires, Republica Argentina, renunciando a cualquier otro fuero que pudiera corresponderles.",
    t10Title: "Contacto",
    t10Body: "Para consultas relacionadas con estos Terminos de Servicio, el usuario puede comunicarse a traves de",
    // Compliance
    c1Title: "Marco regulatorio general",
    c1Body: "DYNAMO mantiene un programa de compliance disenado para asegurar el cumplimiento de las regulaciones de proteccion de datos y telecomunicaciones en todas las jurisdicciones donde operamos. Nuestro enfoque se adapta a los requisitos especificos de cada pais, garantizando que las operaciones de procesamiento de datos cumplan con la normativa local aplicable.",
    c2Title: "Normativa por jurisdiccion",
    c2Intro: "DYNAMO cumple con las siguientes regulaciones, segun la jurisdiccion:",
    c2AR: "Argentina:",
    c2ARDesc: "Ley 25.326 de Proteccion de Datos Personales y sus normas reglamentarias, Disposiciones de la Agencia de Acceso a la Informacion Publica (AAIP), y regulaciones de telecomunicaciones aplicables (ENACOM).",
    c2EU: "Europa (Espana, Grecia y otros):",
    c2EUDesc: "Reglamento General de Proteccion de Datos (RGPD/GDPR - Reglamento UE 2016/679), incluyendo los requisitos de base legal para el tratamiento, derechos de los interesados, evaluaciones de impacto (DPIA) y notificacion de brechas de seguridad.",
    c2BR: "Brasil:",
    c2BRDesc: "Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018), incluyendo requisitos de consentimiento, derechos de titulares y obligaciones de reporte ante la Autoridade Nacional de Protecao de Dados (ANPD).",
    c2AF: "Africa:",
    c2AFDesc: "leyes locales de proteccion de datos aplicables en cada pais de operacion, incluyendo la Data Protection Act de Ghana (DPA 2012, Act 843), la Protection of Personal Information Act de Sudafrica (POPIA), y regulaciones equivalentes en las demas jurisdicciones donde operamos.",
    c3Title: "Seguridad de la informacion",
    c3Intro: "DYNAMO implementa un marco integral de seguridad de la informacion que incluye:",
    c3A: "Encriptacion de datos en transito (TLS) y en reposo.",
    c3B: "Controles de acceso basados en roles con autenticacion reforzada.",
    c3C: "Monitoreo continuo de sistemas y deteccion de anomalias.",
    c3D: "Auditorias periodicas de seguridad, tanto internas como externas.",
    c3E: "Capacitacion continua del personal en materia de seguridad de la informacion y proteccion de datos.",
    c4Title: "Tratamiento de datos de operadores Telco",
    c4Intro: "En el marco de la prestacion de servicios a operadores de telecomunicaciones, DYNAMO actua como encargado del tratamiento (data processor) de los datos de suscriptores. Esto significa que:",
    c4A: "Los datos de suscriptores se procesan exclusivamente bajo las instrucciones del operador Telco (responsable del tratamiento / data controller).",
    c4B: "DYNAMO no utiliza los datos de suscriptores para fines propios ni los comparte con terceros, salvo instruccion expresa del operador.",
    c4C: "Al finalizar la relacion contractual, los datos son devueltos o eliminados de forma segura, segun lo acordado con cada operador.",
    c5Title: "Politica sobre inteligencia artificial y LLMs",
    c5Intro: "DYNAMO mantiene una politica estricta respecto al uso de herramientas de inteligencia artificial y modelos de lenguaje (LLMs):",
    c5A: "No se carga informacion confidencial de clientes, operadores ni suscriptores en herramientas publicas de IA o LLMs.",
    c5B: "El uso de herramientas de IA para tareas internas esta regulado y sujeto a aprobacion, asegurando que no se comprometa la confidencialidad de los datos.",
    c5C: "Todo el personal recibe capacitacion sobre el uso responsable de herramientas de IA en el entorno corporativo.",
    c6Title: "Gestion de incidentes",
    c6Intro: "DYNAMO cuenta con un plan de respuesta ante incidentes de seguridad que contempla:",
    c6A: "Notificacion a los clientes afectados sin demora indebida tras la deteccion de un incidente de seguridad que afecte datos personales.",
    c6B: "Notificacion a las autoridades de proteccion de datos competentes dentro de los plazos legales establecidos (72 horas segun GDPR, cuando aplique).",
    c6C: "Investigacion, contencion y remediacion del incidente.",
    c6D: "Documentacion completa del incidente, incluyendo causas, impacto y medidas correctivas adoptadas.",
    c7Title: "Contacto de compliance",
    c7Body: "Para consultas, reportes o solicitudes relacionadas con compliance, proteccion de datos o seguridad de la informacion, el usuario puede comunicarse con nuestro equipo a traves de",
  },
  en: {
    metaLegalTitle: "Legal & Privacy — DYNAMO",
    metaDesc: "Privacy policy, terms of service, and compliance at DYNAMO. Legal information about the use of the website and the DYNAMO Journeys platform.",
    heroDesc: "Legal information about the use of the DYNAMO website, our privacy policies, terms of service, and compliance framework applicable to our global operations.",
    tocPrivacy: "Privacy Policy",
    tocTerms: "Terms of Service",
    tocCompliance: "Compliance",
    lastUpdate: "Last update",
    lastUpdateDate: "April 2026",
    lastUpdateFull: "Last update: April 1, 2026",
    ctaTitle: "Questions about our policies?",
    ctaDesc: "Our legal team is available to answer any questions about privacy, terms of service, or compliance.",
    ctaButton: "Contact the legal team",
    p1Title: "Data controller",
    p1Body: "The data controller for personal data collected through this website is DYNAMO, with registered address at Francisco N. de Laprida 771, 7th floor, B1638 Florida, Buenos Aires, Argentina. For privacy and data protection inquiries, you can contact us at",
    p2Title: "Data we collect",
    p2Intro: "In the operation of this website, DYNAMO may collect the following categories of personal data:",
    p2Nav: "Browsing data:",
    p2NavDesc: "IP address, browser and device type, operating system, pages visited, visit duration, traffic source, and anonymized interaction data through cookies and similar technologies.",
    p2Form: "Contact form data:",
    p2FormDesc: "name, email address, company, role or position, country, and the content of the message sent through our form.",
    p2Wa: "WhatsApp data:",
    p2WaDesc: "if the user contacts us through WhatsApp, we will collect the phone number and conversation content to the extent necessary to respond to the inquiry.",
    p3Title: "Purpose of processing",
    p3Intro: "Personal data collected is used exclusively for the following purposes:",
    p3A: "Responding to commercial inquiries and information requests received through the contact form or WhatsApp.",
    p3B: "Improving the browsing experience and website performance through anonymized statistical analysis.",
    p3C: "Sending commercial information about our services, only when the user has given express consent to receive it.",
    p3D: "Performing web traffic analysis (analytics) to understand usage patterns and optimize content.",
    p4Title: "Legal basis for processing",
    p4Intro: "The processing of personal data is based on the following legal grounds, as applicable:",
    p4Consent: "Consent:",
    p4ConsentDesc: "for the use of non-essential cookies and sending commercial communications.",
    p4Legit: "Legitimate interest:",
    p4LegitDesc: "for web traffic analysis and continuous improvement of the site.",
    p4Precontract: "Pre-contractual execution:",
    p4PrecontractDesc: "for managing and responding to inquiries received through the contact form.",
    p5Title: "Cookies",
    p5Intro: "This website uses the following categories of cookies:",
    p5Essential: "Essential cookies:",
    p5EssentialDesc: "necessary for the basic functioning of the site, including the user's language preference.",
    p5Consent: "Consent cookies:",
    p5ConsentDesc: "store the user's choice regarding the acceptance or rejection of cookies.",
    p5Analytics: "Analytics cookies (Google Analytics 4):",
    p5AnalyticsDesc: "collect anonymized information about website usage, including pages visited, session duration, and traffic sources. This data is processed in aggregate form.",
    p5Functional: "Functional cookies:",
    p5FunctionalDesc: "enhance the user experience by remembering browsing preferences.",
    p5Manage: "Users can manage their cookie preferences at any time through the consent banner or their browser settings.",
    p6Title: "Sharing with third parties",
    p6Intro: "DYNAMO does not sell, rent, or trade users' personal data to third parties under any circumstances. Data may be shared only with the following service providers, to the extent necessary for the operation of the site:",
    p6GA: "Google Analytics (Google LLC):",
    p6GADesc: "for statistical analysis of web traffic.",
    p6Vercel: "Vercel Inc.:",
    p6VercelDesc: "as the hosting and infrastructure provider for the website.",
    p6Outro: "These providers act as data processors and are contractually obligated to process data in accordance with this policy and applicable regulations.",
    p7Title: "International transfers",
    p7Body: "Given the global nature of our operations, personal data may be transferred and stored on servers located in the United States (Vercel) and Argentina. These transfers are carried out with appropriate safeguards, including approved standard contractual clauses and compliance with applicable data protection regulations in each jurisdiction.",
    p8Title: "Data security",
    p8Intro: "DYNAMO implements appropriate technical and organizational measures to protect personal data against unauthorized access, loss, alteration, or destruction. These measures include:",
    p8A: "Data encryption in transit using TLS (Transport Layer Security) protocol.",
    p8B: "Data encryption at rest.",
    p8C: "Access restricted exclusively to authorized personnel.",
    p8D: "Security measures aligned with industry corporate standards.",
    p9Title: "Retention periods",
    p9Intro: "Personal data is retained for the following periods:",
    p9Form: "Contact form data:",
    p9FormDesc: "two (2) years from the last interaction, unless the user requests earlier deletion.",
    p9Cookies: "Cookies:",
    p9CookiesDesc: "depending on the cookie type, between session duration and a maximum of thirteen (13) months for analytics cookies.",
    p9Logs: "Server logs:",
    p9LogsDesc: "ninety (90) days.",
    p10Title: "Data subject rights",
    p10Intro: "In accordance with applicable legislation, the user has the right to:",
    p10Access: "Access:",
    p10AccessDesc: "request confirmation of whether their data is being processed and obtain a copy.",
    p10Rectify: "Rectification:",
    p10RectifyDesc: "request the correction of inaccurate or incomplete data.",
    p10Delete: "Erasure:",
    p10DeleteDesc: "request the deletion of personal data when it is no longer necessary for the purpose for which it was collected.",
    p10Object: "Objection:",
    p10ObjectDesc: "object to the processing of their data in certain circumstances.",
    p10Port: "Portability:",
    p10PortDesc: "request the delivery of their data in a structured, commonly used format.",
    p10Outro: "To exercise any of these rights, the user may send a request to",
    p10OutroEnd: ", indicating their full name and the right they wish to exercise. DYNAMO will respond within a maximum of thirty (30) business days.",
    p11Title: "Applicable legislation",
    p11Intro: "This privacy policy is governed by the legislation of the Argentine Republic, in particular:",
    p11AR: "Argentina:",
    p11ARDesc: "Law 25,326 on Personal Data Protection and its regulatory provisions, including the dispositions of the Agency for Access to Public Information (AAIP).",
    p11EU: "European Union:",
    p11EUDesc: "for users located in EU or EEA member states, the General Data Protection Regulation (GDPR - Regulation EU 2016/679) additionally applies.",
    p11BR: "Brazil:",
    p11BRDesc: "for users located in Brazil, the Lei Geral de Protecao de Dados (LGPD - Law 13,709/2018) additionally applies.",
    p12Title: "Updates to this policy",
    p12Body: "DYNAMO reserves the right to modify this privacy policy at any time. Modifications will be published on this page with an indication of the last update date. Users are encouraged to review this page periodically.",
    t1Title: "Acceptance of terms",
    t1Body: 'By accessing, browsing, and using the DYNAMO website (hereinafter, "the Site"), the user agrees to be bound by these Terms of Service. If you do not agree with any of these terms, you should refrain from using the Site. Continued use of the Site after the publication of modifications to these terms constitutes acceptance of such modifications.',
    t2Title: "Description of service",
    t2P1: "The Site is an informational medium about DYNAMO and its DYNAMO Journeys platform, an omnichannel orchestration solution designed for telecommunications operators. Through the Site, users can obtain information about our products and services, access institutional and commercial content, and contact our team.",
    t2P2: "The Site does not constitute a sales offer or contractual commitment. The specific conditions for service provision are governed by individual contracts entered into with each client.",
    t3Title: "Intellectual property",
    t3P1: "All content on the Site, including but not limited to text, graphics, images, logos, icons, design, navigation structure, source code, software, and data compilations, is the exclusive property of DYNAMO or its licensors and is protected by applicable intellectual property laws.",
    t3P2: "The DYNAMO brand, the DYNAMO logo, and all related marks are registered trademarks or exclusive-use marks of DYNAMO. Their reproduction, distribution, public communication, or transformation without prior written authorization from DYNAMO is prohibited.",
    t4Title: "Permitted use",
    t4Intro: "The user is authorized to use the Site exclusively for the following purposes:",
    t4A: "Informational browsing about DYNAMO products and services.",
    t4B: "Commercial contact through the forms and channels enabled on the Site.",
    t4C: "Downloading public materials expressly made available for that purpose (brochures, technical documents, etc.).",
    t5Title: "Prohibited use",
    t5Intro: "Without prior written authorization from DYNAMO, the following is expressly prohibited:",
    t5A: "Scraping, crawling, or automated content extraction from the Site using bots, spiders, or other automated tools.",
    t5B: "Reverse engineering, decompiling, or attempting to obtain the source code of the Site or any underlying technology.",
    t5C: "Using the Site's content for competitive purposes or to develop products or services similar to DYNAMO's.",
    t5D: "Reproducing, duplicating, copying, distributing, or exploiting any part of the Site for commercial purposes without authorization.",
    t5E: "Attempting to access restricted areas of the Site or circumventing implemented security measures.",
    t6Title: "Forms and submitted data",
    t6Body: "Information provided by the user through the Site's forms will be processed in accordance with our Privacy Policy. The user declares that the data provided is truthful, current, and complete, and commits to keeping it updated.",
    t7Title: "Links to third-party sites",
    t7Body: "The Site may contain links to third-party websites. These links are provided solely for the user's convenience. DYNAMO does not control, endorse, or assume any responsibility for the content, privacy policies, or practices of third-party websites. Access to such sites is at the user's sole risk.",
    t8Title: "Limitation of liability",
    t8Intro: 'The Site is provided "as is" and "as available." DYNAMO does not guarantee that the Site will be available uninterruptedly, error-free, or secure at all times. To the extent permitted by applicable law, DYNAMO shall not be liable for:',
    t8A: "Direct, indirect, incidental, or consequential damages arising from the use or inability to use the Site.",
    t8B: "Temporary service interruptions due to maintenance, updates, or force majeure.",
    t8C: "Inaccuracies or omissions in the content published on the Site.",
    t9Title: "Applicable law and jurisdiction",
    t9Body: "These Terms of Service are governed by the laws of the Argentine Republic. For any dispute arising from the use of the Site, the parties submit to the exclusive jurisdiction of the Ordinary Courts of the Autonomous City of Buenos Aires, Argentine Republic, waiving any other jurisdiction that may correspond to them.",
    t10Title: "Contact",
    t10Body: "For inquiries related to these Terms of Service, the user may contact us at",
    c1Title: "General regulatory framework",
    c1Body: "DYNAMO maintains a compliance program designed to ensure adherence to data protection and telecommunications regulations in all jurisdictions where we operate. Our approach adapts to the specific requirements of each country, ensuring that data processing operations comply with applicable local regulations.",
    c2Title: "Regulations by jurisdiction",
    c2Intro: "DYNAMO complies with the following regulations, by jurisdiction:",
    c2AR: "Argentina:",
    c2ARDesc: "Law 25,326 on Personal Data Protection and its regulatory provisions, Dispositions of the Agency for Access to Public Information (AAIP), and applicable telecommunications regulations (ENACOM).",
    c2EU: "Europe (Spain, Greece, and others):",
    c2EUDesc: "General Data Protection Regulation (GDPR - Regulation EU 2016/679), including legal basis requirements for processing, data subject rights, impact assessments (DPIA), and breach notification.",
    c2BR: "Brazil:",
    c2BRDesc: "Lei Geral de Protecao de Dados (LGPD - Law 13,709/2018), including consent requirements, data subject rights, and reporting obligations to the Autoridade Nacional de Protecao de Dados (ANPD).",
    c2AF: "Africa:",
    c2AFDesc: "applicable local data protection laws in each country of operation, including the Data Protection Act of Ghana (DPA 2012, Act 843), the Protection of Personal Information Act of South Africa (POPIA), and equivalent regulations in the other jurisdictions where we operate.",
    c3Title: "Information security",
    c3Intro: "DYNAMO implements a comprehensive information security framework that includes:",
    c3A: "Data encryption in transit (TLS) and at rest.",
    c3B: "Role-based access controls with enhanced authentication.",
    c3C: "Continuous system monitoring and anomaly detection.",
    c3D: "Periodic security audits, both internal and external.",
    c3E: "Ongoing staff training on information security and data protection.",
    c4Title: "Processing of Telco operator data",
    c4Intro: "In the provision of services to telecommunications operators, DYNAMO acts as a data processor for subscriber data. This means that:",
    c4A: "Subscriber data is processed exclusively under the instructions of the Telco operator (data controller).",
    c4B: "DYNAMO does not use subscriber data for its own purposes or share it with third parties, except under express instruction from the operator.",
    c4C: "Upon termination of the contractual relationship, data is returned or securely deleted, as agreed with each operator.",
    c5Title: "Policy on artificial intelligence and LLMs",
    c5Intro: "DYNAMO maintains a strict policy regarding the use of artificial intelligence tools and language models (LLMs):",
    c5A: "Confidential information from clients, operators, or subscribers is not uploaded to public AI or LLM tools.",
    c5B: "The use of AI tools for internal tasks is regulated and subject to approval, ensuring data confidentiality is not compromised.",
    c5C: "All staff receive training on the responsible use of AI tools in the corporate environment.",
    c6Title: "Incident management",
    c6Intro: "DYNAMO has a security incident response plan that includes:",
    c6A: "Notification to affected clients without undue delay after the detection of a security incident affecting personal data.",
    c6B: "Notification to competent data protection authorities within the legally established timeframes (72 hours under GDPR, when applicable).",
    c6C: "Investigation, containment, and remediation of the incident.",
    c6D: "Complete documentation of the incident, including causes, impact, and corrective measures adopted.",
    c7Title: "Compliance contact",
    c7Body: "For inquiries, reports, or requests related to compliance, data protection, or information security, the user may contact our team at",
  },
  fr: {
    metaLegalTitle: "Mentions Legales et Confidentialite — DYNAMO",
    metaDesc: "Politique de confidentialite, conditions d'utilisation et conformite de DYNAMO. Informations juridiques sur l'utilisation du site web et de la plateforme DYNAMO Journeys.",
    heroDesc: "Informations juridiques sur l'utilisation du site web de DYNAMO, nos politiques de confidentialite, conditions d'utilisation et cadre de conformite applicable a nos operations mondiales.",
    tocPrivacy: "Politique de confidentialite",
    tocTerms: "Conditions d'utilisation",
    tocCompliance: "Conformite",
    lastUpdate: "Derniere mise a jour",
    lastUpdateDate: "Avril 2026",
    lastUpdateFull: "Derniere mise a jour : 1er avril 2026",
    ctaTitle: "Questions sur nos politiques\u00a0?",
    ctaDesc: "Notre equipe juridique est disponible pour repondre a toute question sur la confidentialite, les conditions d'utilisation ou la conformite.",
    ctaButton: "Contacter l'equipe juridique",
    p1Title: "Responsable du traitement", p1Body: "Le responsable du traitement des donnees personnelles collectees via ce site web est DYNAMO, dont le siege social est situe Francisco N. de Laprida 771, 7eme etage, B1638 Florida, Buenos Aires, Argentine. Pour toute question relative a la confidentialite et a la protection des donnees, vous pouvez nous contacter a",
    p2Title: "Donnees que nous collectons", p2Intro: "Dans le cadre de l'exploitation de ce site web, DYNAMO peut collecter les categories suivantes de donnees personnelles :", p2Nav: "Donnees de navigation :", p2NavDesc: "adresse IP, type de navigateur et d'appareil, systeme d'exploitation, pages visitees, duree de la visite, source du trafic et donnees d'interaction anonymisees via des cookies et technologies similaires.", p2Form: "Donnees du formulaire de contact :", p2FormDesc: "nom, adresse e-mail, entreprise, role ou poste, pays et contenu du message envoye via notre formulaire.", p2Wa: "Donnees WhatsApp :", p2WaDesc: "si l'utilisateur nous contacte via WhatsApp, nous collecterons le numero de telephone et le contenu de la conversation dans la mesure necessaire pour repondre a la demande.",
    p3Title: "Finalite du traitement", p3Intro: "Les donnees personnelles collectees sont utilisees exclusivement aux fins suivantes :", p3A: "Repondre aux demandes commerciales et demandes d'information recues via le formulaire de contact ou WhatsApp.", p3B: "Ameliorer l'experience de navigation et les performances du site web par analyse statistique anonymisee.", p3C: "Envoyer des informations commerciales sur nos services, uniquement lorsque l'utilisateur a donne son consentement expres.", p3D: "Effectuer des analyses de trafic web (analytics) pour comprendre les habitudes d'utilisation et optimiser le contenu.",
    p4Title: "Base juridique du traitement", p4Intro: "Le traitement des donnees personnelles repose sur les bases juridiques suivantes, selon le cas :", p4Consent: "Consentement :", p4ConsentDesc: "pour l'utilisation de cookies non essentiels et l'envoi de communications commerciales.", p4Legit: "Interet legitime :", p4LegitDesc: "pour l'analyse du trafic web et l'amelioration continue du site.", p4Precontract: "Execution precontractuelle :", p4PrecontractDesc: "pour gerer et repondre aux demandes recues via le formulaire de contact.",
    p5Title: "Cookies", p5Intro: "Ce site web utilise les categories de cookies suivantes :", p5Essential: "Cookies essentiels :", p5EssentialDesc: "necessaires au fonctionnement de base du site, y compris la preference linguistique de l'utilisateur.", p5Consent: "Cookies de consentement :", p5ConsentDesc: "stockent le choix de l'utilisateur concernant l'acceptation ou le refus des cookies.", p5Analytics: "Cookies analytiques (Google Analytics 4) :", p5AnalyticsDesc: "collectent des informations anonymisees sur l'utilisation du site web, y compris les pages visitees, la duree des sessions et les sources de trafic. Ces donnees sont traitees de maniere agregee.", p5Functional: "Cookies fonctionnels :", p5FunctionalDesc: "ameliorent l'experience utilisateur en memorisant les preferences de navigation.", p5Manage: "L'utilisateur peut gerer ses preferences de cookies a tout moment via la banniere de consentement ou les parametres de son navigateur.",
    p6Title: "Partage avec des tiers", p6Intro: "DYNAMO ne vend, ne loue ni ne commercialise les donnees personnelles des utilisateurs aupres de tiers en aucune circonstance. Les donnees ne peuvent etre partagees qu'avec les prestataires suivants, dans la mesure necessaire au fonctionnement du site :", p6GA: "Google Analytics (Google LLC) :", p6GADesc: "pour l'analyse statistique du trafic web.", p6Vercel: "Vercel Inc. :", p6VercelDesc: "en tant que fournisseur d'hebergement et d'infrastructure du site web.", p6Outro: "Ces prestataires agissent en tant que sous-traitants et sont contractuellement tenus de traiter les donnees conformement a cette politique et a la reglementation applicable.",
    p7Title: "Transferts internationaux", p7Body: "Compte tenu du caractere mondial de nos operations, les donnees personnelles peuvent etre transferees et stockees sur des serveurs situes aux Etats-Unis (Vercel) et en Argentine. Ces transferts sont effectues avec des garanties appropriees, y compris des clauses contractuelles types approuvees et le respect des reglementations applicables en matiere de protection des donnees dans chaque juridiction.",
    p8Title: "Securite des donnees", p8Intro: "DYNAMO met en oeuvre des mesures techniques et organisationnelles appropriees pour proteger les donnees personnelles contre tout acces non autorise, perte, alteration ou destruction. Ces mesures comprennent :", p8A: "Chiffrement des donnees en transit via le protocole TLS.", p8B: "Chiffrement des donnees au repos.", p8C: "Acces restreint au seul personnel autorise.", p8D: "Mesures de securite alignees sur les normes de l'industrie.",
    p9Title: "Durees de conservation", p9Intro: "Les donnees personnelles sont conservees pendant les durees suivantes :", p9Form: "Donnees du formulaire de contact :", p9FormDesc: "deux (2) ans a compter de la derniere interaction, sauf demande de suppression anterieure de l'utilisateur.", p9Cookies: "Cookies :", p9CookiesDesc: "selon le type de cookie, entre la duree de la session et un maximum de treize (13) mois pour les cookies analytiques.", p9Logs: "Journaux du serveur (logs) :", p9LogsDesc: "quatre-vingt-dix (90) jours.",
    p10Title: "Droits de la personne concernee", p10Intro: "Conformement a la legislation applicable, l'utilisateur a le droit de :", p10Access: "Acces :", p10AccessDesc: "demander la confirmation du traitement de ses donnees et en obtenir une copie.", p10Rectify: "Rectification :", p10RectifyDesc: "demander la correction de donnees inexactes ou incompletes.", p10Delete: "Suppression :", p10DeleteDesc: "demander la suppression de ses donnees personnelles lorsqu'elles ne sont plus necessaires a la finalite pour laquelle elles ont ete collectees.", p10Object: "Opposition :", p10ObjectDesc: "s'opposer au traitement de ses donnees dans certaines circonstances.", p10Port: "Portabilite :", p10PortDesc: "demander la remise de ses donnees dans un format structure et d'usage courant.", p10Outro: "Pour exercer l'un de ces droits, l'utilisateur peut envoyer sa demande a", p10OutroEnd: ", en indiquant son nom complet et le droit qu'il souhaite exercer. DYNAMO repondra dans un delai maximum de trente (30) jours ouvrables.",
    p11Title: "Legislation applicable", p11Intro: "La presente politique de confidentialite est regie par la legislation de la Republique Argentine, notamment :", p11AR: "Argentine :", p11ARDesc: "Loi 25.326 sur la protection des donnees personnelles et ses dispositions reglementaires, y compris les dispositions de l'Agence d'acces a l'information publique (AAIP).", p11EU: "Union europeenne :", p11EUDesc: "pour les utilisateurs situes dans les Etats membres de l'UE ou de l'EEE, le Reglement general sur la protection des donnees (RGPD - Reglement UE 2016/679) s'applique en complement.", p11BR: "Bresil :", p11BRDesc: "pour les utilisateurs situes au Bresil, la Lei Geral de Protecao de Dados (LGPD - Loi 13.709/2018) s'applique en complement.",
    p12Title: "Mises a jour de cette politique", p12Body: "DYNAMO se reserve le droit de modifier cette politique de confidentialite a tout moment. Les modifications seront publiees sur cette page avec indication de la date de derniere mise a jour. Il est recommande a l'utilisateur de consulter cette page regulierement.",
    t1Title: "Acceptation des conditions", t1Body: "En accedant, naviguant et utilisant le site web de DYNAMO (ci-apres, \"le Site\"), l'utilisateur accepte d'etre lie par les presentes Conditions d'utilisation. S'il n'est pas d'accord avec l'une de ces conditions, il doit s'abstenir d'utiliser le Site. L'utilisation continue du Site apres la publication de modifications de ces conditions constitue l'acceptation de ces modifications.",
    t2Title: "Description du service", t2P1: "Le Site est un media informatif sur DYNAMO et sa plateforme DYNAMO Journeys, une solution d'orchestration omnicanale concue pour les operateurs de telecommunications. Via le Site, les utilisateurs peuvent obtenir des informations sur nos produits et services, acceder a du contenu institutionnel et commercial, et contacter notre equipe.", t2P2: "Le Site ne constitue ni une offre de vente ni un engagement contractuel. Les conditions specifiques de prestation de services sont regies par les contrats individuels conclus avec chaque client.",
    t3Title: "Propriete intellectuelle", t3P1: "Tout le contenu du Site, y compris mais sans s'y limiter les textes, graphiques, images, logos, icones, design, structure de navigation, code source, logiciels et compilations de donnees, est la propriete exclusive de DYNAMO ou de ses concedants et est protege par les lois applicables en matiere de propriete intellectuelle.", t3P2: "La marque DYNAMO, le logo DYNAMO et toutes les marques associees sont des marques deposees ou d'usage exclusif de DYNAMO. Leur reproduction, distribution, communication publique ou transformation sans autorisation ecrite prealable de DYNAMO est interdite.",
    t4Title: "Usage autorise", t4Intro: "L'utilisateur est autorise a utiliser le Site exclusivement aux fins suivantes :", t4A: "Navigation informative sur les produits et services de DYNAMO.", t4B: "Contact commercial via les formulaires et canaux mis a disposition sur le Site.", t4C: "Telechargement de materiaux publics expressement mis a disposition a cet effet (brochures, documents techniques, etc.).",
    t5Title: "Usage interdit", t5Intro: "Sans l'autorisation ecrite prealable de DYNAMO, il est expressement interdit de :", t5A: "Effectuer du scraping, crawling ou extraction automatisee de contenu du Site au moyen de bots, spiders ou autres outils automatises.", t5B: "Effectuer de l'ingenierie inverse, decompiler ou tenter d'obtenir le code source du Site ou de toute technologie sous-jacente.", t5C: "Utiliser le contenu du Site a des fins concurrentielles ou pour developper des produits ou services similaires a ceux de DYNAMO.", t5D: "Reproduire, dupliquer, copier, distribuer ou exploiter toute partie du Site a des fins commerciales sans autorisation.", t5E: "Tenter d'acceder a des zones restreintes du Site ou de contourner les mesures de securite mises en place.",
    t6Title: "Formulaires et donnees soumises", t6Body: "Les informations fournies par l'utilisateur via les formulaires du Site seront traitees conformement a notre Politique de confidentialite. L'utilisateur declare que les donnees fournies sont veridiques, actuelles et completes, et s'engage a les maintenir a jour.",
    t7Title: "Liens vers des sites tiers", t7Body: "Le Site peut contenir des liens vers des sites web tiers. Ces liens sont fournis uniquement pour la commodite de l'utilisateur. DYNAMO ne controle, n'approuve ni n'assume aucune responsabilite quant au contenu, aux politiques de confidentialite ou aux pratiques des sites web tiers. L'acces a ces sites se fait sous l'entiere responsabilite de l'utilisateur.",
    t8Title: "Limitation de responsabilite", t8Intro: "Le Site est fourni \"en l'etat\" et \"selon disponibilite\". DYNAMO ne garantit pas que le Site sera disponible de maniere ininterrompue, exempt d'erreurs ou securise a tout moment. Dans la mesure permise par la loi applicable, DYNAMO ne sera pas responsable de :", t8A: "Dommages directs, indirects, accessoires ou consecutifs resultant de l'utilisation ou de l'impossibilite d'utilisation du Site.", t8B: "Interruptions temporaires du service dues a la maintenance, aux mises a jour ou a des cas de force majeure.", t8C: "Inexactitudes ou omissions dans le contenu publie sur le Site.",
    t9Title: "Droit applicable et juridiction", t9Body: "Les presentes Conditions d'utilisation sont regies par les lois de la Republique Argentine. Pour tout litige decoulant de l'utilisation du Site, les parties se soumettent a la competence exclusive des tribunaux ordinaires de la ville autonome de Buenos Aires, Republique Argentine, renoncant a toute autre juridiction qui pourrait leur correspondre.",
    t10Title: "Contact", t10Body: "Pour toute question relative a ces Conditions d'utilisation, l'utilisateur peut nous contacter a",
    c1Title: "Cadre reglementaire general", c1Body: "DYNAMO maintient un programme de conformite concu pour assurer le respect des reglementations en matiere de protection des donnees et de telecommunications dans toutes les juridictions ou nous operons. Notre approche s'adapte aux exigences specifiques de chaque pays, garantissant que les operations de traitement des donnees sont conformes a la reglementation locale applicable.",
    c2Title: "Reglementation par juridiction", c2Intro: "DYNAMO respecte les reglementations suivantes, selon la juridiction :", c2AR: "Argentine :", c2ARDesc: "Loi 25.326 sur la protection des donnees personnelles et ses dispositions reglementaires, dispositions de l'AAIP, et reglementations des telecommunications applicables (ENACOM).", c2EU: "Europe (Espagne, Grece et autres) :", c2EUDesc: "Reglement general sur la protection des donnees (RGPD - Reglement UE 2016/679), y compris les exigences de base legale pour le traitement, les droits des personnes concernees, les evaluations d'impact (DPIA) et la notification des violations de donnees.", c2BR: "Bresil :", c2BRDesc: "Lei Geral de Protecao de Dados (LGPD - Loi 13.709/2018), y compris les exigences de consentement, les droits des titulaires et les obligations de declaration aupres de l'ANPD.", c2AF: "Afrique :", c2AFDesc: "lois locales de protection des donnees applicables dans chaque pays d'operation, y compris la Data Protection Act du Ghana (DPA 2012, Act 843), la POPIA d'Afrique du Sud, et les reglementations equivalentes dans les autres juridictions ou nous operons.",
    c3Title: "Securite de l'information", c3Intro: "DYNAMO met en oeuvre un cadre complet de securite de l'information qui comprend :", c3A: "Chiffrement des donnees en transit (TLS) et au repos.", c3B: "Controles d'acces bases sur les roles avec authentification renforcee.", c3C: "Surveillance continue des systemes et detection des anomalies.", c3D: "Audits de securite periodiques, tant internes qu'externes.", c3E: "Formation continue du personnel en matiere de securite de l'information et de protection des donnees.",
    c4Title: "Traitement des donnees des operateurs Telco", c4Intro: "Dans le cadre de la prestation de services aux operateurs de telecommunications, DYNAMO agit en tant que sous-traitant (data processor) des donnees des abonnes. Cela signifie que :", c4A: "Les donnees des abonnes sont traitees exclusivement selon les instructions de l'operateur Telco (responsable du traitement / data controller).", c4B: "DYNAMO n'utilise pas les donnees des abonnes a ses propres fins et ne les partage pas avec des tiers, sauf instruction expresse de l'operateur.", c4C: "A la fin de la relation contractuelle, les donnees sont restituees ou supprimees de maniere securisee, selon les accords conclus avec chaque operateur.",
    c5Title: "Politique sur l'intelligence artificielle et les LLMs", c5Intro: "DYNAMO maintient une politique stricte concernant l'utilisation d'outils d'intelligence artificielle et de modeles de langage (LLMs) :", c5A: "Les informations confidentielles des clients, operateurs ou abonnes ne sont pas chargees dans des outils publics d'IA ou de LLMs.", c5B: "L'utilisation d'outils d'IA pour les taches internes est reglementee et soumise a approbation, garantissant que la confidentialite des donnees n'est pas compromise.", c5C: "Tout le personnel recoit une formation sur l'utilisation responsable des outils d'IA en environnement professionnel.",
    c6Title: "Gestion des incidents", c6Intro: "DYNAMO dispose d'un plan de reponse aux incidents de securite qui prevoit :", c6A: "Notification aux clients concernes sans retard excessif apres la detection d'un incident de securite affectant des donnees personnelles.", c6B: "Notification aux autorites de protection des donnees competentes dans les delais legaux etablis (72 heures selon le RGPD, le cas echeant).", c6C: "Investigation, confinement et remediation de l'incident.", c6D: "Documentation complete de l'incident, y compris les causes, l'impact et les mesures correctives adoptees.",
    c7Title: "Contact conformite", c7Body: "Pour toute question, signalement ou demande relative a la conformite, la protection des donnees ou la securite de l'information, l'utilisateur peut contacter notre equipe a",
  },
  pt: {
    metaLegalTitle: "Legal e Privacidade — DYNAMO",
    metaDesc: "Politica de privacidade, termos de servico e compliance da DYNAMO. Informacoes legais sobre o uso do site e da plataforma DYNAMO Journeys.",
    heroDesc: "Informacoes legais sobre o uso do site da DYNAMO, nossas politicas de privacidade, termos de servico e marco de compliance aplicavel as nossas operacoes globais.",
    tocPrivacy: "Politica de Privacidade",
    tocTerms: "Termos de Servico",
    tocCompliance: "Compliance",
    lastUpdate: "Ultima atualizacao",
    lastUpdateDate: "Abril 2026",
    lastUpdateFull: "Ultima atualizacao: 1 de abril de 2026",
    ctaTitle: "Perguntas sobre nossas politicas?",
    ctaDesc: "Nossa equipe juridica esta disponivel para responder qualquer duvida sobre privacidade, termos de servico ou compliance.",
    ctaButton: "Contatar a equipe juridica",
    p1Title: "Responsavel pelo tratamento", p1Body: "O responsavel pelo tratamento dos dados pessoais coletados atraves deste site e a DYNAMO, com sede em Francisco N. de Laprida 771, 7o andar, B1638 Florida, Buenos Aires, Argentina. Para consultas sobre privacidade e protecao de dados, entre em contato pelo",
    p2Title: "Dados que coletamos", p2Intro: "No ambito da operacao deste site, a DYNAMO pode coletar as seguintes categorias de dados pessoais:", p2Nav: "Dados de navegacao:", p2NavDesc: "endereco IP, tipo de navegador e dispositivo, sistema operacional, paginas visitadas, duracao da visita, fonte de trafego e dados anonimizados de interacao por meio de cookies e tecnologias semelhantes.", p2Form: "Dados do formulario de contato:", p2FormDesc: "nome, endereco de e-mail, empresa, cargo, pais e conteudo da mensagem enviada pelo nosso formulario.", p2Wa: "Dados do WhatsApp:", p2WaDesc: "se o usuario entrar em contato pelo WhatsApp, coletaremos o numero de telefone e o conteudo da conversa na medida necessaria para responder a consulta.",
    p3Title: "Finalidade do tratamento", p3Intro: "Os dados pessoais coletados sao utilizados exclusivamente para as seguintes finalidades:", p3A: "Responder consultas comerciais e solicitacoes de informacao recebidas pelo formulario de contato ou WhatsApp.", p3B: "Melhorar a experiencia de navegacao e o desempenho do site por meio de analise estatistica anonimizada.", p3C: "Enviar informacoes comerciais sobre nossos servicos, somente quando o usuario tenha dado seu consentimento expresso.", p3D: "Realizar analises de trafego web (analytics) para compreender padroes de uso e otimizar conteudos.",
    p4Title: "Base legal do tratamento", p4Intro: "O tratamento de dados pessoais fundamenta-se nas seguintes bases legais, conforme aplicavel:", p4Consent: "Consentimento:", p4ConsentDesc: "para o uso de cookies nao essenciais e envio de comunicacoes comerciais.", p4Legit: "Interesse legitimo:", p4LegitDesc: "para analise de trafego web e melhoria continua do site.", p4Precontract: "Execucao pre-contratual:", p4PrecontractDesc: "para gerenciar e responder as consultas recebidas pelo formulario de contato.",
    p5Title: "Cookies", p5Intro: "Este site utiliza as seguintes categorias de cookies:", p5Essential: "Cookies essenciais:", p5EssentialDesc: "necessarios para o funcionamento basico do site, incluindo a preferencia de idioma do usuario.", p5Consent: "Cookies de consentimento:", p5ConsentDesc: "armazenam a escolha do usuario quanto a aceitacao ou rejeicao de cookies.", p5Analytics: "Cookies analiticos (Google Analytics 4):", p5AnalyticsDesc: "coletam informacoes anonimizadas sobre o uso do site, incluindo paginas visitadas, duracao das sessoes e fontes de trafego. Esses dados sao processados de forma agregada.", p5Functional: "Cookies funcionais:", p5FunctionalDesc: "melhoram a experiencia do usuario lembrando preferencias de navegacao.", p5Manage: "O usuario pode gerenciar suas preferencias de cookies a qualquer momento atraves do banner de consentimento ou das configuracoes do navegador.",
    p6Title: "Compartilhamento com terceiros", p6Intro: "A DYNAMO nao vende, aluga nem comercializa dados pessoais dos usuarios a terceiros em nenhuma circunstancia. Os dados poderao ser compartilhados apenas com os seguintes prestadores de servicos, na medida necessaria para o funcionamento do site:", p6GA: "Google Analytics (Google LLC):", p6GADesc: "para analise estatistica do trafego web.", p6Vercel: "Vercel Inc.:", p6VercelDesc: "como provedor de hospedagem e infraestrutura do site.", p6Outro: "Esses provedores atuam como operadores de dados e estao contratualmente obrigados a tratar os dados em conformidade com esta politica e a regulamentacao aplicavel.",
    p7Title: "Transferencias internacionais", p7Body: "Dado o carater global de nossas operacoes, os dados pessoais podem ser transferidos e armazenados em servidores localizados nos Estados Unidos (Vercel) e na Argentina. Essas transferencias sao realizadas com medidas de protecao adequadas, incluindo clausulas contratuais padrao aprovadas e o cumprimento das regulamentacoes de protecao de dados aplicaveis em cada jurisdicao.",
    p8Title: "Seguranca dos dados", p8Intro: "A DYNAMO implementa medidas tecnicas e organizacionais adequadas para proteger os dados pessoais contra acesso nao autorizado, perda, alteracao ou destruicao. Essas medidas incluem:", p8A: "Criptografia de dados em transito via protocolo TLS.", p8B: "Criptografia de dados em repouso.", p8C: "Acesso restrito exclusivamente a pessoal autorizado.", p8D: "Medidas de seguranca alinhadas com padroes corporativos da industria.",
    p9Title: "Prazos de retencao", p9Intro: "Os dados pessoais sao conservados pelos seguintes prazos:", p9Form: "Dados do formulario de contato:", p9FormDesc: "dois (2) anos a partir da ultima interacao, salvo solicitacao de exclusao anterior do usuario.", p9Cookies: "Cookies:", p9CookiesDesc: "conforme o tipo de cookie, entre a duracao da sessao e um maximo de treze (13) meses para cookies analiticos.", p9Logs: "Registros do servidor (logs):", p9LogsDesc: "noventa (90) dias.",
    p10Title: "Direitos do titular", p10Intro: "Em conformidade com a legislacao aplicavel, o usuario tem direito a:", p10Access: "Acesso:", p10AccessDesc: "solicitar confirmacao sobre se seus dados estao sendo tratados e obter uma copia.", p10Rectify: "Retificacao:", p10RectifyDesc: "solicitar a correcao de dados inexatos ou incompletos.", p10Delete: "Exclusao:", p10DeleteDesc: "solicitar a eliminacao de seus dados pessoais quando nao forem mais necessarios para a finalidade para a qual foram coletados.", p10Object: "Oposicao:", p10ObjectDesc: "opor-se ao tratamento de seus dados em determinadas circunstancias.", p10Port: "Portabilidade:", p10PortDesc: "solicitar a entrega de seus dados em formato estruturado e de uso comum.", p10Outro: "Para exercer qualquer um desses direitos, o usuario pode enviar sua solicitacao para", p10OutroEnd: ", indicando seu nome completo e o direito que deseja exercer. A DYNAMO respondera em um prazo maximo de trinta (30) dias uteis.",
    p11Title: "Legislacao aplicavel", p11Intro: "A presente politica de privacidade e regida pela legislacao da Republica Argentina, em particular:", p11AR: "Argentina:", p11ARDesc: "Lei 25.326 de Protecao de Dados Pessoais e suas normas regulamentares, incluindo as disposicoes da Agencia de Acesso a Informacao Publica (AAIP).", p11EU: "Uniao Europeia:", p11EUDesc: "para usuarios localizados em paises membros da UE ou do EEE, aplica-se adicionalmente o Regulamento Geral de Protecao de Dados (RGPD/GDPR - Regulamento UE 2016/679).", p11BR: "Brasil:", p11BRDesc: "para usuarios localizados no Brasil, aplica-se adicionalmente a Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018).",
    p12Title: "Atualizacoes desta politica", p12Body: "A DYNAMO reserva-se o direito de modificar esta politica de privacidade a qualquer momento. As modificacoes serao publicadas nesta pagina com indicacao da data de ultima atualizacao. Recomenda-se ao usuario revisar esta pagina periodicamente.",
    t1Title: "Aceitacao dos termos", t1Body: "Ao acessar, navegar e utilizar o site da DYNAMO (doravante, \"o Site\"), o usuario aceita ficar vinculado pelos presentes Termos de Servico. Se nao concordar com algum destes termos, devera abster-se de utilizar o Site. O uso continuado do Site apos a publicacao de modificacoes nestes termos constitui a aceitacao de tais modificacoes.",
    t2Title: "Descricao do servico", t2P1: "O Site e um meio informativo sobre a DYNAMO e sua plataforma DYNAMO Journeys, uma solucao de orquestracao omnichannel projetada para operadoras de telecomunicacoes. Pelo Site, os usuarios podem obter informacoes sobre nossos produtos e servicos, acessar conteudo institucional e comercial, e entrar em contato com nossa equipe.", t2P2: "O Site nao constitui uma oferta de venda nem um compromisso contratual. As condicoes especificas de prestacao de servicos sao regidas pelos contratos individuais celebrados com cada cliente.",
    t3Title: "Propriedade intelectual", t3P1: "Todo o conteudo do Site, incluindo mas nao limitado a textos, graficos, imagens, logotipos, icones, design, estrutura de navegacao, codigo-fonte, software e compilacoes de dados, e propriedade exclusiva da DYNAMO ou de seus licenciantes e esta protegido pelas leis de propriedade intelectual aplicaveis.", t3P2: "A marca DYNAMO, o logotipo da DYNAMO e todas as marcas relacionadas sao marcas registradas ou de uso exclusivo da DYNAMO. Sua reproducao, distribuicao, comunicacao publica ou transformacao sem autorizacao previa e por escrito da DYNAMO e proibida.",
    t4Title: "Uso permitido", t4Intro: "O usuario esta autorizado a utilizar o Site exclusivamente para os seguintes fins:", t4A: "Navegacao informativa sobre os produtos e servicos da DYNAMO.", t4B: "Contato comercial atraves dos formularios e canais habilitados no Site.", t4C: "Download de materiais publicos expressamente disponibilizados para tal fim (brochures, documentos tecnicos, etc.).",
    t5Title: "Uso proibido", t5Intro: "Sem a autorizacao previa e por escrito da DYNAMO, e expressamente proibido:", t5A: "Realizar scraping, crawling ou extracao automatizada de conteudo do Site por meio de bots, spiders ou outras ferramentas automatizadas.", t5B: "Realizar engenharia reversa, descompilar ou tentar obter o codigo-fonte do Site ou de qualquer tecnologia subjacente.", t5C: "Utilizar o conteudo do Site com fins competitivos ou para desenvolver produtos ou servicos similares aos da DYNAMO.", t5D: "Reproduzir, duplicar, copiar, distribuir ou explorar qualquer parte do Site com fins comerciais sem autorizacao.", t5E: "Tentar acessar areas restritas do Site ou violar as medidas de seguranca implementadas.",
    t6Title: "Formularios e dados enviados", t6Body: "As informacoes fornecidas pelo usuario atraves dos formularios do Site serao tratadas em conformidade com nossa Politica de Privacidade. O usuario declara que os dados fornecidos sao veridicos, atuais e completos, e compromete-se a mante-los atualizados.",
    t7Title: "Links para sites de terceiros", t7Body: "O Site pode conter links para sites de terceiros. Esses links sao fornecidos exclusivamente para conveniencia do usuario. A DYNAMO nao controla, endossa nem assume qualquer responsabilidade pelo conteudo, politicas de privacidade ou praticas de sites de terceiros. O acesso a tais sites e feito sob responsabilidade exclusiva do usuario.",
    t8Title: "Limitacao de responsabilidade", t8Intro: "O Site e fornecido \"tal como esta\" e \"conforme disponibilidade\". A DYNAMO nao garante que o Site estara disponivel de forma ininterrupta, livre de erros ou seguro em todos os momentos. Na medida permitida pela lei aplicavel, a DYNAMO nao sera responsavel por:", t8A: "Danos diretos, indiretos, incidentais ou consequentes decorrentes do uso ou da impossibilidade de uso do Site.", t8B: "Interrupcoes temporarias do servico por manutencao, atualizacoes ou causas de forca maior.", t8C: "Imprecisoes ou omissoes no conteudo publicado no Site.",
    t9Title: "Lei aplicavel e jurisdicao", t9Body: "Os presentes Termos de Servico sao regidos pelas leis da Republica Argentina. Para qualquer controversia decorrente do uso do Site, as partes se submetem a jurisdicao exclusiva dos Tribunais Ordinarios da Cidade Autonoma de Buenos Aires, Republica Argentina, renunciando a qualquer outro foro que possa corresponder-lhes.",
    t10Title: "Contato", t10Body: "Para consultas relacionadas a estes Termos de Servico, o usuario pode entrar em contato pelo",
    c1Title: "Marco regulatorio geral", c1Body: "A DYNAMO mantem um programa de compliance projetado para assegurar o cumprimento das regulamentacoes de protecao de dados e telecomunicacoes em todas as jurisdicoes onde operamos. Nossa abordagem se adapta aos requisitos especificos de cada pais, garantindo que as operacoes de processamento de dados cumpram a normativa local aplicavel.",
    c2Title: "Regulamentacao por jurisdicao", c2Intro: "A DYNAMO cumpre as seguintes regulamentacoes, conforme a jurisdicao:", c2AR: "Argentina:", c2ARDesc: "Lei 25.326 de Protecao de Dados Pessoais e suas normas regulamentares, Disposicoes da AAIP, e regulamentacoes de telecomunicacoes aplicaveis (ENACOM).", c2EU: "Europa (Espanha, Grecia e outros):", c2EUDesc: "Regulamento Geral de Protecao de Dados (RGPD/GDPR - Regulamento UE 2016/679), incluindo requisitos de base legal para tratamento, direitos dos titulares, avaliacoes de impacto (DPIA) e notificacao de violacoes de dados.", c2BR: "Brasil:", c2BRDesc: "Lei Geral de Protecao de Dados (LGPD - Lei 13.709/2018), incluindo requisitos de consentimento, direitos dos titulares e obrigacoes de reporte perante a ANPD.", c2AF: "Africa:", c2AFDesc: "leis locais de protecao de dados aplicaveis em cada pais de operacao, incluindo a Data Protection Act de Gana (DPA 2012, Act 843), a POPIA da Africa do Sul, e regulamentacoes equivalentes nas demais jurisdicoes onde operamos.",
    c3Title: "Seguranca da informacao", c3Intro: "A DYNAMO implementa um marco integral de seguranca da informacao que inclui:", c3A: "Criptografia de dados em transito (TLS) e em repouso.", c3B: "Controles de acesso baseados em funcoes com autenticacao reforçada.", c3C: "Monitoramento continuo de sistemas e deteccao de anomalias.", c3D: "Auditorias periodicas de seguranca, internas e externas.", c3E: "Capacitacao continua do pessoal em seguranca da informacao e protecao de dados.",
    c4Title: "Tratamento de dados de operadoras Telco", c4Intro: "No ambito da prestacao de servicos a operadoras de telecomunicacoes, a DYNAMO atua como operadora de tratamento (data processor) dos dados de assinantes. Isso significa que:", c4A: "Os dados de assinantes sao processados exclusivamente sob as instrucoes da operadora Telco (controladora de dados / data controller).", c4B: "A DYNAMO nao utiliza os dados de assinantes para fins proprios nem os compartilha com terceiros, salvo instrucao expressa da operadora.", c4C: "Ao final da relacao contratual, os dados sao devolvidos ou eliminados de forma segura, conforme acordado com cada operadora.",
    c5Title: "Politica sobre inteligencia artificial e LLMs", c5Intro: "A DYNAMO mantem uma politica rigorosa em relacao ao uso de ferramentas de inteligencia artificial e modelos de linguagem (LLMs):", c5A: "Informacoes confidenciais de clientes, operadoras ou assinantes nao sao carregadas em ferramentas publicas de IA ou LLMs.", c5B: "O uso de ferramentas de IA para tarefas internas e regulamentado e sujeito a aprovacao, garantindo que a confidencialidade dos dados nao seja comprometida.", c5C: "Todo o pessoal recebe capacitacao sobre o uso responsavel de ferramentas de IA no ambiente corporativo.",
    c6Title: "Gestao de incidentes", c6Intro: "A DYNAMO conta com um plano de resposta a incidentes de seguranca que contempla:", c6A: "Notificacao aos clientes afetados sem demora indevida apos a deteccao de um incidente de seguranca que afete dados pessoais.", c6B: "Notificacao as autoridades de protecao de dados competentes dentro dos prazos legais estabelecidos (72 horas conforme GDPR, quando aplicavel).", c6C: "Investigacao, contencao e remediacao do incidente.", c6D: "Documentacao completa do incidente, incluindo causas, impacto e medidas corretivas adotadas.",
    c7Title: "Contato de compliance", c7Body: "Para consultas, relatos ou solicitacoes relacionadas a compliance, protecao de dados ou seguranca da informacao, o usuario pode entrar em contato com nossa equipe pelo",
  },
} as const;

type Locale = keyof typeof texts;
function tx(locale: string) { return texts[(locale as Locale)] || texts.es; }

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const i = tx(locale);
  return {
    title: i.metaLegalTitle,
    description: i.metaDesc,
    alternates: getAlternates('/legal'),
  };
}

function getTocItems(locale: string) {
  const i = tx(locale);
  return [
    { id: "privacidad", label: i.tocPrivacy, icon: Shield },
    { id: "terminos", label: i.tocTerms, icon: FileText },
    { id: "compliance", label: i.tocCompliance, icon: Scale },
  ];
}

/* ------------------------------------------------------------------ */
/*  Reusable sub-components                                           */
/* ------------------------------------------------------------------ */

function SectionHeading({
  id,
  icon: Icon,
  title,
}: {
  id: string;
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div id={id} className="scroll-mt-32 flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
        <Icon className="w-5 h-5 text-purple-400" />
      </div>
      <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">
        {title}
      </h2>
    </div>
  );
}

function Clause({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <h3 className="font-heading text-lg font-semibold text-white mb-3">
        {number}. {title}
      </h3>
      <div className="space-y-3 text-white/60 leading-relaxed text-sm">
        {children}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                              */
/* ------------------------------------------------------------------ */

export default async function LegalPage() {
  const locale = await getLocale();
  const i = tx(locale);
  const tocItems = getTocItems(locale);

  return (
    <div className="min-h-screen">
      {/* ---- Hero ---- */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight">
                Legal
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                {i.heroDesc}
              </p>

              {/* Quick-nav pills */}
              <div className="flex flex-wrap gap-3 mt-8">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="px-4 py-2 text-sm bg-white/5 border border-white/10 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ---- Main content with sticky sidebar ---- */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-16">
            {/* Sidebar TOC (desktop) */}
            <aside className="hidden lg:block">
              <nav className="sticky top-32 space-y-1">
                {tocItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-white/50 rounded-lg hover:bg-white/5 hover:text-white/80 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-purple-400/60" />
                      {item.label}
                    </a>
                  );
                })}
                <div className="border-t border-white/[0.06] my-4" />
                <p className="px-3 text-xs text-white/30">
                  {i.lastUpdate}
                  <br />
                  {i.lastUpdateDate}
                </p>
              </nav>
            </aside>

            {/* Content */}
            <div className="max-w-3xl">
              {/* ============================================================ */}
              {/*  SECCION 1 — POLITICA DE PRIVACIDAD                          */}
              {/* ============================================================ */}
              <RevealOnScroll>
                <div className="mb-24">
                  <SectionHeading
                    id="privacidad"
                    icon={Shield}
                    title={i.tocPrivacy}
                  />

                  <p className="text-white/40 text-xs mb-8">
                    {i.lastUpdateFull}
                  </p>

                  <Clause number="1" title={i.p1Title}>
                    <p>
                      {i.p1Body}{" "}
                      <a href="mailto:legal@dynamo.tech" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">legal@dynamo.tech</a>.
                    </p>
                  </Clause>

                  <Clause number="2" title={i.p2Title}>
                    <p>{i.p2Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p2Nav}</span>{" "}{i.p2NavDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p2Form}</span>{" "}{i.p2FormDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p2Wa}</span>{" "}{i.p2WaDesc}</li>
                    </ul>
                  </Clause>

                  <Clause number="3" title={i.p3Title}>
                    <p>{i.p3Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>{i.p3A}</li><li>{i.p3B}</li><li>{i.p3C}</li><li>{i.p3D}</li>
                    </ul>
                  </Clause>
                  <Clause number="4" title={i.p4Title}>
                    <p>{i.p4Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p4Consent}</span>{" "}{i.p4ConsentDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p4Legit}</span>{" "}{i.p4LegitDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p4Precontract}</span>{" "}{i.p4PrecontractDesc}</li>
                    </ul>
                  </Clause>
                  <Clause number="5" title={i.p5Title}>
                    <p>{i.p5Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p5Essential}</span>{" "}{i.p5EssentialDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p5Consent}</span>{" "}{i.p5ConsentDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p5Analytics}</span>{" "}{i.p5AnalyticsDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p5Functional}</span>{" "}{i.p5FunctionalDesc}</li>
                    </ul>
                    <p className="mt-3">{i.p5Manage}</p>
                  </Clause>
                  <Clause number="6" title={i.p6Title}>
                    <p>{i.p6Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p6GA}</span>{" "}{i.p6GADesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p6Vercel}</span>{" "}{i.p6VercelDesc}</li>
                    </ul>
                    <p className="mt-3">{i.p6Outro}</p>
                  </Clause>
                  <Clause number="7" title={i.p7Title}><p>{i.p7Body}</p></Clause>
                  <Clause number="8" title={i.p8Title}>
                    <p>{i.p8Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>{i.p8A}</li><li>{i.p8B}</li><li>{i.p8C}</li><li>{i.p8D}</li>
                    </ul>
                  </Clause>
                  <Clause number="9" title={i.p9Title}>
                    <p>{i.p9Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p9Form}</span>{" "}{i.p9FormDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p9Cookies}</span>{" "}{i.p9CookiesDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p9Logs}</span>{" "}{i.p9LogsDesc}</li>
                    </ul>
                  </Clause>
                  <Clause number="10" title={i.p10Title}>
                    <p>{i.p10Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p10Access}</span>{" "}{i.p10AccessDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p10Rectify}</span>{" "}{i.p10RectifyDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p10Delete}</span>{" "}{i.p10DeleteDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p10Object}</span>{" "}{i.p10ObjectDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p10Port}</span>{" "}{i.p10PortDesc}</li>
                    </ul>
                    <p className="mt-3">{i.p10Outro}{" "}<a href="mailto:legal@dynamo.tech" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">legal@dynamo.tech</a>{i.p10OutroEnd}</p>
                  </Clause>
                  <Clause number="11" title={i.p11Title}>
                    <p>{i.p11Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li><span className="text-white/80 font-medium">{i.p11AR}</span>{" "}{i.p11ARDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p11EU}</span>{" "}{i.p11EUDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.p11BR}</span>{" "}{i.p11BRDesc}</li>
                    </ul>
                  </Clause>
                  <Clause number="12" title={i.p12Title}><p>{i.p12Body}</p></Clause>
                </div>
              </RevealOnScroll>

              {/* TERMS OF SERVICE */}
              <RevealOnScroll>
                <div className="mb-24">
                  <SectionHeading id="terminos" icon={FileText} title={i.tocTerms} />
                  <p className="text-white/40 text-xs mb-8">{i.lastUpdateFull}</p>
                  <Clause number="1" title={i.t1Title}><p>{i.t1Body}</p></Clause>
                  <Clause number="2" title={i.t2Title}><p>{i.t2P1}</p><p className="mt-3">{i.t2P2}</p></Clause>
                  <Clause number="3" title={i.t3Title}><p>{i.t3P1}</p><p className="mt-3">{i.t3P2}</p></Clause>
                  <Clause number="4" title={i.t4Title}>
                    <p>{i.t4Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.t4A}</li><li>{i.t4B}</li><li>{i.t4C}</li></ul>
                  </Clause>
                  <Clause number="5" title={i.t5Title}>
                    <p>{i.t5Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.t5A}</li><li>{i.t5B}</li><li>{i.t5C}</li><li>{i.t5D}</li><li>{i.t5E}</li></ul>
                  </Clause>
                  <Clause number="6" title={i.t6Title}><p>{i.t6Body}</p></Clause>
                  <Clause number="7" title={i.t7Title}><p>{i.t7Body}</p></Clause>
                  <Clause number="8" title={i.t8Title}>
                    <p>{i.t8Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.t8A}</li><li>{i.t8B}</li><li>{i.t8C}</li></ul>
                  </Clause>
                  <Clause number="9" title={i.t9Title}><p>{i.t9Body}</p></Clause>
                  <Clause number="10" title={i.t10Title}>
                    <p>{i.t10Body}{" "}<a href="mailto:legal@dynamo.tech" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">legal@dynamo.tech</a>.</p>
                  </Clause>
                </div>
              </RevealOnScroll>

              {/* COMPLIANCE */}
              <RevealOnScroll>
                <div className="mb-24">
                  <SectionHeading id="compliance" icon={Scale} title={i.tocCompliance} />
                  <p className="text-white/40 text-xs mb-8">{i.lastUpdateFull}</p>
                  <Clause number="1" title={i.c1Title}><p>{i.c1Body}</p></Clause>
                  <Clause number="2" title={i.c2Title}>
                    <p>{i.c2Intro}</p>
                    <ul className="list-disc pl-6 space-y-3 mt-2">
                      <li><span className="text-white/80 font-medium">{i.c2AR}</span>{" "}{i.c2ARDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.c2EU}</span>{" "}{i.c2EUDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.c2BR}</span>{" "}{i.c2BRDesc}</li>
                      <li><span className="text-white/80 font-medium">{i.c2AF}</span>{" "}{i.c2AFDesc}</li>
                    </ul>
                  </Clause>
                  <Clause number="3" title={i.c3Title}>
                    <p>{i.c3Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.c3A}</li><li>{i.c3B}</li><li>{i.c3C}</li><li>{i.c3D}</li><li>{i.c3E}</li></ul>
                  </Clause>
                  <Clause number="4" title={i.c4Title}>
                    <p>{i.c4Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.c4A}</li><li>{i.c4B}</li><li>{i.c4C}</li></ul>
                  </Clause>
                  <Clause number="5" title={i.c5Title}>
                    <p>{i.c5Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.c5A}</li><li>{i.c5B}</li><li>{i.c5C}</li></ul>
                  </Clause>
                  <Clause number="6" title={i.c6Title}>
                    <p>{i.c6Intro}</p>
                    <ul className="list-disc pl-6 space-y-2 mt-2"><li>{i.c6A}</li><li>{i.c6B}</li><li>{i.c6C}</li><li>{i.c6D}</li></ul>
                  </Clause>
                  <Clause number="7" title={i.c7Title}>
                    <p>{i.c7Body}{" "}<a href="mailto:compliance@dynamo.tech" className="text-purple-400 hover:text-purple-300 underline underline-offset-2">compliance@dynamo.tech</a>.</p>
                  </Clause>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ---- CTA ---- */}
      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
                {i.ctaTitle}
              </h2>
              <p className="text-white/60 max-w-xl mx-auto mb-8">
                {i.ctaDesc}
              </p>
              <Link
                href={`/${locale}/contacto`}
                className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                {i.ctaButton}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
