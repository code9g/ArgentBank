import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import bankApi from "../services/bankApi";

/**
 * Données initiales de l'état de connexion (loginSlice)
 *
 * @type {{ status: string | null; error: string | null; remember: boolean; token: string | null; firstName: string | null; }}
 */
const initialState = {
  remember: false,
  token: null,
  user: null,
};

// Chargement des données depuis localstorage si elles existent
// (situation où l'utilisateur a opté pour "Remember me")
const token = localStorage.getItem("token");
if (token) {
  initialState.remember = true;
  initialState.token = token;
  initialState.user = JSON.parse(localStorage.getItem("user"));
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
    logout: (state) => {
      localStorage.clear();
      state.token = null;
      state.remember = false;
      state.user = null;
      toast.success("You are logged out");
    },
    setRemember: (state, { payload: remember }) => {
      state.remember = remember;
      if (remember) {
        localStorage.setItem("token", state.token);
        localStorage.setItem("user", JSON.stringify(state.user));
      } else {
        localStorage.clear();
      }
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(
        bankApi.endpoints.login.matchFulfilled,
        (state, { payload: token }) => {
          state.token = token;
          if (state.remember) {
            localStorage.setItem("token", token);
          }
        }
      )
      .addMatcher(
        bankApi.endpoints.getProfile.matchFulfilled,
        (state, { payload: user }) => {
          state.user = user;
          if (state.remember) {
            localStorage.setItem("user", JSON.stringify(user));
          }
        }
      )
      .addMatcher(
        bankApi.endpoints.updateProfile.matchFulfilled,
        (state, { payload: user }) => {
          state.user = user;
        }
      ),
});

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const { logout, setRemember } = authSlice.actions;

export default authSlice.reducer;
