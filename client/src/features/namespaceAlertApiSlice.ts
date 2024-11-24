import { baseApi } from "features/baseApi";
import type {
  CreateNamespaceAlertRequest,
  UpdateNamespaceAlertRequest,
  NamespaceAlertSubscriptionRequest,
  ShortNamespaceAlert,
} from "types/NamespaceAlert";
import type { ShortUserProfile, UserMemberData } from "types/User";

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
    subscribeToNamespaceAlerts: builder.mutation<
      string,
      NamespaceAlertSubscriptionRequest
    >({
      query: (subscription: NamespaceAlertSubscriptionRequest) => ({
        url: `/alert/subscribe`,
        method: "POST",
        body: subscription,
      }),
      invalidatesTags: ["AlertSubscribers"],
    }),
    getSubscriptions: builder.query<UserMemberData[], string>({
      query: (id: string) => ({
        url: `/alert/${id}/subscriptions`,
        method: "GET",
      }),
      providesTags: ["AlertSubscribers"],
    }),
  }),
});

export const {
  useGetNamespaceAlertsByNamespaceIdQuery,
  useGetNamespaceAlertsByUserIdQuery,
  useCreateNamespaceAlertMutation,
  useUpdateNamespaceAlertMutation,
  useDeleteNamespaceAlertByIdMutation,
  useSubscribeToNamespaceAlertsMutation,
  useGetSubscriptionsQuery,
} = namespaceAlertSlice;
