import { createSlice } from "@reduxjs/toolkit";

/**
 * Données initiales de l'état de connexion (profileSlice)
 *
 * @type {{ isFetching: boolean; error: string | null; user: {id: string?, createdAt: string?, updatedAt: string?, email: string?, firstName: string?, lastName: string?}}}
 */
const initialState = {
  isFetching: false,
  error: null,

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
    profileFetching: (state) => {
      state.isFetching = true;
    },

    profileSuccess: (state, { payload }) => {
      state.error = null;

      state.user.id = payload.id;
      state.user.createdAt = payload.createdAt;
      state.user.updatedAt = payload.createdAt;
      state.user.email = payload.email;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
    },

    profileError: (state, { payload }) => {
      state.error = payload;
    },

    profileUpdate: (state, { payload }) => {
      state.user.id = payload.id;
      state.user.createdAt = payload.createdAt;
      state.user.updatedAt = payload.createdAt;
      state.user.email = payload.email;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
    },

    profileDone: (state) => {
      state.isFetching = false;
    },

    profileClear: (state) => {
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

export const { actions, reducer } = profileSlice;

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const {
  profileFetching,
  profileSuccess,
  profileError,
  profileDone,
  profileUpdate,
  profileClear,
} = actions;

export default reducer;
