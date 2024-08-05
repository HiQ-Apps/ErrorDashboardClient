import { z } from "zod";

export const createNamespaceSchema = z.object({
  serviceName: z.string().max(20),
  environmentType: z.string().min(1).max(25),
});

export type CreateNamespaceSchema = z.infer<typeof createNamespaceSchema>;
