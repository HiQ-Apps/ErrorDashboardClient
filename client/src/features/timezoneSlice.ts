import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "configs/store";
import type { TimeZone } from "shared/types/extra";

interface TimezoneState {
  timezone: TimeZone;
}

const timezoneItem = localStorage.getItem("timezone");
const initialState: TimezoneState = {
  timezone: timezoneItem ? JSON.parse(timezoneItem) : "America/New_York",
};

const timezoneSlice = createSlice({
  name: "timezone",
  initialState,
  reducers: {
    setTimeZone: (state: TimezoneState, action: PayloadAction<TimeZone>) => {
      state.timezone = action.payload;
      localStorage.setItem("timezone", JSON.stringify(state.timezone));
    },
  },
});

export const { setTimeZone } = timezoneSlice.actions;

export const selectTimeZone = (state: RootState) => state.timezone.timezone;

export default timezoneSlice.reducer;
