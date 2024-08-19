import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  createdAt: null,
  updatedAt: null,
  email: null,
  firstName: null,
  lastName: null,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setAll: (state, action) => {
      state.id = action.payload.id;
      state.createdAt = action.payload.createdAt;
      state.updatedAt = action.payload.createdAt;
      state.email = action.payload.email;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
    },
    clear: (state) => {
      state.id = null;
      state.createdAt = null;
      state.updatedAt = null;
      state.email = null;
      state.firstName = null;
      state.lastName = null;
    },
  },
});

const { actions, reducer } = profileSlice;
export const { setAll, clear } = actions;

export default reducer;
