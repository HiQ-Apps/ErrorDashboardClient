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
      query: ({ namespaceId, startTime, timeIntervalMinutes, timezone }) => ({
        url: `/error/aggregate/namespace/${namespaceId}`,
        method: "GET",
        params: {
          startTime,
          timeIntervalMinutes,
          timezone,
        },
      }),
    }),
    getErrorMetaGroupedByParams: builder.query<
      ErrorMetaData[],
      ErrorMetaDataRequest
    >({
      query: ({ namespaceId, groupBy, groupKey, offset, limit }) => ({
        url: `/error/aggregate/details/namespace/${namespaceId}`,
        method: "GET",
        params: {
          groupBy,
          groupKey,
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
