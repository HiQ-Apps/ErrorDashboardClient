import { z } from "zod";

export const createBugReportSchema = z.object({
  issue: z.string().max(100),
  description: z.string().max(500),
});

export type CreateBugReportSchema = z.infer<typeof createBugReportSchema>;
