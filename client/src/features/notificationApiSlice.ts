import { baseApi } from "features/baseApi";

import type {
  NotificationStreamData,
  NotificationResponse,
} from "types/Notification";
import type { Pagination } from "shared/types/extra";

export const notificationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsByUserId: builder.query<NotificationResponse, Pagination>({
      query: ({ offset, limit }) => ({
        url: `/notification/`,
        method: "GET",
        params: {
          offset: offset,
          limit: limit,
        },
      }),
      providesTags: (result, _error, _args) =>
        result
          ? [
              ...result.notifications.map(({ id }) => ({
                type: "Notifications" as const,
                id,
              })),
              { type: "Notifications", id: "LIST" },
            ]
          : [{ type: "Notifications", id: "LIST" }],
    }),
    markNotificationAsRead: builder.mutation<void, string>({
      query: (notificationId) => ({
        url: `/notification/${notificationId}`,
        method: "PUT",
      }),
      invalidatesTags: (_result, _error, notificationId) => [
        { type: "Notifications", id: notificationId },
        { type: "Notifications", id: "LIST" },
      ],
    }),
    batchMarkNotificationAsRead: builder.mutation<void, string[]>({
      query: (notificationIds: string[]) => ({
        url: "/notification/",
        method: "PUT",
        body: notificationIds,
      }),
      invalidatesTags: (_result, _error, notificationIds) => [
        ...notificationIds.map((id) => ({
          type: "Notifications" as const,
          id,
        })),
        { type: "Notifications", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetNotificationsByUserIdQuery,
  useBatchMarkNotificationAsReadMutation,
  useMarkNotificationAsReadMutation,
} = notificationApiSlice;
