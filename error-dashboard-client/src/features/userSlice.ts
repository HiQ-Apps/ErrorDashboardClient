import { baseApi } from "features/baseApi";

export const userApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: "/auth/login",
        providesTags: ["User"],
      }),
    }),
    register: builder.mutation({
      query: () => ({
        url: "/auth/register",
        providesTags: ["User"],
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApiSlice;
