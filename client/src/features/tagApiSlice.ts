import { baseApi } from "features/baseApi";
import type { CreateTagType } from "types/Tag";

export const tagApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTag: builder.mutation<null, CreateTagType>({
      query: (new_tag) => ({
        url: "/tag/",
        method: "POST",
        body: new_tag,
      }),
      invalidatesTags: ["ErrorDetail", "NamespaceDetail", "NamespaceErrors"],
    }),
    deleteTag: builder.mutation<null, string>({
      query: (id) => ({
        url: `/tag/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ErrorDetail", "NamespaceDetail", "NamespaceErrors"],
    }),
  }),
});

export const { useCreateTagMutation, useDeleteTagMutation } = tagApiSlice;
