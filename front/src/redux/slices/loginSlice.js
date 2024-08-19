import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
    signIn: (state, { payload: { token, firstName, remember } }) => {
      state.token = token;
      state.remember = remember;
      state.firstName = firstName;
      if (remember) {
        localStorage.setItem("token", token);
        localStorage.setItem("firstName", firstName);
      }
    },

    updateFirstName: (state, { payload }) => {
      state.firstName = payload;
    },

    signOut: (state) => {
      localStorage.clear();
      state.token = null;
      state.remember = false;
      state.firstName = null;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { signIn, updateFirstName, signOut } = actions;

export default reducer;
