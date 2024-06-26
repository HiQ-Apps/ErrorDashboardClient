export type RegisterUserRequest = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginUserRequest = {
  email: string;
  password: string;
};

export type ShortUserData = {
  id: string;
  email: string;
  username: string;
};

export type ShortUserProfile = {
  first_name: string;
  last_name: string;
  avatar_color: string;
};

export type ShortUserProfileOpt = Partial<ShortUserProfile>;

export type UpdateUserProfile = {
  id: string;
  first_name: string;
  last_name: string;
  avatar_color: string;
  username: string;
  password: string;
};

export type UpdateUserProfileOpt = Partial<UpdateUserProfile>;

export type VerifyUserRequest = Pick<LoginUserRequest, "password">;

export type AuthResponse = {
  user: ShortUserData;
  user_profile: ShortUserProfile;
  access_token: string;
};
