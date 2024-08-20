import { createSlice } from "@reduxjs/toolkit";

/**
 * Données initiales de l'état de connexion (loginSlice)
 *
 * @type {{ isFetching: boolean; error: string | null; remember: boolean; token: string | null; firstName: string | null; }}
 */
const initialState = {
  isFetching: false,
  error: null,

  remember: false,
  token: null,
  firstName: null,
};

// Chargement des données depuis localstorage si elles existent
// (situation où l'utilisateur a opté pour "Remember me")
const token = localStorage.getItem("token");
if (token) {
  initialState.remember = true;
  initialState.token = token;
  initialState.firstName = localStorage.getItem("firstName");
}

/**
 * Gestionnaire d'état de connexion d'un utilisateur
 *
 * @type {Slice}
 */
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginFetching: (state) => {
      state.isFetching = true;
    },

    loginSuccess: (state, { payload }) => {
      state.error = null;
      state.token = payload.token;
      state.remember = payload.remember;
      if (payload.remember) {
        localStorage.setItem("token", payload.token);
      }
    },

    loginDisconnected: (state) => {
      localStorage.clear();
      state.token = null;
      state.firstName = null;
      state.remember = false;
    },

    loginError: (state, { payload: error }) => {
      state.error = error;
    },

    loginDone: (state) => {
      state.isFetching = false;
    },

    loginUpdateFirstName: (state, { payload }) => {
      state.firstName = payload;
      if (state.remember) {
        localStorage.setItem("firstName", payload);
      }
    },
  },
});

export const { actions, reducer } = loginSlice;

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const {
  loginFetching,
  loginSuccess,
  loginDisconnecting,
  loginDisconnected,
  loginError,
  loginDone,
  loginUpdateFirstName,
} = actions;

export default reducer;
