import type { Metadata } from "next";
import { getAlternates } from '@/lib/seo';
import { getLocale } from "next-intl/server";
import {
  MapPin,
  Globe,
  Code2,
  BrainCircuit,
  Briefcase,
  Rocket,
  DollarSign,
  Heart,
  ArrowRight,
  Mail,
  Zap,
  Lightbulb,
  Target,
  Users,
  GraduationCap,
  Clock,
  Laptop,
  Trophy,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";

/* ─── i18n texts ─── */
const texts = {
  es: {
    metaTitle: "Carreras — Trabaja en DYNAMO",
    metaDesc: "Unete al equipo que transforma la comunicacion movil para Telcos globales. Posiciones abiertas en Product Management, Ingenieria y mas.",
    badge: "Estamos contratando",
    heroTitle1: "Construye el futuro de las",
    heroTitle2: "Telcos con nosotros",
    heroDesc: "Somos un equipo de +30 profesionales en +15 paises transformando como las Telcos se comunican con sus usuarios. Si te apasiona la tecnologia, la IA y los desafios a escala global, este es tu lugar.",
    viewPositions: "Ver posiciones abiertas",
    openPositionsCount: "2 posiciones abiertas",
    statProfessionals: "Profesionales",
    statCountries: "Paises",
    statUsersMonth: "Usuarios impactados/mes",
    statNps: "Satisfaccion interna",
    cultureTitle: "Nuestra cultura",
    cultureDesc: "No somos una corporacion. Somos un equipo agil donde cada persona tiene impacto real en el producto y en los resultados.",
    positionsTitle: "Posiciones abiertas",
    positionsDesc: "Buscamos personas que quieran resolver problemas complejos con tecnologia y tener impacto a escala global.",
    whatYouDo: "Que vas a hacer",
    whatWeLookFor: "Que buscamos",
    niceToHave: "Suma puntos si tienes",
    applyPosition: "Aplicar a esta posicion",
    emailSubjectApply: "Aplicacion",
    emailBodyApply: "Hola! Me interesa la posicion de",
    emailBodyCV: "Adjunto mi CV.",
    benefitsTitle: "Por que trabajar en DYNAMO",
    benefitsDesc: "No solo ofrecemos un trabajo — ofrecemos la oportunidad de construir tecnologia que impacta a millones de personas.",
    spontaneousTitle: "¿No encuentras tu rol ideal?",
    spontaneousDesc: "Siempre estamos buscando talento excepcional. Envianos tu CV y cuentanos que te apasiona — si hay match, te contactamos.",
    spontaneousButton: "Enviar aplicacion espontanea",
    spontaneousSubject: "Aplicacion espontanea",
    spontaneousBody: "Hola! Me gustaria formar parte del equipo de DYNAMO. Adjunto mi CV y una breve presentacion.",
    // Position 1 - PM
    pm_dept: "Producto",
    pm_location: "Remoto (LATAM)",
    pm_desc: "Lidera la evolucion de DYNAMO Journeys incorporando inteligencia artificial en cada capa de la plataforma. Vas a definir el roadmap de features AI-driven que transforman como las Telcos se comunican con +500M de usuarios.",
    pm_r1: "Definir y priorizar el roadmap de producto con foco en AI/ML",
    pm_r2: "Disenar features de segmentacion inteligente, triggers predictivos y optimizacion automatica de journeys",
    pm_r3: "Colaborar con Engineering, Data Science y los equipos de CVM de nuestros clientes Telco",
    pm_r4: "Analizar data de producto para identificar oportunidades de mejora y nuevos casos de uso",
    pm_r5: "Liderar discovery con clientes enterprise (Claro, Tigo, MTN, Altice) para validar hipotesis",
    pm_q1: "4+ anos como Product Manager en SaaS B2B, idealmente en Telco, AdTech o MarTech",
    pm_q2: "Experiencia practica con modelos de ML/AI aplicados a producto (no necesitas ser data scientist, pero si entender el stack)",
    pm_q3: "Track record de lanzamiento de features data-driven con impacto medible en KPIs",
    pm_q4: "Capacidad de comunicarte con C-levels de Telcos y equipos tecnicos por igual",
    pm_q5: "Ingles avanzado (clientes en Africa, Europa y LATAM)",
    pm_n1: "Experiencia con plataformas de campaign management o CVM",
    pm_n2: "Conocimiento de canales Telco (SAT Push, USSD, RCS)",
    pm_n3: "Background en analytics o data engineering",
    // Position 2 - Dev
    dev_dept: "Engineering",
    dev_location: "Remoto (LATAM)",
    dev_desc: "Construye la plataforma de orquestacion omnicanal que usan +70 Telcos globales. Vas a trabajar en un producto que procesa +500M de interacciones por mes, con desafios reales de escala, real-time processing y arquitectura distribuida.",
    dev_r1: "Disenar y desarrollar features end-to-end en nuestra plataforma SaaS (React/Next.js + Node.js + PostgreSQL)",
    dev_r2: "Implementar integraciones con infraestructura Telco: SMPP, APIs de WhatsApp/META, OTA, HLR",
    dev_r3: "Construir el journey builder visual, campaign manager y dashboards de analytics en tiempo real",
    dev_r4: "Optimizar performance y escalabilidad para millones de transacciones diarias",
    dev_r5: "Participar en decisiones de arquitectura y mentorear developers junior",
    dev_q1: "5+ anos de experiencia fullstack con React/Next.js y Node.js",
    dev_q2: "Experiencia solida con bases de datos relacionales (PostgreSQL) y caching (Redis)",
    dev_q3: "Conocimiento de arquitecturas event-driven, message queues (RabbitMQ/Kafka) y microservicios",
    dev_q4: "Experiencia con cloud (AWS o GCP), CI/CD y containerizacion (Docker)",
    dev_q5: "Capacidad de trabajar de forma autonoma en un equipo distribuido",
    dev_n1: "Experiencia con protocolos Telco (SMPP, SS7, Diameter)",
    dev_n2: "Conocimiento de real-time data processing",
    dev_n3: "Experiencia con TypeScript y testing automatizado",
    // Benefits
    b1_title: "100% Remoto",
    b1_desc: "Trabaja desde donde quieras. Equipo distribuido en +10 paises.",
    b2_title: "Compensacion competitiva",
    b2_desc: "Salario en USD/EUR acorde al mercado internacional. Revisiones semestrales.",
    b3_title: "Impacto global",
    b3_desc: "Tu trabajo llega a +500M de usuarios en LATAM, Africa y Europa.",
    b4_title: "Crecimiento acelerado",
    b4_desc: "Startup en expansion con clientes enterprise. Tu carrera crece con la empresa.",
    b5_title: "Aprendizaje continuo",
    b5_desc: "Budget para capacitacion, conferencias y certificaciones.",
    b6_title: "Flexibilidad real",
    b6_desc: "Horarios flexibles. Lo que importa son los resultados, no las horas.",
    b7_title: "Cultura humana",
    b7_desc: "Equipo chico donde tu voz importa. +9 NPS interno por 5 anos consecutivos.",
    b8_title: "Tecnologia de punta",
    b8_desc: "Trabaja con AI, real-time data, Telco protocols y arquitecturas a escala.",
    // Values
    v1_title: "Innovacion",
    v1_desc: "Empujamos los limites de lo posible. Si algo no existe, lo construimos.",
    v2_title: "Orientacion a resultados",
    v2_desc: "Medimos todo. Cada feature que lanzamos mueve un KPI.",
    v3_title: "Colaboracion",
    v3_desc: "Equipo chico, impacto grande. Cada persona es clave.",
    v4_title: "Agilidad",
    v4_desc: "Decisiones rapidas, iteraciones cortas, deploy continuo.",
  },
  en: {
    metaTitle: "Careers — Join DYNAMO",
    metaDesc: "Join the team transforming mobile communication for global Telcos. Open positions in Product Management, Engineering, and more.",
    badge: "We're hiring",
    heroTitle1: "Build the future of",
    heroTitle2: "Telcos with us",
    heroDesc: "We are a team of 30+ professionals across 15+ countries transforming how Telcos communicate with their users. If you are passionate about technology, AI, and global-scale challenges, this is your place.",
    viewPositions: "View open positions",
    openPositionsCount: "2 open positions",
    statProfessionals: "Professionals",
    statCountries: "Countries",
    statUsersMonth: "Users impacted/month",
    statNps: "Internal satisfaction",
    cultureTitle: "Our culture",
    cultureDesc: "We are not a corporation. We are an agile team where every person has real impact on the product and results.",
    positionsTitle: "Open positions",
    positionsDesc: "We are looking for people who want to solve complex problems with technology and have global-scale impact.",
    whatYouDo: "What you will do",
    whatWeLookFor: "What we look for",
    niceToHave: "Bonus points if you have",
    applyPosition: "Apply for this position",
    emailSubjectApply: "Application",
    emailBodyApply: "Hi! I'm interested in the position of",
    emailBodyCV: "I've attached my CV.",
    benefitsTitle: "Why work at DYNAMO",
    benefitsDesc: "We don't just offer a job — we offer the opportunity to build technology that impacts millions of people.",
    spontaneousTitle: "Don't see your ideal role?",
    spontaneousDesc: "We are always looking for exceptional talent. Send us your CV and tell us what drives you — if there is a match, we will reach out.",
    spontaneousButton: "Send spontaneous application",
    spontaneousSubject: "Spontaneous application",
    spontaneousBody: "Hi! I'd love to be part of the DYNAMO team. I've attached my CV and a brief introduction.",
    pm_dept: "Product",
    pm_location: "Remote (LATAM)",
    pm_desc: "Lead the evolution of DYNAMO Journeys by integrating AI into every layer of the platform. You will define the roadmap of AI-driven features that transform how Telcos communicate with 500M+ users.",
    pm_r1: "Define and prioritize the product roadmap focused on AI/ML",
    pm_r2: "Design intelligent segmentation features, predictive triggers, and automatic journey optimization",
    pm_r3: "Collaborate with Engineering, Data Science, and CVM teams at our Telco clients",
    pm_r4: "Analyze product data to identify improvement opportunities and new use cases",
    pm_r5: "Lead discovery with enterprise clients (Claro, Tigo, MTN, Altice) to validate hypotheses",
    pm_q1: "4+ years as Product Manager in B2B SaaS, ideally in Telco, AdTech, or MarTech",
    pm_q2: "Hands-on experience with ML/AI models applied to product (you don't need to be a data scientist, but must understand the stack)",
    pm_q3: "Track record of launching data-driven features with measurable KPI impact",
    pm_q4: "Ability to communicate with Telco C-levels and technical teams alike",
    pm_q5: "Advanced English (clients in Africa, Europe, and LATAM)",
    pm_n1: "Experience with campaign management or CVM platforms",
    pm_n2: "Knowledge of Telco channels (SAT Push, USSD, RCS)",
    pm_n3: "Background in analytics or data engineering",
    dev_dept: "Engineering",
    dev_location: "Remote (LATAM)",
    dev_desc: "Build the omnichannel orchestration platform used by 70+ global Telcos. You will work on a product processing 500M+ interactions per month, with real-world challenges in scale, real-time processing, and distributed architecture.",
    dev_r1: "Design and develop end-to-end features on our SaaS platform (React/Next.js + Node.js + PostgreSQL)",
    dev_r2: "Implement integrations with Telco infrastructure: SMPP, WhatsApp/META APIs, OTA, HLR",
    dev_r3: "Build the visual journey builder, campaign manager, and real-time analytics dashboards",
    dev_r4: "Optimize performance and scalability for millions of daily transactions",
    dev_r5: "Participate in architecture decisions and mentor junior developers",
    dev_q1: "5+ years of fullstack experience with React/Next.js and Node.js",
    dev_q2: "Solid experience with relational databases (PostgreSQL) and caching (Redis)",
    dev_q3: "Knowledge of event-driven architectures, message queues (RabbitMQ/Kafka), and microservices",
    dev_q4: "Experience with cloud (AWS or GCP), CI/CD, and containerization (Docker)",
    dev_q5: "Ability to work autonomously in a distributed team",
    dev_n1: "Experience with Telco protocols (SMPP, SS7, Diameter)",
    dev_n2: "Knowledge of real-time data processing",
    dev_n3: "Experience with TypeScript and automated testing",
    b1_title: "100% Remote",
    b1_desc: "Work from anywhere. Distributed team across 10+ countries.",
    b2_title: "Competitive compensation",
    b2_desc: "Salary in USD/EUR aligned with the international market. Biannual reviews.",
    b3_title: "Global impact",
    b3_desc: "Your work reaches 500M+ users in LATAM, Africa, and Europe.",
    b4_title: "Accelerated growth",
    b4_desc: "Expanding startup with enterprise clients. Your career grows with the company.",
    b5_title: "Continuous learning",
    b5_desc: "Budget for training, conferences, and certifications.",
    b6_title: "Real flexibility",
    b6_desc: "Flexible schedules. What matters is results, not hours.",
    b7_title: "Human culture",
    b7_desc: "Small team where your voice matters. 9+ internal NPS for 5 consecutive years.",
    b8_title: "Cutting-edge technology",
    b8_desc: "Work with AI, real-time data, Telco protocols, and architectures at scale.",
    v1_title: "Innovation",
    v1_desc: "We push the limits of what's possible. If it doesn't exist, we build it.",
    v2_title: "Results-oriented",
    v2_desc: "We measure everything. Every feature we ship moves a KPI.",
    v3_title: "Collaboration",
    v3_desc: "Small team, big impact. Every person is key.",
    v4_title: "Agility",
    v4_desc: "Fast decisions, short iterations, continuous deployment.",
  },
  fr: {
    metaTitle: "Carrieres — Rejoignez DYNAMO",
    metaDesc: "Rejoignez l'equipe qui transforme la communication mobile pour les Telcos mondiaux. Postes ouverts en Product Management, Ingenierie et plus.",
    badge: "Nous recrutons",
    heroTitle1: "Construisez l'avenir des",
    heroTitle2: "Telcos avec nous",
    heroDesc: "Nous sommes une equipe de plus de 30 professionnels dans plus de 15 pays, transformant la facon dont les Telcos communiquent avec leurs utilisateurs. Si vous etes passionne par la technologie, l'IA et les defis a l'echelle mondiale, c'est votre place.",
    viewPositions: "Voir les postes ouverts",
    openPositionsCount: "2 postes ouverts",
    statProfessionals: "Professionnels",
    statCountries: "Pays",
    statUsersMonth: "Utilisateurs impactes/mois",
    statNps: "Satisfaction interne",
    cultureTitle: "Notre culture",
    cultureDesc: "Nous ne sommes pas une corporation. Nous sommes une equipe agile ou chaque personne a un impact reel sur le produit et les resultats.",
    positionsTitle: "Postes ouverts",
    positionsDesc: "Nous recherchons des personnes qui veulent resoudre des problemes complexes avec la technologie et avoir un impact a l'echelle mondiale.",
    whatYouDo: "Ce que vous ferez",
    whatWeLookFor: "Ce que nous recherchons",
    niceToHave: "Un plus si vous avez",
    applyPosition: "Postuler a ce poste",
    emailSubjectApply: "Candidature",
    emailBodyApply: "Bonjour ! Je suis interesse(e) par le poste de",
    emailBodyCV: "Je joins mon CV.",
    benefitsTitle: "Pourquoi travailler chez DYNAMO",
    benefitsDesc: "Nous n'offrons pas seulement un emploi — nous offrons l'opportunite de construire une technologie qui impacte des millions de personnes.",
    spontaneousTitle: "Vous ne trouvez pas votre role ideal\u00a0?",
    spontaneousDesc: "Nous sommes toujours a la recherche de talents exceptionnels. Envoyez-nous votre CV et dites-nous ce qui vous passionne — s'il y a un match, nous vous contacterons.",
    spontaneousButton: "Envoyer une candidature spontanee",
    spontaneousSubject: "Candidature spontanee",
    spontaneousBody: "Bonjour ! J'aimerais faire partie de l'equipe DYNAMO. Je joins mon CV et une breve presentation.",
    pm_dept: "Produit",
    pm_location: "Teletravail (LATAM)",
    pm_desc: "Dirigez l'evolution de DYNAMO Journeys en integrant l'intelligence artificielle dans chaque couche de la plateforme. Vous definirez la roadmap de features IA qui transforment la communication des Telcos avec +500M d'utilisateurs.",
    pm_r1: "Definir et prioriser la roadmap produit avec un focus AI/ML",
    pm_r2: "Concevoir des features de segmentation intelligente, triggers predictifs et optimisation automatique de journeys",
    pm_r3: "Collaborer avec Engineering, Data Science et les equipes CVM de nos clients Telco",
    pm_r4: "Analyser les donnees produit pour identifier des opportunites d'amelioration et de nouveaux cas d'usage",
    pm_r5: "Mener des discoveries avec des clients enterprise (Claro, Tigo, MTN, Altice) pour valider des hypotheses",
    pm_q1: "4+ ans comme Product Manager en SaaS B2B, idealement en Telco, AdTech ou MarTech",
    pm_q2: "Experience pratique avec des modeles ML/IA appliques au produit (pas besoin d'etre data scientist, mais comprendre le stack)",
    pm_q3: "Track record de lancement de features data-driven avec impact mesurable sur les KPIs",
    pm_q4: "Capacite a communiquer avec les C-levels des Telcos et les equipes techniques",
    pm_q5: "Anglais avance (clients en Afrique, Europe et LATAM)",
    pm_n1: "Experience avec des plateformes de campaign management ou CVM",
    pm_n2: "Connaissance des canaux Telco (SAT Push, USSD, RCS)",
    pm_n3: "Background en analytics ou data engineering",
    dev_dept: "Engineering",
    dev_location: "Teletravail (LATAM)",
    dev_desc: "Construisez la plateforme d'orchestration omnicanale utilisee par +70 Telcos mondiales. Vous travaillerez sur un produit traitant +500M d'interactions par mois, avec des defis reels d'echelle, de traitement en temps reel et d'architecture distribuee.",
    dev_r1: "Concevoir et developper des features end-to-end sur notre plateforme SaaS (React/Next.js + Node.js + PostgreSQL)",
    dev_r2: "Implementer des integrations avec l'infrastructure Telco: SMPP, APIs WhatsApp/META, OTA, HLR",
    dev_r3: "Construire le journey builder visuel, le campaign manager et les dashboards analytics en temps reel",
    dev_r4: "Optimiser la performance et la scalabilite pour des millions de transactions quotidiennes",
    dev_r5: "Participer aux decisions d'architecture et mentorer les developpeurs juniors",
    dev_q1: "5+ ans d'experience fullstack avec React/Next.js et Node.js",
    dev_q2: "Experience solide avec les bases de donnees relationnelles (PostgreSQL) et le caching (Redis)",
    dev_q3: "Connaissance des architectures event-driven, message queues (RabbitMQ/Kafka) et microservices",
    dev_q4: "Experience avec le cloud (AWS ou GCP), CI/CD et la containerisation (Docker)",
    dev_q5: "Capacite a travailler de facon autonome dans une equipe distribuee",
    dev_n1: "Experience avec les protocoles Telco (SMPP, SS7, Diameter)",
    dev_n2: "Connaissance du real-time data processing",
    dev_n3: "Experience avec TypeScript et le testing automatise",
    b1_title: "100% Teletravail",
    b1_desc: "Travaillez d'ou vous voulez. Equipe distribuee dans +10 pays.",
    b2_title: "Remuneration competitive",
    b2_desc: "Salaire en USD/EUR aligne sur le marche international. Revisions semestrielles.",
    b3_title: "Impact mondial",
    b3_desc: "Votre travail touche +500M d'utilisateurs en LATAM, Afrique et Europe.",
    b4_title: "Croissance acceleree",
    b4_desc: "Startup en expansion avec des clients enterprise. Votre carriere evolue avec l'entreprise.",
    b5_title: "Apprentissage continu",
    b5_desc: "Budget pour la formation, conferences et certifications.",
    b6_title: "Flexibilite reelle",
    b6_desc: "Horaires flexibles. Ce qui compte, ce sont les resultats, pas les heures.",
    b7_title: "Culture humaine",
    b7_desc: "Petite equipe ou votre voix compte. +9 NPS interne pendant 5 annees consecutives.",
    b8_title: "Technologie de pointe",
    b8_desc: "Travaillez avec l'IA, le real-time data, les protocoles Telco et des architectures a l'echelle.",
    v1_title: "Innovation",
    v1_desc: "Nous repoussons les limites du possible. Si ca n'existe pas, nous le construisons.",
    v2_title: "Orientation resultats",
    v2_desc: "Nous mesurons tout. Chaque feature lancee fait bouger un KPI.",
    v3_title: "Collaboration",
    v3_desc: "Petite equipe, grand impact. Chaque personne est cle.",
    v4_title: "Agilite",
    v4_desc: "Decisions rapides, iterations courtes, deploiement continu.",
  },
  pt: {
    metaTitle: "Carreiras — Junte-se a DYNAMO",
    metaDesc: "Junte-se ao time que transforma a comunicacao movel para Telcos globais. Vagas abertas em Product Management, Engenharia e mais.",
    badge: "Estamos contratando",
    heroTitle1: "Construa o futuro das",
    heroTitle2: "Telcos conosco",
    heroDesc: "Somos um time de +30 profissionais em +15 paises transformando como as Telcos se comunicam com seus usuarios. Se voce e apaixonado por tecnologia, IA e desafios em escala global, este e o seu lugar.",
    viewPositions: "Ver vagas abertas",
    openPositionsCount: "2 vagas abertas",
    statProfessionals: "Profissionais",
    statCountries: "Paises",
    statUsersMonth: "Usuarios impactados/mes",
    statNps: "Satisfacao interna",
    cultureTitle: "Nossa cultura",
    cultureDesc: "Nao somos uma corporacao. Somos um time agil onde cada pessoa tem impacto real no produto e nos resultados.",
    positionsTitle: "Vagas abertas",
    positionsDesc: "Buscamos pessoas que queiram resolver problemas complexos com tecnologia e ter impacto em escala global.",
    whatYouDo: "O que voce vai fazer",
    whatWeLookFor: "O que buscamos",
    niceToHave: "Pontos extras se voce tem",
    applyPosition: "Candidatar-se a esta vaga",
    emailSubjectApply: "Candidatura",
    emailBodyApply: "Ola! Tenho interesse na vaga de",
    emailBodyCV: "Segue meu CV em anexo.",
    benefitsTitle: "Por que trabalhar na DYNAMO",
    benefitsDesc: "Nao oferecemos apenas um emprego — oferecemos a oportunidade de construir tecnologia que impacta milhoes de pessoas.",
    spontaneousTitle: "Nao encontrou sua vaga ideal?",
    spontaneousDesc: "Estamos sempre em busca de talentos excepcionais. Envie seu CV e conte o que te motiva — se houver match, entraremos em contato.",
    spontaneousButton: "Enviar candidatura espontanea",
    spontaneousSubject: "Candidatura espontanea",
    spontaneousBody: "Ola! Gostaria de fazer parte do time da DYNAMO. Segue meu CV e uma breve apresentacao.",
    pm_dept: "Produto",
    pm_location: "Remoto (LATAM)",
    pm_desc: "Lidere a evolucao do DYNAMO Journeys integrando inteligencia artificial em cada camada da plataforma. Voce vai definir o roadmap de features IA que transformam como as Telcos se comunicam com +500M de usuarios.",
    pm_r1: "Definir e priorizar o roadmap de produto com foco em AI/ML",
    pm_r2: "Projetar features de segmentacao inteligente, triggers preditivos e otimizacao automatica de journeys",
    pm_r3: "Colaborar com Engineering, Data Science e as equipes de CVM dos nossos clientes Telco",
    pm_r4: "Analisar dados de produto para identificar oportunidades de melhoria e novos casos de uso",
    pm_r5: "Liderar discovery com clientes enterprise (Claro, Tigo, MTN, Altice) para validar hipoteses",
    pm_q1: "4+ anos como Product Manager em SaaS B2B, idealmente em Telco, AdTech ou MarTech",
    pm_q2: "Experiencia pratica com modelos de ML/IA aplicados a produto (nao precisa ser data scientist, mas entender o stack)",
    pm_q3: "Track record de lancamento de features data-driven com impacto mensuravel em KPIs",
    pm_q4: "Capacidade de se comunicar com C-levels de Telcos e equipes tecnicas igualmente",
    pm_q5: "Ingles avancado (clientes na Africa, Europa e LATAM)",
    pm_n1: "Experiencia com plataformas de campaign management ou CVM",
    pm_n2: "Conhecimento de canais Telco (SAT Push, USSD, RCS)",
    pm_n3: "Background em analytics ou data engineering",
    dev_dept: "Engineering",
    dev_location: "Remoto (LATAM)",
    dev_desc: "Construa a plataforma de orquestracao omnichannel usada por +70 Telcos globais. Voce vai trabalhar em um produto que processa +500M de interacoes por mes, com desafios reais de escala, processamento em tempo real e arquitetura distribuida.",
    dev_r1: "Projetar e desenvolver features end-to-end em nossa plataforma SaaS (React/Next.js + Node.js + PostgreSQL)",
    dev_r2: "Implementar integracoes com infraestrutura Telco: SMPP, APIs WhatsApp/META, OTA, HLR",
    dev_r3: "Construir o journey builder visual, campaign manager e dashboards de analytics em tempo real",
    dev_r4: "Otimizar performance e escalabilidade para milhoes de transacoes diarias",
    dev_r5: "Participar de decisoes de arquitetura e mentorar desenvolvedores juniores",
    dev_q1: "5+ anos de experiencia fullstack com React/Next.js e Node.js",
    dev_q2: "Experiencia solida com bancos de dados relacionais (PostgreSQL) e caching (Redis)",
    dev_q3: "Conhecimento de arquiteturas event-driven, message queues (RabbitMQ/Kafka) e microservicos",
    dev_q4: "Experiencia com cloud (AWS ou GCP), CI/CD e containerizacao (Docker)",
    dev_q5: "Capacidade de trabalhar de forma autonoma em um time distribuido",
    dev_n1: "Experiencia com protocolos Telco (SMPP, SS7, Diameter)",
    dev_n2: "Conhecimento de real-time data processing",
    dev_n3: "Experiencia com TypeScript e testes automatizados",
    b1_title: "100% Remoto",
    b1_desc: "Trabalhe de onde quiser. Time distribuido em +10 paises.",
    b2_title: "Remuneracao competitiva",
    b2_desc: "Salario em USD/EUR alinhado ao mercado internacional. Revisoes semestrais.",
    b3_title: "Impacto global",
    b3_desc: "Seu trabalho alcanca +500M de usuarios na LATAM, Africa e Europa.",
    b4_title: "Crescimento acelerado",
    b4_desc: "Startup em expansao com clientes enterprise. Sua carreira cresce com a empresa.",
    b5_title: "Aprendizado continuo",
    b5_desc: "Budget para capacitacao, conferencias e certificacoes.",
    b6_title: "Flexibilidade real",
    b6_desc: "Horarios flexiveis. O que importa sao os resultados, nao as horas.",
    b7_title: "Cultura humana",
    b7_desc: "Time pequeno onde sua voz importa. +9 NPS interno por 5 anos consecutivos.",
    b8_title: "Tecnologia de ponta",
    b8_desc: "Trabalhe com IA, real-time data, protocolos Telco e arquiteturas em escala.",
    v1_title: "Inovacao",
    v1_desc: "Empurramos os limites do possivel. Se algo nao existe, nos construimos.",
    v2_title: "Orientacao a resultados",
    v2_desc: "Medimos tudo. Cada feature que lancamos move um KPI.",
    v3_title: "Colaboracao",
    v3_desc: "Time pequeno, impacto grande. Cada pessoa e fundamental.",
    v4_title: "Agilidade",
    v4_desc: "Decisoes rapidas, iteracoes curtas, deploy continuo.",
  },
} as const;

type Locale = keyof typeof texts;
function tx(locale: string) { return texts[(locale as Locale)] || texts.es; }

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const i = tx(locale);
  return {
    title: i.metaTitle,
    description: i.metaDesc,
    alternates: getAlternates('/careers'),
  };
}

const APPLY_EMAIL = "rrhh@dynamo.tech";

export default async function CareersPage() {
  const locale = await getLocale();
  const i = tx(locale);

  const positions = [
    {
      icon: BrainCircuit,
      title: "Product Manager AI Driven",
      department: i.pm_dept,
      location: i.pm_location,
      type: "Full-time",
      gradient: "from-purple-500/20 to-indigo-500/10",
      borderHover: "hover:border-purple-500/40",
      iconColor: "text-purple-400",
      description: i.pm_desc,
      responsibilities: [i.pm_r1, i.pm_r2, i.pm_r3, i.pm_r4, i.pm_r5],
      requirements: [i.pm_q1, i.pm_q2, i.pm_q3, i.pm_q4, i.pm_q5],
      niceToHave: [i.pm_n1, i.pm_n2, i.pm_n3],
    },
    {
      icon: Code2,
      title: "Fullstack Sr Developer",
      department: i.dev_dept,
      location: i.dev_location,
      type: "Full-time",
      gradient: "from-lime/20 to-emerald-500/10",
      borderHover: "hover:border-lime/40",
      iconColor: "text-lime",
      description: i.dev_desc,
      responsibilities: [i.dev_r1, i.dev_r2, i.dev_r3, i.dev_r4, i.dev_r5],
      requirements: [i.dev_q1, i.dev_q2, i.dev_q3, i.dev_q4, i.dev_q5],
      niceToHave: [i.dev_n1, i.dev_n2, i.dev_n3],
    },
  ];

  const benefits = [
    { icon: Laptop, title: i.b1_title, desc: i.b1_desc },
    { icon: DollarSign, title: i.b2_title, desc: i.b2_desc },
    { icon: Globe, title: i.b3_title, desc: i.b3_desc },
    { icon: Rocket, title: i.b4_title, desc: i.b4_desc },
    { icon: GraduationCap, title: i.b5_title, desc: i.b5_desc },
    { icon: Clock, title: i.b6_title, desc: i.b6_desc },
    { icon: Heart, title: i.b7_title, desc: i.b7_desc },
    { icon: Trophy, title: i.b8_title, desc: i.b8_desc },
  ];

  const values = [
    { icon: Lightbulb, title: i.v1_title, desc: i.v1_desc },
    { icon: Target, title: i.v2_title, desc: i.v2_desc },
    { icon: Users, title: i.v3_title, desc: i.v3_desc },
    { icon: Zap, title: i.v4_title, desc: i.v4_desc },
  ];
  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-deep to-deep" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="max-w-3xl">
              <span className="inline-block px-3 py-1 text-xs font-medium tracking-wider uppercase text-lime border border-lime/30 rounded-full mb-6">
                {i.badge}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {i.heroTitle1}{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-lime">
                  {i.heroTitle2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-white/60 leading-relaxed max-w-2xl">
                {i.heroDesc}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="#positions"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  {i.viewPositions}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-3 text-white/60 text-sm">
                  <Sparkles className="w-4 h-4 text-lime" />
                  <span>{i.openPositionsCount}</span>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* WHY DYNAMO — Numbers strip */}
      <section className="border-t border-b border-white/[0.06] py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "+30", label: i.statProfessionals },
              { value: "+15", label: i.statCountries },
              { value: "+500M", label: i.statUsersMonth },
              { value: "+9 NPS", label: i.statNps },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-heading text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURE & VALUES */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">
              {i.cultureTitle}
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
              {i.cultureDesc}
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, idx) => (
              <RevealOnScroll key={value.title} delay={idx * 0.1}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 text-center h-full hover:border-purple-500/30 transition-colors">
                  <value.icon className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="font-heading font-semibold text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-white/60">{value.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* OPEN POSITIONS */}
      <section
        id="positions"
        className="py-16 lg:py-24 border-t border-white/[0.06]"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">
              {i.positionsTitle}
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
              {i.positionsDesc}
            </p>
          </RevealOnScroll>

          <div className="space-y-8 max-w-4xl mx-auto">
            {positions.map((pos, idx) => (
              <RevealOnScroll key={pos.title} delay={idx * 0.15}>
                <div
                  className={`group rounded-2xl border border-white/10 bg-gradient-to-br ${pos.gradient} p-8 lg:p-10 transition-all duration-300 ${pos.borderHover} hover:shadow-xl hover:shadow-purple-500/5`}
                >
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0`}
                    >
                      <pos.icon className={`w-7 h-7 ${pos.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-2xl font-bold text-white mb-2">
                        {pos.title}
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        <span className="text-xs text-white/50 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                          <Briefcase className="w-3 h-3" />
                          {pos.department}
                        </span>
                        <span className="text-xs text-white/50 flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full">
                          <MapPin className="w-3 h-3" />
                          {pos.location}
                        </span>
                        <span className="text-xs text-lime bg-lime/10 border border-lime/20 px-3 py-1 rounded-full font-medium">
                          {pos.type}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 leading-relaxed mb-8">
                    {pos.description}
                  </p>

                  {/* Responsibilities */}
                  <div className="mb-6">
                    <h4 className="font-heading text-sm font-bold text-white/80 uppercase tracking-wider mb-3">
                      {i.whatYouDo}
                    </h4>
                    <ul className="space-y-2">
                      {pos.responsibilities.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-sm text-white/60"
                        >
                          <CheckCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div className="mb-6">
                    <h4 className="font-heading text-sm font-bold text-white/80 uppercase tracking-wider mb-3">
                      {i.whatWeLookFor}
                    </h4>
                    <ul className="space-y-2">
                      {pos.requirements.map((r) => (
                        <li
                          key={r}
                          className="flex items-start gap-2.5 text-sm text-white/60"
                        >
                          <CheckCircle className="w-4 h-4 text-lime/60 flex-shrink-0 mt-0.5" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nice to have */}
                  <div className="mb-8">
                    <h4 className="font-heading text-sm font-bold text-white/40 uppercase tracking-wider mb-3">
                      {i.niceToHave}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {pos.niceToHave.map((n) => (
                        <span
                          key={n}
                          className="text-xs text-white/40 bg-white/5 border border-white/5 px-3 py-1.5 rounded-lg"
                        >
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Apply CTA */}
                  <a
                    href={`mailto:${APPLY_EMAIL}?subject=${i.emailSubjectApply}: ${pos.title}&body=${i.emailBodyApply} ${pos.title}. ${i.emailBodyCV}`}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-bold rounded-xl hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer text-sm"
                  >
                    <Mail className="w-4 h-4" />
                    {i.applyPosition}
                  </a>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-16 lg:py-24 border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white text-center mb-4">
              {i.benefitsTitle}
            </h2>
            <p className="text-white/60 text-center max-w-2xl mx-auto mb-16">
              {i.benefitsDesc}
            </p>
          </RevealOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <RevealOnScroll key={benefit.title} delay={idx * 0.08}>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-6 h-full hover:border-purple-500/30 transition-colors">
                  <benefit.icon className="w-7 h-7 text-lime mb-4" />
                  <h3 className="font-heading font-semibold text-white mb-2 text-sm">
                    {benefit.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {benefit.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* SPONTANEOUS APPLICATION CTA */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <RevealOnScroll>
            <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-purple-900/30 to-deep p-12 lg:p-16 text-center overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,42,206,0.15),transparent_70%)]" />
              <div className="relative">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  {i.spontaneousTitle}
                </h2>
                <p className="text-white/60 max-w-xl mx-auto mb-8">
                  {i.spontaneousDesc}
                </p>
                <a
                  href={`mailto:${APPLY_EMAIL}?subject=${i.spontaneousSubject}&body=${i.spontaneousBody}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-lime text-deep font-semibold rounded-lg hover:brightness-110 hover:shadow-lg hover:shadow-lime/20 transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  {i.spontaneousButton}
                </a>
                <p className="text-xs text-white/30 mt-4">
                  rrhh@dynamo.tech
                </p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </div>
  );
}
