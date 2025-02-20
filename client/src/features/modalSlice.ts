import type { RootState } from "configs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  isLoading?: boolean;
  modalType?:
    | "bugReport"
    | "createNamespace"
    | "confirmation"
    | "login"
    | "registration"
    | "createTag"
    | "mobileWarning"
    | "namespaceInviteUser";
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
          | "bugReport"
          | "confirmation"
          | "createNamespace"
          | "createTag"
          | "login"
          | "registration"
          | "mobileWarning"
          | "namespaceInviteUser";
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
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
