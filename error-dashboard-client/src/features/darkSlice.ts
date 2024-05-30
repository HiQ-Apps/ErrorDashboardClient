import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "configs/store";

interface DarkModeState {
  isDark: boolean;
}

// Initialize the state from localStorage or default to false
const initialState: DarkModeState = {
  isDark: JSON.parse(localStorage.getItem("isDark") || "false"),
};

let darkSlice = createSlice({
  name: "DarkMode",
  initialState,
  reducers: {
    toggleDark: (state) => {
      state.isDark = !state.isDark;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
    setDarkMode: (state, action) => {
      state.isDark = action.payload;
      localStorage.setItem("isDark", JSON.stringify(state.isDark));
    },
  },
});

export const { toggleDark, setDarkMode } = darkSlice.actions;

export const selectIsDark = (state: RootState) => state.dark.isDark;

export default darkSlice.reducer;
