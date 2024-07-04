import { z } from "zod";

export const updateNamespaceSchema = z.object({
  active: z.boolean().nullable(),
  client_id: z.string().length(36).nullable(),
  client_secret: z.string().nullable(),
  service_name: z.string().min(1).max(35).nullable(),
  environment_type: z.string().min(1).max(35).nullable(),
});

export type UpdateNamespaceSchema = z.infer<typeof updateNamespaceSchema>;
