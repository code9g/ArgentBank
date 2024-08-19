import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
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

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    profileFetching: (state) => {
      state.status = "fetching";
    },

    profileSuccess: (state, { payload }) => {
      state.status = "success";
      state.error = null;

      state.user.id = payload.id;
      state.user.createdAt = payload.createdAt;
      state.user.updatedAt = payload.createdAt;
      state.user.email = payload.email;
      state.user.firstName = payload.firstName;
      state.user.lastName = payload.lastName;
    },

    profileError: (state, { payload }) => {
      state.status = "error";
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

    profileClear: (state) => {
      state.status = "pending";
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

const { actions, reducer } = profileSlice;
export const {
  profileFetching,
  profileSuccess,
  profileError,
  profileUpdate,
  profileClear,
} = actions;

export default reducer;
