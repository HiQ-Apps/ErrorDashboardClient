import { z } from "zod";

export const errorGraphSchema = z.object({
  namespace_id: z.string().length(36),
  start_time: z.string().max(20),
  time_interval_hours: z.number().nonnegative(),
});

export type ErrorGraphSchema = z.infer<typeof errorGraphSchema>;
