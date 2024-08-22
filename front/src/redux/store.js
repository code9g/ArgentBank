import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import profileReducer from "./slices/profileSlice";

/**
 * Constante du "store" de l'application
 *
 * @type {*}
 */
const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
  },
  devTools: import.meta.env.DEV,
});

export default store;
