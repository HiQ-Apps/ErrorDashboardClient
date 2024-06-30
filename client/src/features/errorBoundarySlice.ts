import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "configs/store";

interface ErrorBoundaryState {
  hasError: boolean;
  error: { message: string; name: string; stack?: string } | null;
  errorInfo: { componentStack: string } | null;
}

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorInfo: null,
};

const errorBoundarySlice = createSlice({
  name: "errorBoundary",
  initialState,
  reducers: {
    setError(
      state,
      action: PayloadAction<{
        error: { message: string; name: string; stack?: string };
        errorInfo: { componentStack: string };
      }>
    ) {
      state.hasError = true;
      state.error = action.payload.error;
      state.errorInfo = action.payload.errorInfo;
    },
    clearError(state) {
      state.hasError = false;
      state.error = null;
      state.errorInfo = null;
    },
  },
});

export const { setError, clearError } = errorBoundarySlice.actions;

export const selectHasError = (state: RootState) =>
  state.errorBoundary.hasError;
export const selectError = (state: RootState) => state.errorBoundary.error;
export const selectErrorInfo = (state: RootState) =>
  state.errorBoundary.errorInfo;

export default errorBoundarySlice.reducer;
