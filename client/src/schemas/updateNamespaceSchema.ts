import { z } from "zod";

export const updateNamespaceSchema = z.object({
  active: z.boolean().nullable(),
  clientId: z.string().length(36).nullable(),
  clientSecret: z.string().nullable(),
  serviceName: z.string().min(1).max(35).nullable(),
  environmentType: z.string().min(1).max(35).nullable(),
});

export type UpdateNamespaceSchema = z.infer<typeof updateNamespaceSchema>;
