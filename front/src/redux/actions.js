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

export const signIn =
  ({ email, password, remember }) =>
  async (dispatch) => {
    dispatch(loginFetching());
    loginUser(email, password)
      .then(async (data) => {
        const token = data.token;
        return userLayout(dispatch, getUserProfile, token).then((data) => {
          dispatch(
            loginSuccess({ token, firstName: data.firstName, remember })
          );
          return data;
        });
      })
      .catch((error) => {
        if (error.status === 400) {
          dispatch(loginError("Invalid username or password !"));
        } else {
          dispatch(loginError(error.statusText || error.message));
        }
      })
      .finally(() => dispatch(loginDone()));
  };

export const signOut = () => async (dispatch) => {
  dispatch(loginDisconnected());
  dispatch(profileClear());
};

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
    })
    .finally(() => {
      dispatch(profileDone());
    });
};

export const userLoad = (token) => async (dispatch) =>
  userLayout(dispatch, getUserProfile, token);

export const userUpdate = (token, profile) => async (dispatch) =>
  userLayout(dispatch, updateUserProfile, profile, token);
