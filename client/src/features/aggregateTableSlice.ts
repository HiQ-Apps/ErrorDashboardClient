import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "configs/store";

interface AggregateTableState {
  params: { offset: number; limit: number; group_by: string };
}

const initialState: AggregateTableState = {
  params: { offset: 0, limit: 10, group_by: "status_code" },
};

let aggregateTableSlice = createSlice({
  name: "AggregateTable",
  initialState,
  reducers: {
    setOffset: (state: AggregateTableState, action) => {
      state.params.offset = action.payload;
    },
    setLimit: (state: AggregateTableState, action) => {
      state.params.limit = action.payload;
    },
    setGroupBy: (state: AggregateTableState, action) => {
      state.params.group_by = action.payload;
    },
    resetParams: (state: AggregateTableState) => {
      state.params = initialState.params;
    },
  },
});

export const { setOffset, setLimit, setGroupBy } = aggregateTableSlice.actions;

export const selectParams = (state: RootState) => state.aggregateTable.params;

export default aggregateTableSlice.reducer;
