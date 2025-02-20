import { baseApi } from "features/baseApi";
import type { CreateBugReport, BugReport } from "types/BugReport";

export const bugReportSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBugReport: builder.mutation<void, CreateBugReport>({
      query: (data) => ({
        url: "/bug-report/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BugReports"],
    }),
    getBugReport: builder.query<BugReport[], void>({
      query: () => ({
        url: `/bug-report/`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBugReportMutation, useGetBugReportQuery } =
  bugReportSlice;
