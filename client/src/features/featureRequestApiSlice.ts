import { baseApi } from "features/baseApi";
import type {
  CreateFeatureRequest,
  FeatureRequest,
} from "types/FeatureRequest";

export const featureRequestSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFeatureRequest: builder.mutation<void, CreateFeatureRequest>({
      query: (data) => ({
        url: "/feature-request/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FeatureRequests"],
    }),
    getAllFeatureRequests: builder.query<FeatureRequest[], void>({
      query: () => ({
        url: "/feature-request/",
        method: "GET",
      }),
      providesTags: ["FeatureRequests"],
    }),
    updateFeatureRequest: builder.mutation<void, FeatureRequest>({
      query: (data) => ({
        url: `/feature-request/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FeatureRequests"],
    }),
    deleteFeatureRequest: builder.mutation<void, number>({
      query: (id) => ({
        url: `/feature-request/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FeatureRequests"],
    }),
  }),
});

export const {
  useCreateFeatureRequestMutation,
  useGetAllFeatureRequestsQuery,
  useUpdateFeatureRequestMutation,
  useDeleteFeatureRequestMutation,
} = featureRequestSlice;
