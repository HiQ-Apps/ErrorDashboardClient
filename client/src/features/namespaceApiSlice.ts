import { createSelector } from "@reduxjs/toolkit";

import { baseApi } from "features/baseApi";
import type {
  ShortNamespaceData,
  NamespaceData,
  CreateNamespaceRequest,
  UpdateNamespaceRequest,
} from "types/Namespace";
import type { AggregateErrorResponseData } from "types/Error";
import type { QueryParamWithId, PaginationWithId } from "shared/types/extra";
import { ShortUserData, UserMemberData } from "types/User";

export const namespaceApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createNamespace: builder.mutation<string, CreateNamespaceRequest>({
      query: (newNamespace) => ({
        url: "/namespace/",
        method: "POST",
        body: newNamespace,
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
      keepUnusedDataFor: 3600,
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
      invalidatesTags: ["NamespaceDetail", "AllNamespace"],
    }),
    getNamespaceErrors: builder.query<
      AggregateErrorResponseData,
      QueryParamWithId
    >({
      query: ({
        id,
        offset = 0,
        limit = 10,
        groupBy = "statusCode",
      }: QueryParamWithId) => ({
        url: `/namespace/${id}/errors`,
        method: "GET",
        params: { offset, limit, groupBy },
      }),
      providesTags: ["NamespaceErrors"],
    }),
    deleteNamespaceById: builder.mutation<string, string>({
      query: (id) => ({
        url: `/namespace/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AllNamespace"],
    }),
    inviteUserToNamespace: builder.mutation({
      query: ({ userId, namespaceId, role }) => ({
        url: `/namespace/${namespaceId}/invite`,
        method: "POST",
        body: { userId, role },
      }),
    }),
    removeUserFromNamespace: builder.mutation({
      query: ({ userId, namespaceId }) => ({
        url: `/namespace/${namespaceId}/remove/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NamespaceMembers"],
    }),
    getNamespaceMembers: builder.query<UserMemberData[], string>({
      query: (id) => ({
        url: `/namespace/${id}/members`,
        method: "GET",
      }),
      providesTags: ["NamespaceMembers"],
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
  useInviteUserToNamespaceMutation,
  useRemoveUserFromNamespaceMutation,
  useGetNamespaceMembersQuery,
} = namespaceApiSlice;

export const selectNamespaceById = (id: string) =>
  createSelector(
    [namespaceApiSlice.endpoints.getNamespaceById.select(id)],
    (namespaceResult) => namespaceResult?.data
  );
