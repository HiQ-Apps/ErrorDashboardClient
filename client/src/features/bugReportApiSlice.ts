import { baseApi } from "features/baseApi";
import type { CreateBugReport } from "types/BugReport";

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
  }),
});

export const { useCreateBugReportMutation } = bugReportSlice;
