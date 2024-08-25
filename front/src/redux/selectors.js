/**
 * Fonction d'extraction du state d'authentification
 *
 * @param {Object} state Le state dont on veut récupérer les informations d'authentifications
 * @returns {Object}
 */
export const authSelector = (state) => state.auth;

/**
 * Fonction d'extraction du state du profil de l'utilisateur
 *
 * @param {Object} state Le state dont on veut récupérer les informations de l'utilisateur
 * @returns {Object}
 */
export const profileSelector = (state) => state.profile;
