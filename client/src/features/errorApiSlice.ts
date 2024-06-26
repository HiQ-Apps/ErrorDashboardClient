import { baseApi } from "features/baseApi";
import type {
  ErrorAggregateDataResponse,
  ErrorData,
  ErrorMetaData,
  ErrorMetaDataRequest,
  GetErrorAggregateRequest,
} from "types/Error";

export const errorApiSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getErrorById: builder.query<ErrorData, string>({
      query: (id: string) => ({
        url: `/error/${id}`,
        method: "GET",
      }),
      providesTags: ["ErrorDetail"],
    }),
    getErrorAggregatesByNamespaceId: builder.query<
      ErrorAggregateDataResponse,
      GetErrorAggregateRequest
    >({
      query: ({
        namespace_id,
        start_time,
        time_interval_minutes,
        timezone,
      }) => ({
        url: `/error/aggregate/namespace/${namespace_id}`,
        method: "GET",
        params: {
          start_time,
          time_interval_minutes,
          timezone,
        },
      }),
    }),
    getErrorMetaGroupedByParams: builder.query<
      ErrorMetaData[],
      ErrorMetaDataRequest
    >({
      query: ({ namespace_id, group_by, group_key, offset, limit }) => ({
        url: `/error/aggregate/details/namespace/${namespace_id}`,
        method: "GET",
        params: {
          group_by,
          group_key,
          offset,
          limit,
        },
      }),
    }),
  }),
});

export const {
  useGetErrorByIdQuery,
  useGetErrorAggregatesByNamespaceIdQuery,
  useGetErrorMetaGroupedByParamsQuery,
} = errorApiSlice;
