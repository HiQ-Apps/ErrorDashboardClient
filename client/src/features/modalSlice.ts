import type { RootState } from "configs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  isLoading?: boolean;
  modalType?:
    | "createNamespace"
    | "confirmation"
    | "login"
    | "registration"
    | "createTag";
}

const initialState: ModalState = {
  isOpen: false,
  isLoading: false,
  modalType: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        modalType:
          | "createNamespace"
          | "confirmation"
          | "login"
          | "registration"
          | "createTag";
      }>
    ) => {
      console.log("open modal");
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      console.log("close modal");
      state.isOpen = false;
      state.modalType = undefined;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { openModal, closeModal, setIsLoading } = modalSlice.actions;

export const selectIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalType = (state: RootState) => state.modal.modalType;
export const selectIsLoading = (state: RootState) => state.modal.isLoading;

export default modalSlice.reducer;
