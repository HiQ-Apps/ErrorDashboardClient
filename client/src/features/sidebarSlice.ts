import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "configs/store";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: JSON.parse(localStorage.getItem("isOpen") || "false"),
};

let sidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    toggleDark: (state: SidebarState) => {
      state.isOpen = !state.isOpen;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
    setDarkMode: (state: SidebarState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
  },
});

export const { toggleDark, setDarkMode } = sidebarSlice.actions;

export const selectIsDark = (state: RootState) => state.dark.isDark;

export default sidebarSlice.reducer;
