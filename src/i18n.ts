import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Dashboard": "Dashboard",
      "My Chamas": "My Chamas",
      "Contributions": "Contributions",
      "Savings": "Savings",
      "Loans": "Loans",
      "Merrigo": "Merrigo",
      "AI Advisor": "AI Advisor",
      "Logout": "Logout",
      "Welcome Back": "Welcome Back",
      "Savings Balance": "Savings Balance",
      "Total Savings Balance": "Total Savings Balance",
      "Interest Earned": "Interest Earned",
      "Growth Rate": "Growth Rate",
      "Deposit Funds": "Deposit Funds",
      "Search": "Search",
      "Apply for Loan": "Apply for Loan",
      "Start New Cycle": "Start New Cycle",
      "Ask about savings": "Ask about savings, loans, or risks...",
      "Verify AI suggestions": "Verify AI suggestions for critical decisions",
      "Personal Savings": "Personal Savings",
      "Manage goals": "Manage your goals and watch your wealth grow.",
      "M-Pesa Phone Number": "M-Pesa Phone Number",
      "Deposit Amount": "Deposit Amount",
      "Confirm Deposit": "Confirm Deposit",
      "Habari": "Hello",
      "Happening in your Chamas": "Here's what's happening in your Chamas today.",
      "Total Savings": "Total Savings",
      "Active Loans": "Active Loans",
      "Group Members": "Group Members",
      "Next Merrigo": "Next Merrigo",
      "Savings Growth": "Savings Growth",
      "Consolidated growth": "Consolidated growth across all groups",
      "Recent Activity": "Recent Activity",
      "View All Activity": "View All Activity"
    }
  },
  fr: {
    translation: {
      "Dashboard": "Tableau de Bord",
      "My Chamas": "Mes Chamas",
      "Contributions": "Cotisations",
      "Savings": "Épargne",
      "Loans": "Prêts",
      "Merrigo": "Rotation",
      "AI Advisor": "Conseiller IA",
      "Logout": "Déconnexion",
      "Welcome Back": "Bon retour",
      "Savings Balance": "Solde d'épargne",
      "Total Savings Balance": "Solde total d'épargne",
      "Interest Earned": "Intérêts gagnés",
      "Growth Rate": "Taux de croissance",
      "Deposit Funds": "Déposer des fonds",
      "Search": "Rechercher",
      "Apply for Loan": "Demander un prêt",
      "Start New Cycle": "Démarrer un nouveau cycle",
      "Ask about savings": "Posez des questions sur l'épargne, les prêts ou les risques...",
      "Verify AI suggestions": "Vérifier les suggestions de l'IA pour les décisions financières critiques",
      "Personal Savings": "Épargne personnelle",
      "Manage goals": "Gérez vos objectifs et regardez votre richesse fructifier.",
      "M-Pesa Phone Number": "Numéro de téléphone M-Pesa",
      "Deposit Amount": "Montant du dépôt",
      "Confirm Deposit": "Confirmer le dépôt",
      "Habari": "Bonjour",
      "Happening in your Chamas": "Voici ce qui se passe dans vos Chamas aujourd'hui.",
      "Total Savings": "Épargne Totale",
      "Active Loans": "Prêts Actifs",
      "Group Members": "Membres du Groupe",
      "Next Merrigo": "Prochaine Rotation",
      "Savings Growth": "Croissance de l'Épargne",
      "Consolidated growth": "Croissance consolidée dans tous les groupes",
      "Recent Activity": "Activité Récente",
      "View All Activity": "Voir Toute l'Activité"
    }
  },
  sw: {
    translation: {
      "Dashboard": "Dashibodi",
      "My Chamas": "Chama Zangu",
      "Contributions": "Michango",
      "Savings": "Akiba",
      "Loans": "Mikopo",
      "Merrigo": "Mzunguko",
      "AI Advisor": "Mshauri wa AI",
      "Logout": "Ondoka",
      "Welcome Back": "Karibu Tena",
      "Savings Balance": "Salio la Akiba",
      "Total Savings Balance": "Jumla ya Salio la Akiba",
      "Interest Earned": "Riba Iliyopatikana",
      "Growth Rate": "Kiwango cha Ukuaji",
      "Deposit Funds": "Weka Fedha",
      "Search": "Tafuta",
      "Apply for Loan": "Omba Mkopo",
      "Start New Cycle": "Anza Mzunguko Mpya",
      "Ask about savings": "Uliza kuhusu akiba, mikopo, au hatari...",
      "Verify AI suggestions": "Hakiki mapendekezo ya AI kwa maamuzi muhimu ya kifedha",
      "Personal Savings": "Akiba ya Kibinafsi",
      "Manage goals": "Dhibiti malengo yako na uone utajiri wako ukikua.",
      "M-Pesa Phone Number": "Nambari ya Simu ya M-Pesa",
      "Deposit Amount": "Kiasi cha Kuweka",
      "Confirm Deposit": "Thibitisha Kuweka",
      "Habari": "Habari",
      "Happening in your Chamas": "Haya ndiyo yanayojiri katika Chama zako leo.",
      "Total Savings": "Jumla ya Akiba",
      "Active Loans": "Mikopo Inayoendelea",
      "Group Members": "Wanachama wa Kikundi",
      "Next Merrigo": "Mzunguko Ujao",
      "Savings Growth": "Ukuaji wa Akiba",
      "Consolidated growth": "Ukuaji uliounganishwa katika vikundi vyote",
      "Recent Activity": "Shughuli za Hivi Karibuni",
      "View All Activity": "Tazama Shughuli Zote"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
