import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "configs/store";

interface DarkModeState {
  isDark: boolean;
}

const initialState: DarkModeState = {
  isDark: JSON.parse(localStorage.getItem("isDark") || "false"),
};

const darkSlice = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    toggleDark: (state: DarkModeState) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export const { toggleDark } = darkSlice.actions;

export const selectIsDark = (state: RootState) => state.dark.isDark;

export default darkSlice.reducer;
