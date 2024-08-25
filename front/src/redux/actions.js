import {
  fakeNetwork,
  fetchGetProfile,
  fetchLogin,
  fetchUpdateProfile,
} from "../services/api";
import {
  FAKE_NETWORK,
  GET_ACTION,
  PUT_ACTION,
  SIGNIN_ACTION,
  SIGNOUT_ACTION,
} from "../utils/consts";
import {
  authError,
  authPending,
  authSuccess,
  authUpdateFirstName,
} from "./slices/authSlice";
import {
  profileClear,
  profileError,
  profilePending,
  profileSuccess,
} from "./slices/profileSlice";

const fake = async () =>
  import.meta.env.DEV && FAKE_NETWORK.active
    ? fakeNetwork(FAKE_NETWORK.delay, FAKE_NETWORK.random)
    : null;

/**
 * Fonction de connexion à l'api et d'actualisation du store
 *
 * @param {object} credentials Information de connexion de l'utilisateur
 * @param {string} credentials.email e-mail de l'utilisateur
 * @param {string} credentials.password Mot de passe de l'utilisateur
 * @param {boolean} remember Indique si l'on doit stocker le token en tant que cookies
 * @returns {Promise}
 */
export const signIn = (credentials, remember) => async (dispatch) => {
  dispatch(authPending(SIGNIN_ACTION));
  await fake();
  return fetchLogin(credentials)
    .catch((error) => {
      dispatch(authError(error.statusText || error.message));
      throw error;
    })
    .then(async (token) => {
      dispatch(profilePending(GET_ACTION));
      return fetchGetProfile(token)
        .catch((error) => {
          dispatch(profileError(error.statusText || error.message));
          throw error;
        })
        .then((data) => {
          dispatch(authSuccess({ token, remember }));
          dispatch(profileSuccess(data));
          dispatch(authUpdateFirstName(data.firstName));
        });
    });
};

/**
 * Fonction de déconnexion
 *
 * @returns {Promise}
 */
export const signOut = () => async (dispatch) => {
  dispatch(authPending(SIGNOUT_ACTION));
  await fake();
  dispatch(authSuccess());
  dispatch(profileClear());
};

/**
 * Fonction commune pour les apis retournant une réponse de type ApiResponse
 * (cf. swagger.yaml)
 *
 * @async
 * @param {Function} api
 * @param {...{}} args
 * @return {Promise}
 */
const userLayout = async (dispatch, getState, api, action, ...args) => {
  const token = getState().auth.token;
  dispatch(profilePending(action));
  await fake();
  return api(token, ...args)
    .then((data) => {
      dispatch(profileSuccess(data));
      dispatch(authUpdateFirstName(data.firstName));
      return data;
    })
    .catch((error) => {
      // TODO: En cas d'erreur "401 - Unauthorized", faudrait-il déconnecter l'utilisateur ?
      dispatch(profileError(error.statusText || error.message));
      throw error;
    });
};

/**
 * Fonction de récupération des données de l'utilisateur connecté
 *
 * @returns {Promise}
 */
export const getProfile = () => async (dispatch, getState) =>
  userLayout(dispatch, getState, fetchGetProfile, GET_ACTION);

/**
 * Fonction de de modification des données de l'utilisateur connecté
 * en utilisant le token d'authentification
 *
 * @param {Object} profile Les informations à modifier (seul le prénom et le nom sont modifiables)
 * @param {string} profile.firstName
 * @param {string} profile.lastName
 * @returns {Promise}
 */
export const updateProfile = (profile) => async (dispatch, getState) =>
  userLayout(dispatch, getState, fetchUpdateProfile, PUT_ACTION, profile);
