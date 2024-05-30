import type { ReactNode } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { formatHeader } from "shared/utils/parseString";
import {
  useGetNamespaceErrorsQuery,
  useNamespaceWSQuery,
} from "features/namespaceApiSlice";
import { useWebSocket } from "hooks/useWebSocket";
import { ActiveDot, InactiveDot } from "assets/index";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "components/base/DataTable/DataTable";

const ErrorDataTable = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetNamespaceErrorsQuery({
    id: id || "",
    offset: 0,
    limit: 10,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No errors found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/error/${id}`);
  };

  const renderBooleanCell = (value: boolean): ReactNode =>
    value ? (
      <img
        className="inline-block"
        src={ActiveDot}
        width="20px"
        height="20px"
      />
    ) : (
      <img
        className="inline-block"
        src={InactiveDot}
        width="20px"
        height="20px"
      />
    );

  const columns: ColumnDef<(typeof data)[0]>[] = Object.keys(data[0]).map(
    (key) => ({
      header: formatHeader(key),
      accessorKey: key,
      cell: (info) => {
        const value = info.getValue();
        const isBoolean = typeof value === "boolean";
        return (
          <div
            onClick={() => handleRowClick(info.row.original.id)}
            className={
              "p-2 align-middle text-center object-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
            }
          >
            {isBoolean ? renderBooleanCell(value as boolean) : String(value)}
          </div>
        );
      },
    })
  );

  return <DataTable data={data} columns={columns} />;
};

export default ErrorDataTable;
