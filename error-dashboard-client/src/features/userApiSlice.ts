import { baseApi } from "features/baseApi";
import type {
  AuthResponse,
  LoginUserRequest,
  RegisterUserRequest,
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
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshAccessTokenQuery,
} = userApiSlice;
