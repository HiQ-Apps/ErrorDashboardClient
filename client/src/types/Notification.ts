export type NotificationDTO = {
  id: string;
  title: string;
  source: string;
  text: string;
  userId: string;
  isRead: boolean;
  createdAt: Date;
};

export type NotificationStreamData = Omit<NotificationDTO, "createdAt"> & {
  createdAt: string;
};
