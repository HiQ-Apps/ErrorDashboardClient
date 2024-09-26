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
        url: `/alerts/namespace/${id}`,
        method: "GET",
      }),
    }),
    getNamespaceAlertsByUserId: builder.query<ShortNamespaceAlert[], string>({
      query: (id: string) => ({
        url: `/alerts/user/${id}`,
        method: "GET",
      }),
    }),
    createNamespaceAlert: builder.mutation<string, CreateNamespaceAlertRequest>(
      {
        query: (data) => ({
          url: `/alerts`,
          method: "POST",
          body: data,
        }),
      }
    ),
    updateNamespaceAlert: builder.mutation<null, UpdateNamespaceAlertRequest>({
      query: (data) => ({
        url: `/alerts`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteNamespaceAlertById: builder.mutation<string, string>({
      query: (id: string) => ({
        url: `/alerts/${id}`,
        method: "DELETE",
      }),
    }),
    subscribeToNamespaceAlerts: builder.query<
      null,
      NamespaceAlertSubscriptionRequest
    >({
      query: () => ({
        url: `/alerts/subscribe`,
        method: "POST",
      }),
    }),
    unsubscribeToNamespaceAlerts: builder.query<
      null,
      NamespaceAlertSubscriptionRequest
    >({
      query: () => ({
        url: `/alerts/unsubscribe`,
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
