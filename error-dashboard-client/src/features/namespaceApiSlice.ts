import { baseApi } from "features/baseApi";
import type {
  ShortNamespaceData,
  NamespaceData,
  CreateNamespaceRequest,
  UpdateNamespaceRequest,
} from "types/Namespace";
import { PaginationWithId } from "shared/types/extra";

export const namespaceApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNamespace: builder.mutation<NamespaceData, CreateNamespaceRequest>({
      query: (new_namespace) => ({
        url: "/namespace/",
        method: "POST",
        body: new_namespace,
      }),
      invalidatesTags: ["AllNamespace"],
    }),
    getNamespacesByUser: builder.query<ShortNamespaceData[], PaginationWithId>({
      query: ({ id, offset = 0, limit = 10 }) => ({
        url: `/namespace/user/${id}`,
        method: "GET",
        params: { offset, limit },
      }),
      providesTags: ["AllNamespace"],
    }),
    getNamespaceById: builder.query<NamespaceData, string>({
      query: (id) => ({
        url: `/namespace/${id}`,
        method: "GET",
      }),
      providesTags: ["NamespaceDetail"],
    }),
    updateNamespaceById: builder.mutation<
      NamespaceData,
      UpdateNamespaceRequest
    >({
      query: (namespace) => ({
        url: `/namespace/${namespace.id}`,
        method: "PUT",
        body: namespace,
      }),
      invalidatesTags: ["NamespaceDetail"],
    }),
    getNamespaceErrors: builder.query<any, PaginationWithId>({
      query: ({ id, offset = 0, limit = 10 }: PaginationWithId) => ({
        url: `/namespace/${id}/errors`,
        method: "GET",
        params: { offset, limit },
      }),
    }),
    deleteNamespaceById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/namespace/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllNamespace"],
    }),
    namespaceWS: builder.query({
      query: (id) => ({
        url: `/namespace/${id}/ws`,
      }),
    }),
  }),
});

export const {
  useCreateNamespaceMutation,
  useGetNamespacesByUserQuery,
  useGetNamespaceByIdQuery,
  useUpdateNamespaceByIdMutation,
  useGetNamespaceErrorsQuery,
  useDeleteNamespaceByIdMutation,
  useNamespaceWSQuery,
} = namespaceApiSlice;
