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
    "AlertSubscribers",
    "AllNamespace",
    "BugReports",
    "ErrorDetail",
    "FeatureRequests",
    "NamespaceDetail",
    "NamespaceErrors",
    "Notifications",
    "UserProfile",
    "NamespaceAlerts",
    "User",
    "UserAlerts",
    "NamespaceMembers",
    "UserNamespaceRole",
  ],
});

export default baseApi;
