import { createSlice } from "@reduxjs/toolkit";
import { INTERVAL_USER_DATA_REFRESH } from "../../utils/consts";

/**
 * Données initiales de l'état de connexion (profileSlice)
 *
 * @type {{ isFetching: boolean; error: string | null; user: {id: string?, createdAt: string?, updatedAt: string?, email: string?, firstName: string?, lastName: string?}}}
 */
const initialState = {
  action: null,
  status: "iddle",
  error: null,
  expireAt: null,

  user: {
    id: null,
    createdAt: null,
    updatedAt: null,
    email: null,
    firstName: null,
    lastName: null,
  },
};

/**
 * Gestionnaire d'état du profil d'un utilisateur authentifié
 *
 * @type {Slice}
 */
export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profilePending: (state, { payload: action }) => {
      state.isFetching = true;
      state.expireAt = null;
      state.action = action;
      state.status = "pending";
      state.error = null;
    },

    profileSuccess: (state, { payload: user }) => {
      state.error = null;
      state.expireAt = Date.now() + INTERVAL_USER_DATA_REFRESH;
      state.status = "success";
      state.user.id = user.id;
      state.user.createdAt = user.createdAt;
      state.user.updatedAt = user.createdAt;
      state.user.email = user.email;
      state.user.firstName = user.firstName;
      state.user.lastName = user.lastName;
    },

    profileError: (state, { payload: error }) => {
      state.status = "error";
      state.error = error;
    },

    profileUpdate: (state, { payload: user }) => {
      state.user.id = user.id;
      state.user.createdAt = user.createdAt;
      state.user.updatedAt = user.createdAt;
      state.user.email = user.email;
      state.user.firstName = user.firstName;
      state.user.lastName = user.lastName;
    },

    profileClear: (state) => {
      state.status = "iddle";
      state.error = null;
      state.user.id = null;
      state.user.createdAt = null;
      state.user.updatedAt = null;
      state.user.email = null;
      state.user.firstName = null;
      state.user.lastName = null;
    },
  },
});

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const {
  profilePending,
  profileSuccess,
  profileError,
  profileUpdate,
  profileClear,
} = profileSlice.actions;

export default profileSlice.reducer;
