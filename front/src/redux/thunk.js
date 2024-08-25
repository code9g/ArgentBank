import { createAsyncThunk } from "@reduxjs/toolkit";
import {
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
import fakeNetwork from "../utils/fakeNetwork";
import { authUpdateFirstName } from "./slices/authSlice";
import { profileClear } from "./slices/profileSlice";

const fake = async () =>
  import.meta.env.DEV && FAKE_NETWORK.active
    ? fakeNetwork(FAKE_NETWORK.delay, FAKE_NETWORK.random)
    : null;

/**
 * Réalise l'authentification d'un utilisateur et synchronise les informations
 * avec le store
 *
 * @example
 *
 * dispatch(singInThunk({{email, password}, remember})
 */
export const signInThunk = createAsyncThunk(
  "auth/" + SIGNIN_ACTION,
  async ({ credentials, remember }, thunkApi) =>
    new Promise((resolve, reject) =>
      fake().then(() =>
        fetchLogin(credentials)
          .then(async (token) => {
            thunkApi
              .dispatch(getProfileThunk(token))
              .unwrap()
              .then((action) =>
                resolve({ token, remember, user: action.payload })
              );
          })
          .catch((error) => reject(error.statusText || error.message))
      )
    )
);

/**
 * Réalise la déconnexion de l'utilisateur et synchronise les informations
 * avec le store
 *
 * @example
 *
 * dispatch(singOut())
 */
export const signOutThunk = createAsyncThunk(
  "auth/" + SIGNOUT_ACTION,
  async (_, thunkApi) =>
    new Promise((resolve) =>
      fake().then(() => {
        thunkApi.dispatch(profileClear());
        resolve();
      })
    )
);

/**
 * Permet de récupérer le profil de l'utilisateur et synchronise les informations
 * avec le store
 *
 * @example
 *
 * dispatch(getProfileThunk())
 *
 * ou
 *
 * dispatch(getProfileThunk(token))
 *
 * Note: le token est utilisé uniquement en interne
 */
export const getProfileThunk = createAsyncThunk(
  "profile/" + GET_ACTION,
  async (token = null, thunkApi) =>
    new Promise((resolve, reject) =>
      fake().then(() =>
        fetchGetProfile(token ?? thunkApi.getState().auth.token)
          .catch((error) => {
            reject(error.statusText || error.message);
            throw error;
          })
          .then((data) => {
            thunkApi.dispatch(authUpdateFirstName(data.firstName));
            resolve(data);
          })
      )
    )
);

/**
 * Permet de mettre à jour le profil de l'utilisateur et
 * synchronise les informations avec le store
 *
 * @example
 *
 * dispatch(updateProfileThunk({firstName, lastName})
 */
export const updateProfileThunk = createAsyncThunk(
  "profile/" + PUT_ACTION,
  async (profile, thunkApi) =>
    new Promise((resolve, reject) =>
      fake().then(() =>
        fetchUpdateProfile(thunkApi.getState().auth.token, profile)
          .catch((error) => reject(error.statusText || error.message))
          .then((data) => {
            thunkApi.dispatch(authUpdateFirstName(data.firstName));
            resolve(data);
          })
      )
    )
);
