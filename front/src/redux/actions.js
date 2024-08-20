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
      .then((data) => {
        const token = data.body.token;
        dispatch(profileFetching());
        return getUserProfile(token)
          .then((data) => {
            dispatch(profileSuccess(data.body));
            dispatch(
              loginSuccess({ token, firstName: data.body.firstName, remember })
            );
          })
          .catch((error) => {
            dispatch(profileError("Fetching data error..."));
            throw error;
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
  // dispatch(loginDisconnecting());
  dispatch(loginDisconnected());
  dispatch(profileClear());
};

export const userLoad = (token) => async (dispatch) => {
  dispatch(profileFetching());
  getUserProfile(token)
    .then((data) => {
      dispatch(profileSuccess(data.body));
      dispatch(loginUpdateFirstName(data.body.firstName));
    })
    .catch((error) => {
      dispatch(profileError(error.statusText || error.message));
    })
    .finally(() => {
      dispatch(profileDone());
    });
};

export const userUpdate =
  (token, { firstName, lastName }) =>
  async (dispatch) => {
    dispatch(profileFetching());
    updateUserProfile({ firstName, lastName }, token)
      .then((data) => {
        dispatch(profileSuccess(data.body));
        dispatch(loginUpdateFirstName(data.body.firstName));
      })
      .catch((error) => {
        dispatch(profileError(error.statusText || error.message));
      })
      .finally(() => {
        dispatch(profileDone());
      });
  };
