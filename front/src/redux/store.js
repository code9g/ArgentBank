import { configureStore } from "@reduxjs/toolkit";
import bankApi from "./services/bankApi";
import authReducer from "./slices/authSlice";

/**
 * Constante du "store" de l'application
 *
 * @type {*}
 */
const store = configureStore({
  reducer: {
    [bankApi.reducerPath]: bankApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bankApi.middleware),
  devTools: import.meta.env.DEV,
});

export default store;
