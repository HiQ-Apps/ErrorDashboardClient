import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "features/baseApi";
import authReducer from "features/authSlice";
import darkReducer from "features/darkSlice";
import sidebarReducer from "features/sidebarSlice";
import modalReducer from "features/modalSlice";
import errorBoundaryReducer from "features/errorBoundarySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    modal: modalReducer,
    dark: darkReducer,
    sidebar: sidebarReducer,
    errorBoundary: errorBoundaryReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
