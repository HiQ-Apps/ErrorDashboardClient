import { baseApi } from "features/baseApi";

import type { NotificationStreamData } from "types/Notification";

export const notificationApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotificationsByUserId: builder.query<NotificationStreamData[], string>({
      query: (userId) => ({
        url: `/notification/user/${userId}`,
        method: "GET",
      }),
    }),
    markNotificationAsRead: builder.mutation<void, string>({
      query: (notificationId) => ({
        url: `/notification/${notificationId}`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetNotificationsByUserIdQuery,
  useMarkNotificationAsReadMutation,
} = notificationApiSlice;
