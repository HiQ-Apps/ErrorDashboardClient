import { z } from "zod";

export const errorGraphSchema = z.object({
  namespace_id: z.string().max(40),
  start_time: z.string().max(30),
  time_interval_minutes: z.number().nonnegative(),
  timezone: z.string().max(30).min(1),
});

export type ErrorGraphSchema = z.infer<typeof errorGraphSchema>;
