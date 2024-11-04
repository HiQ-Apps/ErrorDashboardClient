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
    verifyUser: builder.mutation<null, VerifyUserRequest>({
      query: (password) => ({
        url: "/verified/auth/check",
        method: "POST",
        body: password,
      }),
    }),
    forgotPassword: builder.mutation<null, ForgotPasswordRequest>({
      query: (email) => ({
        url: `/users/${email}/forgot-password}`,
        method: "POST",
      })
    }),
    resetPassword: builder.mutation<AuthResponse, RegisterUserRequest>({
      query: ({email, password, confirmPassword}) => ({
        url: `/users/${email}/reset-password`,
        method: "PUT",
        body: { password, confirmPassword }
      })
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
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useVerifyUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetUserProfileQuery,
  useGoogleLoginQuery,
  useUpdateUserProfileMutation,
} = userApiSlice;
