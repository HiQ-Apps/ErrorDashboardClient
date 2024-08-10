export type RegisterUserRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserRequest = Pick<RegisterUserRequest, "email" | "password">;

export type ShortUserData = {
  id: string;
  email: string;
  username: string;
};

export type ShortUserProfile = {
  firstName: string;
  lastName: string;
  avatarColor: string;
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
