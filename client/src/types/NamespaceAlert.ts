export type AlertMethod = "email" | "discord" | "slack";

export type NamespaceAlert = {
  id: string;
  namespaceId: string;
  alertMethod: AlertMethod;
  discordChannelId: number;
  path: string;
  line: number;
  message: string;
  stackTrace: string;
  countThreshold: number;
  timeWindow: number;
  unresolvedTimeThreshold: number;
  rateThreshold: number;
  rateTimeWindow: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNamespaceAlertRequest = Partial<
  Omit<NamespaceAlert, "id" | "createdAt" | "updatedAt">
>;

export type ShortNamespaceAlert = Omit<
  NamespaceAlert,
  "createdAt" | "updatedAt"
>;

export type UpdateNamespaceAlertRequest =
  Partial<CreateNamespaceAlertRequest> & {
    id: string;
  };

export type NamespaceAlertSubscriptionRequest = {
  namespaceId: string;
  namespaceAlertId: string;
  userId: string;
};
