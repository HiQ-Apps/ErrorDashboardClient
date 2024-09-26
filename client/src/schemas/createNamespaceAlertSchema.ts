import { z } from "zod";

export const createNamespaceAlertSchema = z.object({
  namespaceId: z.string(),
  alertMethod: z.string(),
  errorName: z.string(),
  path: z.string(),
  line: z.number(),
  message: z.string(),
  stackTrace: z.string(),
  countThreshold: z.number(),
  timeWindow: z.number(),
  unresolvedTimeThreshold: z.number(),
  rateThreshold: z.number(),
  rateTimeWindow: z.number(),
});

export type CreateNamespaceAlertSchema = z.infer<
  typeof createNamespaceAlertSchema
>;
