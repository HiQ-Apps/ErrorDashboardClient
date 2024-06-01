import { z } from "zod";

export const createNamespaceSchema = z.object({
  service_name: z.string().max(20),
  environment_type: z.string().min(1).max(25),
});

export type CreateNamespaceSchema = z.infer<typeof createNamespaceSchema>;
