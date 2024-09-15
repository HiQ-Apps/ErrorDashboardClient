import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "features/baseApi";
import authReducer from "features/authSlice";
import aggregateTableSlice from "features/aggregateTableSlice";
import darkReducer from "features/darkSlice";
import errorGraphReducer from "features/errorGraphSlice";
import errorBoundaryReducer from "features/errorBoundarySlice";
import modalReducer from "features/modalSlice";
import sidebarReducer from "features/sidebarSlice";
import timezoneReducer from "features/timezoneSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  aggregateTable: aggregateTableSlice,
  dark: darkReducer,
  errorGraph: errorGraphReducer,
  errorBoundary: errorBoundaryReducer,
  modal: modalReducer,
  sidebar: sidebarReducer,
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
