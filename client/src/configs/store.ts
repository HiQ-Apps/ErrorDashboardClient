import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "features/baseApi";
import authReducer from "features/authSlice";
import aggregateTableSlice from "features/aggregateTableSlice";
import darkReducer from "features/darkSlice";
import sidebarReducer from "features/sidebarSlice";
import modalReducer from "features/modalSlice";
import errorGraphReducer from "features/errorGraphSlice";
import errorBoundaryReducer from "features/errorBoundarySlice";
import timezoneReducer from "features/timezoneSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  aggregateTable: aggregateTableSlice,
  modal: modalReducer,
  dark: darkReducer,
  sidebar: sidebarReducer,
  errorGraph: errorGraphReducer,
  errorBoundary: errorBoundaryReducer,
  timezone: timezoneReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
