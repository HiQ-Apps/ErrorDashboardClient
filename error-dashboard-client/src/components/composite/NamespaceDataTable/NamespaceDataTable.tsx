import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type ColumnDef } from "@tanstack/react-table";

import { formatHeader } from "shared/utils/parseString";
import { useGetNamespacesByUserQuery } from "features/namespaceApiSlice";
import { selectUser } from "features/authSlice";
import { DataTable } from "components/base/DataTable/DataTable";
import { ActiveDot, InactiveDot } from "assets/index";
import { ReactNode } from "react";

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const { data, isLoading } = useGetNamespacesByUserQuery(
    { id: user?.id || "", offset: 0, limit: 10 },
    { skip: !user?.id }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No namespaces found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/namespace/${id}`);
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

  return <DataTable data={data ?? []} columns={columns} />;
};

export default NamespaceDataTable;
