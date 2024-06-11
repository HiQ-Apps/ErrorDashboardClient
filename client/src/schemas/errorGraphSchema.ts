import { z } from "zod";

export const errorGraphSchema = z.object({
  namespace_id: z.string(),
  start_time: z.string(),
  time_interval_hours: z.number().nonnegative(),
});

export type ErrorGraphSchema = z.infer<typeof errorGraphSchema>;
