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
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
    setUser: (state, action: PayloadAction<ShortUserData>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setToken, clearToken, setUser, clearUser, setIsAuthenticated } =
  authSlice.actions;

export const selectAuthToken = (state: RootState) => state.auth.token;

export default authSlice.reducer;
