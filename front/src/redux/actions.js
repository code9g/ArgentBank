import {
  fakeNetwork,
  getUserProfile,
  loginUser,
  updateUserProfile,
} from "../services/api";
import {
  authDisconnected,
  authDone,
  authError,
  authFetching,
  authSuccess,
  authUpdateFirstName,
} from "./slices/authSlice";
import {
  profileClear,
  profileDone,
  profileError,
  profileFetching,
  profileSuccess,
} from "./slices/profileSlice";

/**
 * Fonction de connexion à l'api et d'actualisation du store
 *
 * @param {object} credentials Information de connexion de l'utilisateur
 * @param {string} credentials.email e-mail de l'utilisateur
 * @param {string} credentials.password Mot de passe de l'utilisateur
 * @param {boolean} remember Indique si l'on doit stocker le token en tant que cookies
 * @returns {(dispatch: any) => any}
 */
export const signIn = (credentials, remember) => async (dispatch) => {
  dispatch(authFetching());
  await fakeNetwork(3000, false);
  return loginUser(credentials)
    .then(async (data) => {
      const token = data.token;
      return userLayout(dispatch, getUserProfile, token).then((data) => {
        dispatch(authSuccess({ token, firstName: data.firstName, remember }));
        return data;
      });
    })
    .catch((error) => {
      dispatch(authError(error.statusText || error.message));
      throw error;
    })
    .finally(() => {
      dispatch(authDone());
    });
};

/**
 * Fonction de déconnexion
 *
 * @returns {(dispatch: any) => any}
 */
export const signOut = () => async (dispatch) => {
  dispatch(authDisconnected());
  dispatch(profileClear());
};

/**
 * Fonction commune pour les apis retournant une réponse de type ApiResponse
 * (cf. swagger.yaml)
 *
 * @async
 * @param {Function} dispatch fonction de dispatch de useDispatch de rédux
 * @param {Function} api
 * @param {...{}} args
 * @return {Promise}
 */
const userLayout = async (dispatch, api, ...args) => {
  dispatch(profileFetching());
  await fakeNetwork(3000, false);
  return api(...args)
    .then((data) => {
      dispatch(profileSuccess(data));
      dispatch(authUpdateFirstName(data.firstName));
      return data;
    })
    .catch((error) => {
      // TODO: En cas d'erreur "401 - Unauthorized", faudrait-il déconnecter l'utilisateur ?
      dispatch(profileError(error.statusText || error.message));
    })
    .finally(() => {
      dispatch(profileDone());
    });
};

/**
 * Fonction de récupération des données de l'utilisateur connecté
 * en utilisant le token d'authentification
 *
 * @param {string} token Jeton d'authentification
 * @returns {(dispatch: any) => unknown}
 */
export const userLoad = (token) => async (dispatch) =>
  userLayout(dispatch, getUserProfile, token);

/**
 * Fonction de de modification des données de l'utilisateur connecté
 * en utilisant le token d'authentification
 *
 * @param {string} token Jeton d'authentification
 * @param {Object} profile Les informations à modifier (seul le prénom et le nom sont modifiables)
 * @param {string} profile.firstName
 * @param {string} profile.lastName
 * @returns {(dispatch: any) => unknown}
 */
export const userUpdate = (token, profile) => async (dispatch) =>
  userLayout(dispatch, updateUserProfile, token, profile);
