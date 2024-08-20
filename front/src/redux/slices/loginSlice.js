import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isFetching: false,
  error: null,

  remember: false,
  token: null,
  firstName: null,
};

const token = localStorage.getItem("token");
if (token) {
  initialState.remember = true;
  initialState.token = token;
  initialState.firstName = localStorage.getItem("firstName");
}

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

const { actions, reducer } = loginSlice;

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
