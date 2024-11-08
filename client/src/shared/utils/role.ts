export type Role = "guest" | "member" | "contributor" | "manager" | "owner";

export type Permission =
  | "view"
  | "add alert"
  | "comment"
  | "delete"
  | "invite"
  | "remove user"
  | "update";

export type RolePermission = {
  permissions: Permission[];
  weight: number;
};

export const RoleRules: Record<Role, RolePermission> = {
  guest: { permissions: ["view"], weight: 0 },
  member: { permissions: ["view", "comment"], weight: 1 },
  contributor: { permissions: ["view", "add alert", "comment"], weight: 2 },
  manager: {
    permissions: [
      "view",
      "add alert",
      "comment",
      "remove user",
      "invite",
      "update",
    ],
    weight: 3,
  },
  owner: {
    permissions: [
      "view",
      "add alert",
      "comment",
      "delete",
      "invite",
      "remove user",
      "update",
    ],
    weight: 4,
  },
};

export const checkPermission = (role: Role, action: Permission) => {
  return RoleRules[role].permissions.includes(action);
};

export const checkAuthority = (role: Role, targetRole: Role) => {
  return RoleRules[role].weight > RoleRules[targetRole].weight;
};
