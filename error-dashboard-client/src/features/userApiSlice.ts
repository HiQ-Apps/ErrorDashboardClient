import { baseApi } from "features/baseApi";
import { setToken, setUser } from "./authSlice";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          dispatch(setUser(data.user));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setToken(data.accessToken));
          dispatch(setUser(data.user));
        } catch (error) {
          console.error("Login error:", error);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApiSlice;
