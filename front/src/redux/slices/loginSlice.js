import { createSlice } from "@reduxjs/toolkit";

export const PENDING_STATUS = "pending";
export const FETCHING_STATUS = "fetching";
export const SUCCESS_STATUS = "success";
export const ERROR_STATUS = "error";
export const DISCONNECTING_STATUS = "disconnecting";
export const DISCONNECTED_STATUS = "disconnected";

const initialState = {
  status: PENDING_STATUS,
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
      state.status = FETCHING_STATUS;
    },

    loginSuccess: (state, { payload }) => {
      state.status = SUCCESS_STATUS;
      state.error = null;
      state.token = payload.token;
      state.firstName = payload.firstName;
      state.remember = payload.remember;
      if (payload.remember) {
        localStorage.setItem("token", payload.token);
        localStorage.setItem("firstName", payload.firstName);
      }
    },
    loginUpdateFirstName: (state, { payload }) => {
      state.firstName = payload;
      if (state.remember) {
        localStorage.setItem("firstName", payload);
      }
    },

    loginDisconnecting: (state) => {
      state.status = DISCONNECTING_STATUS;
    },

    loginDisconnected: (state) => {
      localStorage.clear();
      state.token = null;
      state.remember = false;
      state.status = DISCONNECTED_STATUS;
    },

    loginError: (state, { payload: error }) => {
      state.status = ERROR_STATUS;
      state.error = error;
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
  loginUpdateFirstName,
} = actions;

export default reducer;
