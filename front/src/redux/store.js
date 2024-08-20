import { configureStore } from "@reduxjs/toolkit";
import { loginSlice } from "./slices/loginSlice";
import { profileSlice } from "./slices/profileSlice";

/**
 * Constante du "store" de l'application
 *
 * @type {*}
 */
const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    profile: profileSlice.reducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
