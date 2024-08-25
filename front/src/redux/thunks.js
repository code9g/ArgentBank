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

export const signInThunk = createAsyncThunk(
  "auth/" + SIGNIN_ACTION,
  async ({ credentials, remember }, thunkApi) =>
    fake().then(() =>
      fetchLogin(credentials)
        .then(async (token) => {
          return thunkApi
            .dispatch(getProfileThunk(token))
            .unwrap()
            .then((action) => ({ token, remember, user: action.payload }));
        })
        .catch((error) => {
          throw new Error(error.statusText || error.message);
        })
    )
);

export const signOutThunk = createAsyncThunk(
  "auth/" + SIGNOUT_ACTION,
  async (_, thunkApi) => fake().then(() => thunkApi.dispatch(profileClear()))
);

export const getProfileThunk = createAsyncThunk(
  "profile/" + GET_ACTION,
  async (token = null, thunkApi) =>
    fake().then(() =>
      fetchGetProfile(token ?? thunkApi.getState().auth.token)
        .catch((error) => {
          throw new Error(error.statusText || error.message);
        })
        .then((data) => {
          thunkApi.dispatch(authUpdateFirstName(data.firstName));
          return data;
        })
    )
);

export const updateProfileThunk = createAsyncThunk(
  "profile/" + PUT_ACTION,
  async (profile, thunkApi) =>
    fake().then(() =>
      fetchUpdateProfile(thunkApi.getState().auth.token, profile)
        .catch((error) => {
          throw new Error(error.statusText || error.message);
        })
        .then((data) => {
          thunkApi.dispatch(authUpdateFirstName(data.firstName));
          return data;
        })
    )
);

/**
 * Réalise l'authentification d'un utilisateur et synchronise les informations
 * avec le store
 *
 * @param {Object} credentials
 * @param {string} credentials.email
 * @param {string} credentials.password
 * @param {boolean} remember
 * @returns {AsyncThunk}
 */
export const signIn = (credentials, remember) =>
  signInThunk({ credentials, remember });

/**
 * Réalise la déconnexion de l'utilisateur et synchronise les informations
 * avec le store
 *
 * @returns {AsyncThunk}
 */
export const signOut = () => signOutThunk();

/**
 * Permet de récupérer le profil de l'utilisateur et synchronise les informations
 * avec le store
 *
 * @returns {AsyncThunk}
 */
export const getProfile = () => getProfileThunk();

/**
 * Permet de mettre à jour le profil de l'utilisateur et
 * synchronise les informations avec le store
 *
 * Note: seul firstName et lastName sont modifiables
 *
 * @param {Object} profile
 * @param {string} profile.firstName
 * @param {string} profile.lastName
 * @returns {AsyncThunk}
 */
export const updateProfile = (profile) => updateProfileThunk(profile);
