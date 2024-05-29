import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

const authSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      console.log("setting token", action.payload);
      state.token = action.payload;
    },
    clearToken: (state) => {
      console.log("clearing token");
      state.token = null;
    },
    setUser: (state, action: PayloadAction<ShortUserData>) => {
      console.log("setting user", action.payload);
      state.user = action.payload;
    },
    clearUser: (state) => {
      console.log("clearing user");
      state.user = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      console.log("setting auth", action.payload);
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser, clearUser, setIsAuthenticated } =
  authSlice.actions;

export const selectAuthToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
