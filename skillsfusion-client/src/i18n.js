import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          // Navbar
          fusionPro: "Fusion Pro ▾",
          explore: "Explore ▾",
          login: "Login",
          signup: "Signup",

          // Hero section
          heroTitle: "Find the perfect freelancer",
          heroSubtitle: "Get your work done by top-rated professionals on SkillsFusion.",
          getStarted: "Get Started",
          learnMore: "Learn More",
          searchPlaceholder: "Search for any service...",
          websiteDev: "website development →",
          architectureDesign: "architecture & interior design →",
          videoEdit: "video editing →",

          // Explore Services
          exploreHeading: "Explore millions of pros",
          exploreSubheading: "Find the perfect professional for your project from our diverse range of expert services",
          browseAll: "Browse All Categories",

          devTitle: "Development & IT",
          devSubtitle: "Custom software solutions and technical expertise",
          designTitle: "Design & Creative",
          designSubtitle: "Visual design and creative content services",
          aiTitle: "AI Services",
          aiSubtitle: "Machine learning and AI-powered solutions",
          marketingTitle: "Sales & Marketing",
          marketingSubtitle: "Growth strategies and marketing campaigns",
          writingTitle: "Writing & Translation",
          writingSubtitle: "Content creation and language services",
          adminTitle: "Admin & Support",
          adminSubtitle: "Administrative and customer support services",
          financeTitle: "Finance & Accounting",
          financeSubtitle: "Financial planning and accounting services",
          legalTitle: "Legal",
          legalSubtitle: "Legal consultation and compliance services",
          hrTitle: "HR & Training",
          hrSubtitle: "Human resources and professional development",
          enggTitle: "Engineering & Architecture",
          enggSubtitle: "Technical engineering and design solutions"
        }
      },

      fr: {
        translation: {
          // Navbar
          fusionPro: "Fusion Pro ▾",
          explore: "Explorer ▾",
          login: "Connexion",
          signup: "S'inscrire",

          // Hero section
          heroTitle: "Trouvez le freelance parfait",
          heroSubtitle: "Faites réaliser votre travail par des professionnels bien notés sur SkillsFusion.",
          getStarted: "Commencer",
          learnMore: "En savoir plus",
          searchPlaceholder: "Rechercher un service...",
          websiteDev: "développement de site web →",
          architectureDesign: "architecture & design intérieur →",
          videoEdit: "montage vidéo →",

          // Explore Services
          exploreHeading: "Explorez des millions de pros",
          exploreSubheading: "Trouvez le professionnel idéal pour votre projet parmi notre large gamme de services experts",
          browseAll: "Parcourir toutes les catégories",

          devTitle: "Développement & IT",
          devSubtitle: "Solutions logicielles sur mesure et expertise technique",
          designTitle: "Design & Créatif",
          designSubtitle: "Conception visuelle et services de contenu créatif",
          aiTitle: "Services IA",
          aiSubtitle: "Solutions basées sur l'apprentissage automatique et l'IA",
          marketingTitle: "Ventes & Marketing",
          marketingSubtitle: "Stratégies de croissance et campagnes marketing",
          writingTitle: "Rédaction & Traduction",
          writingSubtitle: "Création de contenu et services linguistiques",
          adminTitle: "Administration & Support",
          adminSubtitle: "Services administratifs et support client",
          financeTitle: "Finance & Comptabilité",
          financeSubtitle: "Planification financière et services comptables",
          legalTitle: "Juridique",
          legalSubtitle: "Consultation juridique et conformité",
          hrTitle: "RH & Formation",
          hrSubtitle: "Ressources humaines et développement professionnel",
          enggTitle: "Ingénierie & Architecture",
          enggSubtitle: "Solutions d'ingénierie technique et de conception"
        }
      },

      de: {
        translation: {
          // Navbar
          fusionPro: "Fusion Pro ▾",
          explore: "Entdecken ▾",
          login: "Anmelden",
          signup: "Registrieren",

          // Hero section
          heroTitle: "Finde den perfekten Freelancer",
          heroSubtitle: "Lassen Sie Ihre Arbeit von Top-Profis auf SkillsFusion erledigen.",
          getStarted: "Loslegen",
          learnMore: "Mehr erfahren",
          searchPlaceholder: "Suche nach einem Service...",
          websiteDev: "Webentwicklung →",
          architectureDesign: "Architektur & Innenarchitektur →",
          videoEdit: "Videobearbeitung →",

          // Explore Services
          exploreHeading: "Entdecken Sie Millionen von Profis",
          exploreSubheading: "Finden Sie den perfekten Profi für Ihr Projekt aus unserem vielfältigen Serviceangebot",
          browseAll: "Alle Kategorien durchsuchen",

          devTitle: "Entwicklung & IT",
          devSubtitle: "Maßgeschneiderte Softwarelösungen und technisches Know-how",
          designTitle: "Design & Kreatives",
          designSubtitle: "Visuelles Design und kreative Inhalte",
          aiTitle: "KI-Dienste",
          aiSubtitle: "Maschinelles Lernen und KI-gestützte Lösungen",
          marketingTitle: "Vertrieb & Marketing",
          marketingSubtitle: "Wachstumsstrategien und Marketingkampagnen",
          writingTitle: "Schreiben & Übersetzung",
          writingSubtitle: "Texterstellung und Sprachdienste",
          adminTitle: "Verwaltung & Support",
          adminSubtitle: "Administrative und Kundendienstleistungen",
          financeTitle: "Finanzen & Buchhaltung",
          financeSubtitle: "Finanzplanung und Buchhaltungsdienste",
          legalTitle: "Recht",
          legalSubtitle: "Juristische Beratung und Compliance",
          hrTitle: "Personal & Schulung",
          hrSubtitle: "Personalwesen und berufliche Weiterbildung",
          enggTitle: "Ingenieurwesen & Architektur",
          enggSubtitle: "Technische Ingenieur- und Designlösungen"
        }
      }
    },
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
