import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import { useSelector } from "react-redux";

import { formatHeader } from "shared/utils/parseString";
import { selectParams } from "features/aggregateTableSlice";
import { useGetNamespaceErrorsQuery } from "features/namespaceApiSlice";
import { DataTable } from "components/base";
import { TagContainer } from "components/composite";
import {
  type AggregateErrorResponseData,
  type AggregateErrorGroupByOtherResponseData,
  type AggregateErrorGroupByTagResponseData,
  isGroupByOtherResponse,
  isGroupByTagResponse,
} from "types/Error";
import type { ShortTagType } from "types/Tag";

interface ErrorDataTableProps {
  id: string;
}

const ErrorDataTable = ({ id }: ErrorDataTableProps) => {
  const params = useSelector(selectParams);
  const navigate = useNavigate();

  const { data, isLoading } = useGetNamespaceErrorsQuery({
    id: id,
    offset: params.offset,
    limit: params.limit,
    group_by: params.group_by,
  });

  const [aggregatedErrors, setErrors] = useState<AggregateErrorResponseData>(
    data || []
  );

  useEffect(() => {
    if (data) {
      setErrors(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!aggregatedErrors || aggregatedErrors.length === 0) {
    return <div>No errors found.</div>;
  }

  const renderTagsCell = (tags: ShortTagType[] | ShortTagType): ReactNode => {
    return <TagContainer tags={tags} />;
  };

  const renderCell = (info: CellContext<any, any>, key: string) => {
    const value = info.getValue();
    return (
      <div
        key={`${info.row.id}-${key}`}
        onClick={() => {
          // Redirect to aggregate error page. Should include all errors listed. Maybe a modal?
        }}
        className="p-2 align-center justify-items-center text-center items-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
      >
        {String(value)}
      </div>
    );
  };

  const createColumnsForGroupByOtherResponse = (
    aggregatedErrors: AggregateErrorGroupByOtherResponseData[]
  ) => [
    ...Object.keys(aggregatedErrors[0])
      .filter((key) => key !== "aggregated_tags")
      .filter((key) => params.group_by !== "message" || key !== "status_code")
      .map((key) => ({
        header: formatHeader(key),
        accessorKey: key,
        cell: (
          info: CellContext<AggregateErrorGroupByOtherResponseData, any>
        ) => renderCell(info, key),
      })),
    {
      header: "Tags",
      accessorKey: "aggregated_tags",
      cell: (info: CellContext<AggregateErrorGroupByOtherResponseData, any>) =>
        renderTagsCell(info.getValue() as ShortTagType[]),
    },
  ];

  const createColumnsForGroupByTagResponse = () => [
    {
      header: "Tag",
      accessorKey: "tag",
      cell: (info: CellContext<AggregateErrorGroupByTagResponseData, any>) =>
        renderTagsCell(info.getValue() as ShortTagType),
    },
    {
      header: "User Affected Count",
      accessorKey: "user_affected_count",
      cell: (info: CellContext<AggregateErrorGroupByTagResponseData, any>) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
    {
      header: "Error Count",
      accessorKey: "error_count",
      cell: (info: CellContext<AggregateErrorGroupByTagResponseData, any>) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
  ];

  const columns: ColumnDef<
    | AggregateErrorGroupByOtherResponseData
    | AggregateErrorGroupByTagResponseData
  >[] = isGroupByOtherResponse(aggregatedErrors)
    ? (createColumnsForGroupByOtherResponse(aggregatedErrors) as ColumnDef<
        | AggregateErrorGroupByOtherResponseData
        | AggregateErrorGroupByTagResponseData
      >[])
    : isGroupByTagResponse(aggregatedErrors)
    ? (createColumnsForGroupByTagResponse() as ColumnDef<
        | AggregateErrorGroupByOtherResponseData
        | AggregateErrorGroupByTagResponseData
      >[])
    : [];

  return <DataTable data={aggregatedErrors} columns={columns} />;
};

export default ErrorDataTable;
