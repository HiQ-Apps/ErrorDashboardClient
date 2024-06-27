import { z } from "zod";

export const updateUserProfileSchema = z.object({
  first_name: z.string().min(1).max(35).nullable(),
  last_name: z.string().min(1).max(35).nullable(),
  avatar_color: z.string().length(7).nullable(),
});
