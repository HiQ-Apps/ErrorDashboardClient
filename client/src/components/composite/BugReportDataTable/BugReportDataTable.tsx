import { useEffect, useState, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { DateTime } from "luxon";

import { selectTimeZone } from "features/timezoneSlice";
import { useToast } from "components/ui/use-toast";
import { DataTable } from "components/base";
import { useGetBugReportQuery } from "features/bugReportApiSlice";
import { BugReport } from "types/BugReport";
import { formatHeader } from "shared/utils/parseString";

const BugReportDataTable = () => {
  const { toast } = useToast();
  const timezone = useSelector(selectTimeZone);

  const {
    data: bugReportData,
    error: bugReportError,
    isError: bugReportIsError,
    isLoading: bugReportIsLoading,
  } = useGetBugReportQuery();

  useEffect(() => {
    if (bugReportError && bugReportIsError) {
      toast({
        title: "Error reporting bug",
        description: JSON.stringify(bugReportError),
      });
    }
  }, [bugReportError, bugReportIsError]);

  if (!bugReportData || bugReportData.length === 0) {
    return (
      <div className="flex text-center w-full h-full">No bugs reported :)</div>
    );
  }

  const columns: ColumnDef<BugReport>[] = Object.keys(bugReportData[0]).map(
    (key) => ({
      header: formatHeader(key),
      accessorKey: key,
      cell: (info) => {
        return <div>{String(info.getValue())}</div>;
      },
    })
  );

  return <DataTable columns={columns} data={bugReportData} />;
};

export default BugReportDataTable;
