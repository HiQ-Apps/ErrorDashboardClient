import { z } from "zod";

export const verifyUserSchema = z.object({
  password: z.string().min(8),
});

export type VerifyUserSchema = z.infer<typeof verifyUserSchema>;
