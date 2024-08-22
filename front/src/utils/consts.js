import iconChat from "../assets/img/icon-chat.png";
import iconMoney from "../assets/img/icon-money.png";
import iconSecurity from "../assets/img/icon-security.png";

/**
 * URL pour les requêtes à l'API de l'application
 *
 * @type {"http://localhost:3001/api/v1"}
 */
export const API_URL = "http://localhost:3001/api/v1";

/**
 * Point d'entrée pour authentifier un utilisateur auprès de l'API
 *
 * @type {"/user/login"}
 */
export const LOGIN_ENDPOINT = "/user/login";

/**
 * Point d'entrée pour lire ou modifier le profil d'un utilisateur authentifié
 *
 * @type {"/user/profile"}
 */
export const PROFILE_ENDPOINT = "/user/profile";

/**
 * Constante/Objet d'affichage de la monnaie, ici, au format américain et en $
 *
 * @type {Intl.NumberFormat}
 */
export const currencyFormat = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

/**
 * Liste des "features" de la page d'accueil
 *
 * @type {Array<{title: string, icon:any, alt: string, description: string}>}
 */
export const features = [
  {
    title: "You are our #1 priority",
    icon: iconChat,
    alt: "Chat Icon",
    description:
      "Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes",
  },
  {
    title: "More savings means higher rates",
    icon: iconMoney,
    alt: "Money Icon",
    description:
      "The more you save with us, the higher your interest rate will be!",
  },
  {
    title: "Security you can trust",
    icon: iconSecurity,
    alt: "Security Icon",
    description:
      "We use top of the line encryption to make sure your data and money is always safe.",
  },
];

/**
 * Liste des comptes d'un utilisateur, uniquement à des fins de démonstration
 * et d'affichage
 *
 * @type {Array<{id: number, title: string, operations: number, amount: number, description: title}>}
 */
export const accounts = [
  {
    id: 1,
    title: "Argent Bank Checking",
    operations: 8_349,
    amount: 2_082.79,
    description: "Available Balance",
  },
  {
    id: 2,
    title: "Argent Bank Savings",
    operations: 6_712,
    amount: 10_928.42,
    description: "Available Balance",
  },
  {
    id: 3,
    title: "Argent Bank Credit Card",
    operations: 8_349,
    amount: 184.3,
    description: "Current Balance",
  },
];

/**
 * Configuration des "toasts"
 *
 * @type {{ position: string; autoClose: number; closeOnClick: boolean; pauseOnHover: boolean; pauseOnFocusLoss: boolean; }}
 */
export const toastConfig = {
  position: "top-center",
  autoClose: 1500,
  closeOnClick: true,
  pauseOnHover: true,
  pauseOnFocusLoss: false,
};
