import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "configs/store";

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: JSON.parse(localStorage.getItem("isOpen") || "true"),
};

const sidebarSlice = createSlice({
  name: "Sidebar",
  initialState,
  reducers: {
    isOpen: (state: SidebarState) => {
      state.isOpen = !state.isOpen;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
    setIsOpen: (state: SidebarState, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
  },
});

export const { isOpen, setIsOpen } = sidebarSlice.actions;

export const selectIsOpen = (state: RootState) => state.sidebar.isOpen;

export default sidebarSlice.reducer;
