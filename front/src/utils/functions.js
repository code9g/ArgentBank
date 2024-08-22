import { toastConfig } from "./consts";

/**
 * Retourne un objet qui défini le comportement par défaut des toasts de
 * type loading
 *
 * @param {object} options Options de rendu
 * @param {string} options.render Texte d'affichage du "toast"
 * @param {string} options.type Type de "toast"
 *
 * @example
 * const toast.loading("Working...");
 * // few moment later ;)
 * toast.update(id, toastify({render: "Operation aborted !", type: "error"}))
 *
 * @returns {object} L'objet à inclure dans le toast.loading
 */
export const toastify = (options) => ({
  ...options,
  ...toastConfig,
  isLoading: false,
});
