import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "configs/store";

type GroupByType = "message" | "tags" | "line";

interface AggregateTableState {
  params: { offset: number; limit: number; groupBy: GroupByType };
}

const initialState: AggregateTableState = {
  params: { offset: 0, limit: 100, groupBy: "message" },
};

const aggregateTableSlice = createSlice({
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
      state.params.groupBy = action.payload;
    },
    resetParams: (state: AggregateTableState) => {
      state.params = initialState.params;
    },
  },
});

export const { setOffset, setLimit, setGroupBy } = aggregateTableSlice.actions;

export const selectParams = (state: RootState) => state.aggregateTable.params;

export default aggregateTableSlice.reducer;
