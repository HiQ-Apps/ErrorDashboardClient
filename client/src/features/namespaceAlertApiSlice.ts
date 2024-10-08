import { baseApi } from "features/baseApi";
import type {
  CreateNamespaceAlertRequest,
  UpdateNamespaceAlertRequest,
  NamespaceAlertSubscriptionRequest,
  ShortNamespaceAlert,
} from "types/NamespaceAlert";

export const namespaceAlertSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNamespaceAlertsByNamespaceId: builder.query<
      ShortNamespaceAlert[],
      string
    >({
      query: (id: string) => ({
        url: `/alert/namespace/${id}`,
        method: "GET",
      }),
      providesTags: ["NamespaceAlerts"],
    }),
    getNamespaceAlertsByUserId: builder.query<ShortNamespaceAlert[], string>({
      query: (id: string) => ({
        url: `/alert/user/${id}`,
        method: "GET",
      }),
      providesTags: ["UserAlerts"],
    }),
    createNamespaceAlert: builder.mutation<string, CreateNamespaceAlertRequest>(
      {
        query: (data) => ({
          url: `/alert/`,
          method: "POST",
          body: data,
        }),
        invalidatesTags: ["NamespaceAlerts", "UserAlerts"],
      }
    ),
    updateNamespaceAlert: builder.mutation<null, UpdateNamespaceAlertRequest>({
      query: (data) => ({
        url: `/alert`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["NamespaceAlerts", "UserAlerts"],
    }),
    deleteNamespaceAlertById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/alert/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NamespaceAlerts", "UserAlerts"],
    }),
    subscribeToNamespaceAlerts: builder.query<
      null,
      NamespaceAlertSubscriptionRequest
    >({
      query: () => ({
        url: `/alert/subscribe`,
        method: "POST",
      }),
    }),
    unsubscribeToNamespaceAlerts: builder.query<
      null,
      NamespaceAlertSubscriptionRequest
    >({
      query: () => ({
        url: `/alert/unsubscribe`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetNamespaceAlertsByNamespaceIdQuery,
  useGetNamespaceAlertsByUserIdQuery,
  useCreateNamespaceAlertMutation,
  useUpdateNamespaceAlertMutation,
  useDeleteNamespaceAlertByIdMutation,
  useSubscribeToNamespaceAlertsQuery,
  useUnsubscribeToNamespaceAlertsQuery,
} = namespaceAlertSlice;
