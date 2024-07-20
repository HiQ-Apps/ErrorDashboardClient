import { type ReactNode, type MouseEvent, useEffect, useState } from "react";
import type { ColumnDef, CellContext } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { UpdateIcon } from "@radix-ui/react-icons";

import { selectParams } from "features/aggregateTableSlice";
import { useGetNamespaceErrorsQuery } from "features/namespaceApiSlice";
import { BaseButton, DataTable } from "components/base";
import { TagContainer } from "components/composite";
import { SheetTrigger } from "components/ui/sheet";
import {
  type AggregateErrorResponseData,
  type AggregateErrorGroupByLineResponseData,
  type AggregateErrorGroupByMessageResponseData,
  type AggregateErrorGroupByTagResponseData,
  isGroupByLineResponse,
  isGroupByMessageResponse,
  isGroupByTagResponse,
} from "types/Error";
import type { ShortTagType } from "types/Tag";
import { Popover, PopoverTrigger, PopoverContent } from "components/ui/popover";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useToast } from "components/ui/use-toast";

interface ErrorDataTableProps {
  id: string;
  setGroupKey: (key: string) => void;
}

const ErrorDataTable = ({ id, setGroupKey }: ErrorDataTableProps) => {
  const params = useSelector(selectParams);
  const { toast } = useToast();

  const { data, isLoading, refetch } = useGetNamespaceErrorsQuery({
    id: id,
    offset: params.offset,
    limit: params.limit,
    group_by: params.group_by,
  });

  const [aggregatedErrors, setErrors] = useState<AggregateErrorResponseData>(
    data || []
  );

  useEffect(() => {
    if (isLoading) {
      <div>Loading...</div>;
    }
  }, [isLoading]);

  useEffect(() => {
    if (data) {
      setErrors(data);
      toast({
        title: "Data loaded successfully",
        description: "Table loaded",
      });
    }
  }, [data]);

  const handleSetGroupKey = (event: MouseEvent<HTMLDivElement>, value: any) => {
    event.preventDefault();
    setGroupKey(value[params.group_by]);
  };

  const renderTagsCell = (tags: ShortTagType[] | ShortTagType): ReactNode => {
    return (
      <div className="flex justify-center w-full">
        <Popover>
          <PopoverTrigger>
            <DotsHorizontalIcon />
          </PopoverTrigger>
          <PopoverContent className="w-44 bg-slate-50 dark:bg-slate-900 dark:text-slate-100">
            <TagContainer tags={tags} />
          </PopoverContent>
        </Popover>
      </div>
    );
  };

  const renderErrorCountCell = (info: CellContext<any, any>, key: string) => {
    const value = info.getValue();
    return (
      <div
        className="w-full flex justify-center text-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
        onClick={(e) => handleSetGroupKey(e, info.row.original)}
      >
        <SheetTrigger>
          <div
            key={`${info.row.id}-${key}`}
            className="p-2 align-center justify-items-center text-center items-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
          >
            {String(value)}
          </div>
        </SheetTrigger>
      </div>
    );
  };

  const createColumnsForGroupByMessageResponse = (
    _: AggregateErrorGroupByMessageResponseData[]
  ): ColumnDef<AggregateErrorGroupByMessageResponseData>[] => [
    {
      header: "Message",
      accessorKey: "message",
      cell: (
        info: CellContext<AggregateErrorGroupByMessageResponseData, any>
      ) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
    {
      header: "User Affected Count",
      accessorKey: "user_affected_count",
      cell: (
        info: CellContext<AggregateErrorGroupByMessageResponseData, any>
      ) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
    {
      header: "Error Count",
      accessorKey: "error_count",
      cell: (
        info: CellContext<AggregateErrorGroupByMessageResponseData, any>
      ) => renderErrorCountCell(info, "error_count"),
    },
    {
      header: "Tags",
      accessorKey: "aggregated_tags",
      cell: (
        info: CellContext<AggregateErrorGroupByMessageResponseData, any>
      ) => renderTagsCell(info.getValue() as ShortTagType[]),
    },
  ];

  // const createColumnsForGroupByStatusResponse = (
  //   _: AggregateErrorGroupByStatusResponseData[]
  // ): ColumnDef<AggregateErrorGroupByStatusResponseData>[] => [
  //   {
  //     header: "Status Code",
  //     accessorKey: "status_code",
  //     cell: (
  //       info: CellContext<AggregateErrorGroupByStatusResponseData, any>
  //     ) => (
  //       <div className="flex justify-center text-center">{info.getValue()}</div>
  //     ),
  //   },
  //   {
  //     header: "User Affected Count",
  //     accessorKey: "user_affected_count",
  //     cell: (
  //       info: CellContext<AggregateErrorGroupByStatusResponseData, any>
  //     ) => (
  //       <div className="flex justify-center text-center">{info.getValue()}</div>
  //     ),
  //   },
  //   {
  //     header: "Error Count",
  //     accessorKey: "error_count",
  //     cell: (info: CellContext<AggregateErrorGroupByStatusResponseData, any>) =>
  //       renderErrorCountCell(info, "error_count"),
  //   },
  //   {
  //     header: "Tags",
  //     accessorKey: "aggregated_tags",
  //     cell: (info: CellContext<AggregateErrorGroupByStatusResponseData, any>) =>
  //       renderTagsCell(info.getValue() as ShortTagType[]),
  //   },
  // ];

  const createColumnsForGroupByLineResponse = (
    _: AggregateErrorGroupByLineResponseData[]
  ): ColumnDef<AggregateErrorGroupByLineResponseData>[] => [
    {
      header: "Line",
      accessorKey: "line",
      cell: (info: CellContext<AggregateErrorGroupByLineResponseData, any>) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
    {
      header: "User Affected Count",
      accessorKey: "user_affected_count",
      cell: (info: CellContext<AggregateErrorGroupByLineResponseData, any>) => (
        <div className="flex justify-center text-center">{info.getValue()}</div>
      ),
    },
    {
      header: "Error Count",
      accessorKey: "error_count",
      cell: (info: CellContext<AggregateErrorGroupByLineResponseData, any>) =>
        renderErrorCountCell(info, "error_count"),
    },
    {
      header: "Tags",
      accessorKey: "aggregated_tags",
      cell: (info: CellContext<AggregateErrorGroupByLineResponseData, any>) =>
        renderTagsCell(info.getValue() as ShortTagType[]),
    },
  ];

  const createColumnsForGroupByTagResponse =
    (): ColumnDef<AggregateErrorGroupByTagResponseData>[] => [
      {
        header: "Tag",
        accessorKey: "tag",
        cell: (info: CellContext<AggregateErrorGroupByTagResponseData, any>) =>
          renderTagsCell(info.getValue() as ShortTagType),
      },
      {
        header: "User Affected Count",
        accessorKey: "user_affected_count",
        cell: (
          info: CellContext<AggregateErrorGroupByTagResponseData, any>
        ) => (
          <div className="flex justify-center text-center">
            {info.getValue()}
          </div>
        ),
      },
      {
        header: "Error Count",
        accessorKey: "error_count",
        cell: (info: CellContext<AggregateErrorGroupByTagResponseData, any>) =>
          renderErrorCountCell(info, "error_count"),
      },
    ];

  const createColumns = (): ColumnDef<any>[] => {
    if (isGroupByMessageResponse(aggregatedErrors)) {
      return createColumnsForGroupByMessageResponse(
        aggregatedErrors as AggregateErrorGroupByMessageResponseData[]
      );
    } else if (isGroupByLineResponse(aggregatedErrors)) {
      return createColumnsForGroupByLineResponse(
        aggregatedErrors as AggregateErrorGroupByLineResponseData[]
      );
    } else if (isGroupByTagResponse(aggregatedErrors)) {
      return createColumnsForGroupByTagResponse();
    } else {
      return [];
    }
  };

  const columns = createColumns();

  return (
    <>
      <BaseButton
        variant="accent"
        content={
          isLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            <UpdateIcon className="text-slate-100 w-5 h-5" />
          )
        }
        overrideStyles="w-8 h-8 p-1 mb-4"
        onClick={() => {
          refetch();
        }}
      />
      <DataTable data={aggregatedErrors} columns={columns} />
    </>
  );
};

export default ErrorDataTable;
