import { useSelector } from "react-redux";

/**
 * Fonction d'extraction du state d'authentification
 *
 * @param {Object} state Le state dont on veut récupérer les informations d'authentifications
 * @returns {Object}
 */
export const authSelector = (state) => state.auth;

/**
 * Fonction d'extraction du state du profil de l'utilisateur
 * @param {Object} state Le state dont on veut récupérer les informations de l'utilisateur
 * @returns {Object}
 */
export const profileSelector = (state) => state.profile;

/**
 * Alias du hook useSelector(authSelector) pour récupérer les informations d'authentification
 *
 * @returns {Object}
 */
export const useAuthSelector = () => {
  const selector = useSelector(authSelector);
  return {
    ...selector,
    isAuth: selector.token !== null,
    isPending: selector.status === "pending",
    isError: selector.status === "error",
    isSuccess: selector.status === "success",
  };
};

/**
 * Alias du hook useSelector(profileSelector) pour récupérer les informations d'un utilisateur
 *
 * @returns {Object}
 */
export const useProfileSelector = () => {
  const selector = useSelector(profileSelector);
  let timeLeft = null;
  if (selector.expireAt !== null) {
    timeLeft = selector.expireAt - Date.now();
  }
  return {
    ...selector,
    isPending: selector.status === "pending",
    isError: selector.status === "error",
    isSuccess: selector.status === "success",
    expired: timeLeft !== null && timeLeft <= 0,
    timeLeft: timeLeft,
  };
};
