import { z } from "zod";

export const updateUserNamespaceRoleSchema = z.object({
  userId: z.string().length(36),
  namespaceId: z.string().length(36),
  role: z.enum(["owner", "manager", "contributor", "member", "guest"]),
});

export type UpdateUserNamespaceRoleSchema = z.infer<
  typeof updateUserNamespaceRoleSchema
>;
