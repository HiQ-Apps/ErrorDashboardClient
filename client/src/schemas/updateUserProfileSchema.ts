import { z } from "zod";

export const updateUserProfileSchema = z.object({
  id: z.string().length(36).nullable(),
  first_name: z.string().min(1).max(35).nullable(),
  last_name: z.string().min(1).max(35).nullable(),
  avatar_color: z.string().length(7).nullable(),
  username: z.string().min(1).max(35).nullable(),
  password: z.string().min(8).max(50).nullable(),
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
