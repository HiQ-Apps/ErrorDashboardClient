import { baseApi } from "features/baseApi";
import { FeatureRequest } from "types/FeatureRequest";

import type { ShortNamespaceData } from "types/Namespace";
import type { VerifyUserRequest, UserAdminData } from "types/User";

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
    verifyAdmin: builder.mutation<void, VerifyUserRequest>({
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
  useVerifyAdminMutation,
} = adminApiSlice;
