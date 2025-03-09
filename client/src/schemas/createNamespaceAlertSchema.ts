import { z } from "zod";

export const createNamespaceAlertSchema = z.object({
  namespaceId: z.string(),
  alertMethod: z.enum(["email", "slack", "discord", "text"]),
  discordChannelId: z.string().optional(),
  path: z.string().optional(),
  line: z.number().optional(),
  message: z.string().optional(),
  stackTrace: z.string().optional(),
  countThreshold: z.number().optional(),
  timeWindow: z.number().optional(),
  unresolvedTimeThreshold: z.number().optional(),
  rateThreshold: z.number().min(0).max(100).optional(),
  rateTimeWindow: z.number().optional(),
});

export type CreateNamespaceAlertSchema = z.infer<
  typeof createNamespaceAlertSchema
>;
