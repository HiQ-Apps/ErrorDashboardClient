import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "configs/store";
import { ShortUserData } from "types/User";

interface AuthState {
  token: string | null;
  user: ShortUserData | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

let authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state: AuthState, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    clearToken: (state: AuthState) => {
      state.token = null;
    },
    setUser: (state: AuthState, action: PayloadAction<ShortUserData>) => {
      state.user = action.payload;
    },
    clearUser: (state: AuthState) => {
      state.user = null;
    },
    setIsAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    clearAuth(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  setToken,
  clearToken,
  setUser,
  clearUser,
  setIsAuthenticated,
  clearAuth,
} = authSlice.actions;

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
