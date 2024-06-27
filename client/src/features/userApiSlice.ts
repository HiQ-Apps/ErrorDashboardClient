import { baseApi } from "features/baseApi";
import {
  ShortUserProfile,
  type AuthResponse,
  type LoginUserRequest,
  type RegisterUserRequest,
  type VerifyUserRequest,
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
    register: builder.mutation<AuthResponse, RegisterUserRequest>({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    refreshAccessToken: builder.query<AuthResponse, null>({
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
    getUserProfile: builder.query<ShortUserProfile, any>({
      query: (id) => ({
        url: `user/profile/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
  useVerifyUserMutation,
} = userApiSlice;
