import { baseApi } from "features/baseApi";

export const namespaceApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNamespace: builder.mutation({
      query: (new_namespace) => ({
        url: "/namespace/",
        method: "POST",
        body: new_namespace,
      }),
      invalidatesTags: ["Namespace"],
    }),
    getNamespacesByUser: builder.query({
      query: (userId, offset = 0, limit = 10) => ({
        url: `/namespace/user/${userId}`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: ["Namespace"],
    }),
  }),
});

export const { useCreateNamespaceMutation, useGetNamespacesByUserQuery } =
  namespaceApiSlice;
