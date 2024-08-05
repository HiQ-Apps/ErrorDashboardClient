import { z } from "zod";

export const createTagSchema = z.object({
  tagKey: z.string().max(20).min(1),
  tagValue: z.string().max(20).min(1),
  errorId: z.string().uuid(),
  tagColor: z.string().max(7).min(6),
});

export type CreateTagSchema = z.infer<typeof createTagSchema>;
