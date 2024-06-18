import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, CellContext } from "@tanstack/react-table";

import { formatHeader } from "shared/utils/parseString";
import { useGetNamespaceErrorsQuery } from "features/namespaceApiSlice";
import { StatusDot, DataTable } from "components/base";
import { TagContainer } from "components/composite";
import { ShortErrorData } from "types/Error";
import type { ShortTagType } from "types/Tag";

interface ErrorDataTableProps {
  id: string;
}

const ErrorDataTable = ({ id }: ErrorDataTableProps) => {
  const [params, setParams] = useState({ offset: 0, limit: 10 });
  const navigate = useNavigate();

  const { data, isLoading } = useGetNamespaceErrorsQuery({
    id: id,
    offset: params.offset,
    limit: params.limit,
  });

  const [errors, setErrors] = useState<ShortErrorData[]>(data || []);

  useEffect(() => {
    if (data) {
      setErrors(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!errors || errors.length === 0) {
    return <div>No errors found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/error/${id}/console`);
  };

  const renderBooleanCell = (value: boolean): ReactNode => {
    return <StatusDot status={value} />;
  };

  const renderTagsCell = (tags: ShortTagType[]): ReactNode => {
    return <TagContainer tags={tags} />;
  };

  const columns: ColumnDef<ShortErrorData>[] = [
    ...Object.keys(errors[0])
      .filter((key) => key !== "tags")
      .map((key) => ({
        header: formatHeader(key),
        accessorKey: key,
        cell: (info: CellContext<ShortErrorData, any>) => {
          const value = info.getValue();
          const isBoolean = typeof value === "boolean";
          return (
            <div
              key={key}
              onClick={() => handleRowClick(info.row.original.id)}
              className={
                "p-2 align-center justify-items-center text-center items-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
              }
            >
              {isBoolean ? renderBooleanCell(value as boolean) : String(value)}
            </div>
          );
        },
      })),
    {
      header: "Tags",
      accessorKey: "tags",
      cell: (info: CellContext<ShortErrorData, any>) =>
        renderTagsCell(info.getValue() as ShortTagType[]),
    },
  ];

  return <DataTable data={errors} columns={columns} />;
};

export default ErrorDataTable;
