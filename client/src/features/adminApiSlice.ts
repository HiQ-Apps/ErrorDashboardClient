import { baseApi } from "features/baseApi";

import type { ShortNamespaceData } from "types/Namespace";
import { VerifyUserRequest, type UserAdminData } from "types/User";

export const adminApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNamespacesAdmin: builder.query<ShortNamespaceData[], void>({
      query: () => ({
        url: `/admin/namespaces`,
        method: "GET",
      }),
    }),
    getUsersAdmin: builder.query<UserAdminData[], void>({
      query: () => ({
        url: `/admin/users`,
        method: "GET",
      }),
    }),
    verifyAdmin: builder.query<void, string>({
      query: (password) => ({
        url: "/admin/verify",
        method: "POST",
        body: password,
      }),
    }),
  }),
});

export const {
  useGetNamespacesAdminQuery,
  useGetUsersAdminQuery,
  useVerifyAdminQuery,
} = adminApiSlice;
