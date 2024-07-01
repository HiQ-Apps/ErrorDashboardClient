import { z } from "zod";

export const createTagSchema = z.object({
  tag_key: z.string().max(20).min(1),
  tag_value: z.string().max(20).min(1),
  error_id: z.string().uuid(),
  tag_color: z.string().max(7).min(6),
});

export type CreateTagSchema = z.infer<typeof createTagSchema>;
