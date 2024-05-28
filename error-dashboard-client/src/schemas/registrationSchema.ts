import { z } from "zod";

export const registrationSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .refine(
        (value) => /[a-zA-Z]/.test(value),
        "Password must contain at least one letter"
      )
      .refine(
        (value) => /\d/.test(value),
        "Password must contain at least one number"
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // path of error
  });

export type RegistrationSchema = z.infer<typeof registrationSchema>;
