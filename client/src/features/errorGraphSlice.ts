import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { type RootState } from "configs/store";
import { GetErrorAggregateRequest } from "types/Error";

interface ErrorGraphState {
  data: GetErrorAggregateRequest | null;
  status: "success" | "loading" | "failed" | "idle";
  error: string | null;
}

const initialState: ErrorGraphState = {
  data: null,
  status: "idle",
  error: null,
};

export const errorGraphSlice = createSlice({
  name: "errorGraph",
  initialState,
  reducers: {
    setErrorGraphRequestParams: (
      state,
      action: PayloadAction<GetErrorAggregateRequest>
    ) => {
      state.data = action.payload;
      state.status = "success";
      state.error = null;
    },
    // use is loading and error to show loading and error states
    setLoading: (state) => {
      state.status = "loading";
    },
    setError: (state, action: PayloadAction<string>) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export default errorGraphSlice.reducer;
export const { setErrorGraphRequestParams, setLoading, setError } =
  errorGraphSlice.actions;
export const selectData = (state: RootState) => state.errorGraph.data;
export const selectStatus = (state: RootState) => state.errorGraph.status;
export const selectError = (state: RootState) => state.errorGraph.error;
