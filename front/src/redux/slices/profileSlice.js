import { createSlice } from "@reduxjs/toolkit";
import {
  ERROR_STATUS,
  GET_ACTION,
  IDLE_STATUS,
  INTERVAL_USER_DATA_REFRESH,
  PENDING_STATUS,
  PUT_ACTION,
  SUCCESS_STATUS,
} from "../../utils/consts";
import { getProfileThunk, updateProfileThunk } from "../thunks";

/**
 * Données initiales de l'état de connexion (profileSlice)
 *
 * @type {{ action: string | null; status: string | null;  error: string | null; expireAt: integer; user: {id: string?, createdAt: string?, updatedAt: string?, email: string?, firstName: string?, lastName: string?}}}
 */
const initialState = {
  action: null,
  status: IDLE_STATUS,
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
    profileClearError: (state) => {
      state.status = IDLE_STATUS;
      state.error = null;
    },
    profileClear: (state) => {
      state.status = IDLE_STATUS;
      state.error = null;
      state.user.id = null;
      state.user.createdAt = null;
      state.user.updatedAt = null;
      state.user.email = null;
      state.user.firstName = null;
      state.user.lastName = null;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(getProfileThunk.pending, (state) => {
        state.expireAt = null;
        state.action = GET_ACTION;
        state.status = PENDING_STATUS;
        state.error = null;
      })
      .addCase(getProfileThunk.fulfilled, (state, { payload: user }) => {
        state.error = null;
        state.expireAt = Date.now() + INTERVAL_USER_DATA_REFRESH;
        state.status = SUCCESS_STATUS;
        state.user.id = user.id;
        state.user.createdAt = user.createdAt;
        state.user.updatedAt = user.updatedAt;
        state.user.email = user.email;
        state.user.firstName = user.firstName;
        state.user.lastName = user.lastName;
      })
      .addCase(getProfileThunk.rejected, (state, { error: { message } }) => {
        state.status = ERROR_STATUS;
        state.error = message;
      })
      .addCase(updateProfileThunk.pending, (state) => {
        state.expireAt = null;
        state.action = PUT_ACTION;
        state.status = PENDING_STATUS;
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, { payload: user }) => {
        state.error = null;
        state.expireAt = Date.now() + INTERVAL_USER_DATA_REFRESH;
        state.status = SUCCESS_STATUS;
        state.user.id = user.id;
        state.user.createdAt = user.createdAt;
        state.user.updatedAt = user.updatedAt;
        state.user.email = user.email;
        state.user.firstName = user.firstName;
        state.user.lastName = user.lastName;
      })
      .addCase(updateProfileThunk.rejected, (state, { error: { message } }) => {
        state.status = ERROR_STATUS;
        state.error = message;
      }),
});

/**
 * Exportation des actions pour le dispatch de ce slice
 *
 * @type {ActionCreator}
 */
export const { profileClear, profileClearError } = profileSlice.actions;

export default profileSlice.reducer;
