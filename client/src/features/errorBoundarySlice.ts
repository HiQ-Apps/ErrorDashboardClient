import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "configs/store";

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
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
      action: PayloadAction<{ error: Error; errorInfo: React.ErrorInfo }>
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
