import { z } from "zod";

export const createFeatureRequestSchema = z.object({
  title: z.string().max(50),
  description: z.string().max(250),
});

export type CreateFeatureRequestSchema = z.infer<
  typeof createFeatureRequestSchema
>;
