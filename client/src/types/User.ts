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

export type AuthResponse = {
  user: ShortUserData;
  access_token: string;
};

export type VerifyUserRequest = {
  password: string;
};
