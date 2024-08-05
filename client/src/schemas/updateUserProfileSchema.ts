import { z } from "zod";

export const updateUserProfileSchema = z.object({
  id: z.string().length(36).nullable(),
  firstName: z.string().min(1).max(35).nullable(),
  lastName: z.string().min(1).max(35).nullable(),
  avatarColor: z.string().length(7).nullable(),
  username: z.string().min(1).max(35).nullable(),
  password: z.string().min(8).max(50).nullable(),
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
