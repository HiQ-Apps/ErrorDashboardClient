import { z } from "zod";

export const errorGraphSchema = z.object({
  namespaceId: z.string().max(40),
  startTime: z.string().max(30),
  timeIntervalMinutes: z.number().nonnegative(),
  timezone: z.string().max(30).min(1),
});

export type ErrorGraphSchema = z.infer<typeof errorGraphSchema>;
