import { RootState } from "configs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType?: "createNamespace" | "confirmation" | "login" | "registration";
  onConfirm?: (credentials: { password: string }) => void;
  onReject?: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: undefined,
  onConfirm: undefined,
  onReject: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        onConfirm?: (credentials: { password: string }) => void;
        modalType:
          | "createNamespace"
          | "confirmation"
          | "login"
          | "registration";
        onReject?: () => void;
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.onConfirm = action.payload.onConfirm;
      state.onReject = action.payload.onReject;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = undefined;
      state.onConfirm = undefined;
      state.onReject = undefined;
    },
    confirm: (state, action: PayloadAction<{ password: string }>) => {
      if (state.onConfirm) state.onConfirm(action.payload);
      state.isOpen = false;
      state.onConfirm = undefined;
      state.onReject = undefined;
    },
    reject: (state) => {
      if (state.onReject) state.onReject();
      state.isOpen = false;
      state.onConfirm = undefined;
      state.onReject = undefined;
    },
  },
});

export const { openModal, closeModal, confirm, reject } = modalSlice.actions;

export const selectIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalType = (state: RootState) => state.modal.modalType;

export default modalSlice.reducer;
