import { z } from "zod";

export const inviteUserNamespaceSchema = z.object({
  userId: z.string().min(1).max(50),
  namespaceId: z.string().min(1).max(50),
  role: z.string().min(1).max(15),
});

export type InviteUserNamespaceSchema = z.infer<
  typeof inviteUserNamespaceSchema
>;
