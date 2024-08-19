import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  remember: false,
  token: null,
};

const token = localStorage.getItem("token");
if (token) {
  initialState.remember = true;
  initialState.token = token;
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    signIn: (state, { payload: { token, remember } }) => {
      state.token = token;
      state.remember = remember;
      if (remember) {
        localStorage.setItem("token", token);
      }
    },
    signOut: (state) => {
      localStorage.removeItem("token");
      state.token = null;
      state.remember = false;
    },
  },
});

const { actions, reducer } = loginSlice;

export const { signIn, signOut } = actions;

export default reducer;
