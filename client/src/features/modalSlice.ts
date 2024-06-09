import { RootState } from "configs/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType?: "createNamespace" | "confirmation" | "login" | "registration";
}

const initialState: ModalState = {
  isOpen: false,
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
          | "registration";
      }>
    ) => {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalType = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectIsOpen = (state: RootState) => state.modal.isOpen;
export const selectModalType = (state: RootState) => state.modal.modalType;

export default modalSlice.reducer;
