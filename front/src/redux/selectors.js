/**
 * Fonction d'extraction du state d'authentification
 *
 * @param {Object} state Le state dont on veut récupérer les informations d'authentifications
 * @returns {Object}
 */
export const authSelector = (state) => state.auth;
