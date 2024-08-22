import { useSelector } from "react-redux";

/**
 * Fonction d'extraction du state d'authentification
 *
 * @param {*} state Le state dont on veut récupérer les informations d'authentifications
 * @returns {*}
 */
export const authSelector = (state) => state.auth;

/**
 * Fonction d'extraction du state du profil de l'utilisateur
 * @param {*} state Le state dont on veut récupérer les informations de l'utilisateur
 * @returns {*}
 */
export const profileSelector = (state) => state.profile;

/**
 * Alias du hook useSelector(authSelector) pour récupérer les informations d'authentification
 *
 * @returns {*}
 */
export const useAuthSelector = () => {
  const selector = useSelector(authSelector);
  return { ...selector, isAuth: selector.token !== null };
};

/**
 * Alias du hook useSelector(profileSelector) pour récupérer les informations d'un utilisateur
 *
 * @returns {*}
 */
export const useProfileSelector = () => useSelector(profileSelector);
