import { baseApi } from "features/baseApi";
import { ErrorData } from "types/Error";

export const errorApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getErrorById: builder.query<ErrorData, string>({
      query: (id: string) => ({
        url: `/error/${id}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetErrorByIdQuery } = errorApiSlice;
