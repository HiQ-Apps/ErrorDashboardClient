import { baseApi } from "features/baseApi";
import type {
  ShortUserProfile,
  UpdateUserProfile,
  AuthResponse,
  LoginUserRequest,
  RegisterUserRequest,
  VerifyUserRequest,
  UpdateUserProfileOpt,
  ForgotPasswordRequest,
  ResetPasswordRequest,
} from "types/User";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginUserRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),
    googleLogin: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/login/google",
        method: "GET",
      }),
    }),
    register: builder.mutation<AuthResponse, RegisterUserRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshAccessToken: builder.query<AuthResponse, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
    }),
    verifyUserPassword: builder.mutation<null, VerifyUserRequest>({
      query: (password) => ({
        url: "/verified/auth/check",
        method: "POST",
        body: password,
      }),
    }),
    verifyUser: builder.mutation<null, string>({
      query: (id) => ({
        url: `/users/${id}/verify`,
        method: "PUT",
      }),
    }),
    forgotPassword: builder.mutation<null, ForgotPasswordRequest>({
      query: (email) => ({
        url: `/users/forgot-password`,
        method: "POST",
        body: email,
      }),
    }),
    resetPassword: builder.mutation<AuthResponse, ResetPasswordRequest>({
      query: ({ id, email, password }) => ({
        url: `/users/${id}/${email}/reset-password`,
        method: "PUT",
        body: { password },
      }),
    }),
    getUserProfile: builder.query<ShortUserProfile, string>({
      query: (id) => ({
        url: `/users/${id}/profile`,
        method: "GET",
      }),
      providesTags: ["UserProfile"],
    }),
    updateUserProfile: builder.mutation<
      UpdateUserProfile,
      UpdateUserProfileOpt
    >({
      query: (profile) => ({
        url: `/users/${profile.id}/profile`,
        method: "PUT",
        body: profile,
      }),
      invalidatesTags: ["UserProfile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useVerifyUserPasswordMutation,
  useVerifyUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useGoogleLoginQuery,
  useUpdateUserProfileMutation,
} = userApiSlice;
