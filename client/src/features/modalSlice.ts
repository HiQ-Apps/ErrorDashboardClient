import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  onConfirm?: () => void;
  onReject?: () => void;
}

const initialState: ModalState = {
  isOpen: false,
  onConfirm: undefined,
  onReject: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ onConfirm?: () => void; onReject?: () => void }>
    ) => {
      state.isOpen = true;
      state.onConfirm = action.payload.onConfirm;
      state.onReject = action.payload.onReject;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.onConfirm = undefined;
      state.onReject = undefined;
    },
    confirm: (state) => {
      if (state.onConfirm) state.onConfirm();
      state.isOpen = false;
    },
    reject: (state) => {
      if (state.onReject) state.onReject();
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal, confirm, reject } = modalSlice.actions;

export default modalSlice.reducer;
