import { z } from "zod";

export const inviteUserNamespaceSchema = z.object({
  userId: z.string().min(1).max(50),
  namespaceId: z.string().min(1).max(50),
  role: z.enum(["owner", "manager", "contributor", "member", "guest"]),
});

export type InviteUserNamespaceSchema = z.infer<
  typeof inviteUserNamespaceSchema
>;
