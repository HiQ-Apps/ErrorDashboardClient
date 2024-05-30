import { baseApi } from "features/baseApi";

export const errorApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getErrorById: builder.query({
      query: (id: string) => ({
        url: `/error/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetErrorByIdQuery } = errorApiSlice;
