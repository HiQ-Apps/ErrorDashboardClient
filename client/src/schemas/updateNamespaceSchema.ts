import { z } from "zod";

export const updateNamespaceSchema = z.object({
  active: z.boolean().nullable(),
  client_id: z.string().min(1).max(25).nullable(),
  client_secret: z.string().min(1).max(37).nullable(),
  service_name: z.string().min(1).max(37).nullable(),
  environment_type: z.string().min(1).max(25).nullable(),
});

export type UpdateNamespaceSchema = z.infer<typeof updateNamespaceSchema>;
