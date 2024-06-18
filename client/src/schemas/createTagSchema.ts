import { z } from "zod";

export const createTagSchema = z.object({
  tag_key: z.string().max(20),
  tag_value: z.string().max(20),
  error_id: z.string().uuid(),
});

export type CreateTagSchema = z.infer<typeof createTagSchema>;
