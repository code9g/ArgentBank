import { createSlice } from "@reduxjs/toolkit";

/**
 * Données initiales de l'état de connexion (loginSlice)
 *
 * @type {{ status: string | null; error: string | null; remember: boolean; token: string | null; firstName: string | null; }}
 */
const initialState = {
  status: "iddle",
  error: null,

  remember: false,
  token: null,
  firstName: null,
};

// Chargement des données depuis localstorage si elles existent
// (situation où l'utilisateur a opté pour "Remember me")
const token = localStorage.getItem("token");
if (token) {
  initialState.status = "success";
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
    authPending: (state) => {
      state.status = "pending";
    },

    authSuccess: (state, { payload: { token, remember } }) => {
      state.status = "success";
      state.error = null;
      state.token = token;
      state.remember = remember;
      if (remember) {
        localStorage.setItem("token", token);
      }
    },

    authDisconnected: (state) => {
      state.status = "disconnected";
      localStorage.clear();
      state.token = null;
      state.firstName = null;
      state.remember = false;
    },

    authError: (state, { payload: error }) => {
      state.status = "error";
      state.error = error;
    },

    authClearError: (state) => {
      state.status = "iddle";
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
  authPending,
  authSuccess,
  authDisconnecting,
  authDisconnected,
  authError,
  authClearError,
  authUpdateFirstName,
} = authSlice.actions;

export default authSlice.reducer;
