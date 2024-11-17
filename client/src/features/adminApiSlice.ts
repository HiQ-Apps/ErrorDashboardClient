import { baseApi } from "features/baseApi";

import type { ShortNamespaceData } from "types/Namespace";
import type { UserAdminData } from "types/User";

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
  }),
});

export const { useGetNamespacesAdminQuery, useGetUsersAdminQuery } =
  adminApiSlice;
