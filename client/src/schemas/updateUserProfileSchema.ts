import { z } from "zod";

const PhoneProviderSchema = z
  .enum([
    "AT&T",
    "Verizon",
    "T-Mobile",
    "Sprint",
    "Boost",
    "MetroPCS",
    "Cricket",
    "US Cellular",
  ])
  .nullable();

export const updateUserProfileSchema = z.object({
  id: z.string().length(36).nullable(),
  firstName: z.string().min(1).max(35).nullable(),
  lastName: z.string().min(1).max(35).nullable(),
  phoneNumber: z.string().min(10).max(10).nullable(),
  phoneProvider: PhoneProviderSchema,
  avatarColor: z.string().length(7).nullable(),
  username: z.string().min(1).max(35).nullable(),
  password: z.string().min(8).max(50).nullable(),
});

export type UpdateUserProfileSchema = z.infer<typeof updateUserProfileSchema>;
