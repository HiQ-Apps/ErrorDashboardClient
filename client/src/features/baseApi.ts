import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "configs/store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: [
    "User",
    "AllNamespace",
    "NamespaceDetail",
    "ErrorDetail",
    "NamespaceErrors",
    "UserProfile",
    "NamespaceAlerts",
    "UserAlerts",
    "AlertSubscribers",
    "NamespaceMembers",
    "UserNamespaceRole",
  ],
});

export default baseApi;
