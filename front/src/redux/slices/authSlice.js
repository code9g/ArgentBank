import { createSlice } from "@reduxjs/toolkit";
import {
  ERROR_STATUS,
  IDLE_STATUS,
  PENDING_STATUS,
  SIGNIN_ACTION,
  SUCCESS_STATUS,
} from "../../utils/consts";

/**
 * Données initiales de l'état de connexion (loginSlice)
 *
 * @type {{ status: string | null; error: string | null; remember: boolean; token: string | null; firstName: string | null; }}
 */
const initialState = {
  action: null,
  status: IDLE_STATUS,
  error: null,

  remember: false,
  token: null,
  firstName: null,
};

// Chargement des données depuis localstorage si elles existent
// (situation où l'utilisateur a opté pour "Remember me")
const token = localStorage.getItem("token");
if (token) {
  initialState.action = SIGNIN_ACTION;
  initialState.status = SUCCESS_STATUS;
  initialState.remember = true;
  initialState.token = token;
  initialState.firstName = localStorage.getItem("firstName");
}

/**
 * Gestionnaire d'état de connexion d'un utilisateur
 *
 * @type {Slice}
 */
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authPending: (state, { payload: action }) => {
      state.action = action;
      state.status = PENDING_STATUS;
    },

    authSuccess: (state, { payload }) => {
      state.status = SUCCESS_STATUS;
      if (payload) {
        const { token, remember } = payload;
        state.token = token;
        state.remember = remember;
        if (remember) {
          localStorage.setItem("token", token);
        }
      } else {
        localStorage.clear();
        state.token = null;
        state.remember = null;
      }
      state.error = null;
    },

    authError: (state, { payload: error }) => {
      state.status = ERROR_STATUS;
      state.error = error;
    },

    authClearError: (state) => {
      state.status = IDLE_STATUS;
      state.error = null;
    },

    authUpdateFirstName: (state, { payload: firstName }) => {
      state.firstName = firstName;
      if (state.remember) {
        localStorage.setItem("firstName", firstName);
      }
    },
  },
});

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const {
  authAction,
  authPending,
  authSuccess,
  authError,
  authClearError,
  authUpdateFirstName,
} = authSlice.actions;

export default authSlice.reducer;
