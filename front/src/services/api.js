export const API_URL = "http://localhost:3001/api/v1";

export const LOGIN_ENDPOINT = "/user/login";
export const PROFILE_ENDPOINT = "/user/profile";

/**
 * Fonction générique d'interaction avec l'api
 *
 * @async
 * @param {*} endpoint Point d'entrée pour interargir avec l'api
 * @param {Object | null} content Contenu à inclure dans le body de la requête
 * @param {Object} options
 * @param {string} options.token Jeton d'authentification
 * @param {string} [options.method=GET] Méthode de la requête (GET, POST, etc...)
 * @returns {Promise}
 */
const fetcher = async (endpoint, content, options = null) =>
  fetch(API_URL + endpoint, {
    method: options?.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: options?.token ? `Bearer ${options.token}` : null,
    },
    body: content ? JSON.stringify(content) : null,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      throw response;
    })
    .then((data) => data.body);

/**
 * Api d'authentification d'un utilisateur via son email et son mot de passe
 *
 * @async
 * @param {string} email Adresse e-mail
 * @param {string} password Mot de passe
 * @returns {Promise}
 */
export const loginUser = async (email, password) =>
  fetcher(LOGIN_ENDPOINT, { email, password }, { method: "POST" });

/**
 * Api de récupération des données d'un utilisateur actuellement connecté
 * via son jeton d'authentification
 *
 * @async
 * @param {string} token Jeton d'authenfication
 * @returns {Promise}
 */
export const getUserProfile = async (token) =>
  fetcher(PROFILE_ENDPOINT, null, { method: "POST", token });

/**
 * Api de modification du profil d'un utilisateur actuellement connecté
 * via son jeton d'authentification, seul firstName et lastName sont
 * modifiable via l'api
 *
 * @async
 * @param {string} token Jeton d'authenfication
 * @param {Object} profile Données du profil à modifier
 * @param {string} profile.firstName Prénom de l'utilisateur
 * @param {string} profile.lastName Nom de l'utilisateur
 * @returns {Promise}
 */
export const updateUserProfile = async (token, profile) =>
  fetcher(PROFILE_ENDPOINT, profile, { method: "PUT", token });

/**
 * Api pour simuler un délai de connexion/réponse, à n'utiliser
 * que pour des tests.
 *
 * @param {number} delay Délai d'attente de "base"
 * @param {boolean} [random=true] Indique si il faut "randomiser" le délai qui servira de "base"
 * @returns
 */
export const fakeNetwork = async (delay, random = true) =>
  new Promise((res) => setTimeout(res, (random ? Math.random() : 1) * delay));
