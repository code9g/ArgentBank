import { toast } from "react-toastify";
import { getUserProfile, loginUser, updateUserProfile } from "../services/api";
import {
  loginDisconnected,
  loginDone,
  loginError,
  loginFetching,
  loginSuccess,
  loginUpdateFirstName,
} from "./slices/loginSlice";
import {
  profileClear,
  profileDone,
  profileError,
  profileFetching,
  profileSuccess,
} from "./slices/profileSlice";

/**
 * Fonction de connexion à l'api et d'actualisation du store,
 * prenant en compte l'email, le mot de passe et "se souvenir"
 *
 * @param {{ email: any; password: any; remember: any; }} nfo
 * @param {*} nfo.email
 * @param {*} nfo.password
 * @param {*} nfo.remember
 * @returns {(dispatch: any) => any}
 */
export const signIn =
  ({ email, password, remember }) =>
  async (dispatch) => {
    dispatch(loginFetching());
    return loginUser(email, password)
      .then(async (data) => {
        const token = data.token;
        return userLayout(dispatch, getUserProfile, token).then((data) => {
          dispatch(
            loginSuccess({ token, firstName: data.firstName, remember })
          );
          toast.success("You are successfully connected");
          return data;
        });
      })
      .catch((error) => {
        if (error.status === 400) {
          dispatch(loginError("Invalid username or password !"));
        } else {
          dispatch(loginError(error.statusText || error.message));
          toast.error(error.statusText || error.message);
        }
      })
      .finally(() => dispatch(loginDone()));
  };

/**
 * Fonction de déconnexion
 *
 * @returns {(dispatch: any) => any}
 */
export const signOut = () => async (dispatch) => {
  dispatch(loginDisconnected());
  dispatch(profileClear());
  toast.success("You are logged out");
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
  return api(...args)
    .then((data) => {
      dispatch(profileSuccess(data));
      dispatch(loginUpdateFirstName(data.firstName));
      return data;
    })
    .catch((error) => {
      // TODO: En cas d'erreur "401 - Unauthorized", faudrait-il déconnecter l'utilisateur ?
      dispatch(profileError(error.statusText || error.message));
      toast.error(error.statusText || error.message);
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
  userLayout(dispatch, updateUserProfile, token, profile).then((data) => {
    toast.success("Your profile has been successfully updated");
    return data;
  });
