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
  user: {},
};

// Chargement des données depuis localstorage si elles existent
// (situation où l'utilisateur a opté pour "Remember me")
const token = localStorage.getItem("token");
if (token) {
  initialState.remember = true;
  initialState.token = token;
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
      state.token = null;
      state.remember = false;
      state.user = {};
      toast.success("You are logged out");
    },
  },
  extraReducers: (builder) =>
    builder
      .addMatcher(bankApi.endpoints.login.matchPending, (state) => {
        state.toastId = toast.loading("Connexion");
      })
      .addMatcher(
        bankApi.endpoints.login.matchFulfilled,
        (state, { payload: token }) => {
          state.token = token;
          if (state.remember) {
            localStorage.setItem("token", token);
          }
          toast.update(state.toastId, {
            render: "You are successfully logged !",
            isLoading: false,
            type: "success",
            autoClose: 1500,
          });
        }
      )
      .addMatcher(
        bankApi.endpoints.login.matchRejected,
        (state, { payload: message }) => {
          toast.update(state.toastId, {
            render: message,
            isLoading: false,
            type: "error",
            autoClose: 1500,
          });
        }
      )
      .addMatcher(
        bankApi.endpoints.getProfile.matchFulfilled,
        (state, { payload: user }) => {
          state.user = user;
        }
      )
      .addMatcher(bankApi.endpoints.updateProfile.matchPending, (state) => {
        state.toastId = toast.loading("Updating...");
      })
      .addMatcher(
        bankApi.endpoints.updateProfile.matchFulfilled,
        (state, { payload: user }) => {
          state.user = user;
          toast.update(state.toastId, {
            render: "Profile successfully updated !",
            isLoading: false,
            type: "success",
            autoClose: 1500,
          });
        }
      )
      .addMatcher(
        bankApi.endpoints.updateProfile.matchRejected,
        (state, { payload: message }) => {
          toast.update(state.toastId, {
            render: message,
            isLoading: false,
            type: "error",
            autoClose: 1500,
          });
        }
      ),
});

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const { logout } = authSlice.actions;

export default authSlice.reducer;
