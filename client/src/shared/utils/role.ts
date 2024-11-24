export type NamespaceRole =
  | "guest"
  | "member"
  | "contributor"
  | "manager"
  | "owner";

export type Role = NamespaceRole | "admin";

export type Permission =
  | "view"
  | "add alert"
  | "remove alert"
  | "edit alert"
  | "comment"
  | "delete"
  | "invite"
  | "remove user"
  | "subscribe alert"
  | "update";

export type RolePermission = {
  permissions: Permission[];
  weight: number;
};

export const RoleRules: Record<Role, RolePermission> = {
  guest: { permissions: ["view"], weight: 0 },
  member: { permissions: ["view", "comment"], weight: 1 },
  contributor: {
    permissions: [
      "view",
      "add alert",
      "remove alert",
      "edit alert",
      "subscribe alert",
      "comment",
    ],
    weight: 2,
  },
  manager: {
    permissions: [
      "view",
      "add alert",
      "remove alert",
      "edit alert",
      "subscribe alert",
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
      "remove alert",
      "edit alert",
      "comment",
      "delete",
      "subscribe alert",
      "invite",
      "remove user",
      "update",
    ],
    weight: 4,
  },
  admin: {
    permissions: [
      "view",
      "add alert",
      "comment",
      "delete",
      "invite",
      "remove user",
      "update",
    ],
    weight: 5,
  },
};

export const checkPermission = (role: Role, action: Permission) => {
  return RoleRules[role].permissions.includes(action);
};

export const checkAuthority = (role: Role, targetRole: Role) => {
  return RoleRules[role].weight > RoleRules[targetRole].weight;
};
