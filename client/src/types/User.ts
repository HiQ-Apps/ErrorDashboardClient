import type { NamespaceRole } from "shared/utils/role";

export type BaseUserDTO = {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type BaseUserProfileDTO = {
  id: string;
  userId: string;
  firstName: Partial<string>;
  lastName: Partial<string>;
  avatarColor: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUserRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type ResetPasswordRequest = {
  id: string;
  email: string;
  password: string;
};

export type LoginUserRequest = Pick<RegisterUserRequest, "email" | "password">;

export type ShortUserData = {
  id: string;
  email: string;
  username: string;
  verified: boolean;
};

export type UserMemberData = ShortUserData & {
  role: NamespaceRole;
};

export type UpdateUserNamespaceRoleRequest = {
  userId: string;
  namespaceId: string;
  role: NamespaceRole;
};

export type ShortUserProfile = {
  firstName: string;
  lastName: string;
  avatarColor: string;
  role: string;
};

export type ShortUserProfileOpt = Partial<ShortUserProfile>;

export type UpdateUserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  avatarColor: string;
  username: string;
  password: string;
};

export type UpdateUserProfileOpt = Partial<UpdateUserProfile>;

export type VerifyUserRequest = Pick<LoginUserRequest, "password">;

export type AuthResponse = {
  user: ShortUserData;
  userProfile: ShortUserProfile;
  accessToken: string;
};

export type UserAdminData = {
  user: BaseUserDTO;
  userProfile: BaseUserProfileDTO;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type SubscriptionUserRequest = {
  userId: string;
};
