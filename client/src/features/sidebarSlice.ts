import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "configs/store";

interface SidebarState {
  isOpen: boolean;
  isLoading: boolean;
}

const initialState: SidebarState = {
  isOpen: JSON.parse(localStorage.getItem("isOpen") || "true"),
  isLoading: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleIsOpen: (state) => {
      state.isOpen = !state.isOpen;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
    setIsOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
      localStorage.setItem("isOpen", JSON.stringify(state.isOpen));
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleIsOpen, setIsOpen, setIsLoading } = sidebarSlice.actions;

export const selectIsLoading = (state: RootState): boolean =>
  state.sidebar.isLoading;

export const selectIsOpen = (state: RootState): boolean => state.sidebar.isOpen;

export default sidebarSlice.reducer;
