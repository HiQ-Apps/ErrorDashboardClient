import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  type Row,
} from "@tanstack/react-table";
import { useState } from "react";

import { ScrollArea } from "components/ui/scroll-area";
import { formatHeader } from "shared/utils/parseString";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "components/ui/table";
import { Checkbox } from "components/ui/checkbox";
import { BaseButton, Label } from "components/base";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: Row<TData>) => void;
}

export const DataTable = <TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) => {
  const [columnVisibility, setColumnVisibility] = useState<
    Record<string, boolean>
  >({});
  const [filterVisibility, setFilterVisibility] = useState<boolean>(false);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const toggleColumnVisibility = (columnId: string) => {
    setColumnVisibility((prev) => ({
      ...prev,
      [columnId]: !prev[columnId],
    }));
  };

  const handleFilterVisibility = () => {
    setFilterVisibility((prev) => !prev);
  };

  return (
    <div className="mx-4 dark:text-slate-300">
      <div className="flex flex-col">
        <div className="flex justify-end py-4">
          <BaseButton
            content="Column Filters"
            size="sm"
            variant="accent"
            onClick={handleFilterVisibility}
            overrideStyles="px-3"
          />
        </div>
        {filterVisibility && (
          <ScrollArea className="flex flex-wrap h-24 px-4">
            {table.getAllColumns().map((column) => (
              <div
                className="flex justify-start py-1 align-center items-center"
                key={column.id}
              >
                <Checkbox
                  checked={column.getIsVisible()}
                  onCheckedChange={() => toggleColumnVisibility(column.id)}
                  id={column.id}
                />
                <div className="px-2">
                  <Label
                    htmlFor={column.id}
                    text={formatHeader(column.columnDef.header as string)}
                  />
                </div>
              </div>
            ))}
          </ScrollArea>
        )}
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="p-2 text-slate-900 text-center text-sm rounded-full dark:text-slate-100"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          formatHeader(
                            header.column.columnDef.header as string
                          ),
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="hover:bg-slate-200 dark:hover:bg-slate-700"
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => onRowClick && onRowClick(row)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4 mx-4">
        <BaseButton
          size="sm"
          content="Previous"
          variant="default"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          overrideStyles="px-3"
        />
        <BaseButton
          size="sm"
          content="Next"
          variant="default"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          overrideStyles="px-3"
        />
      </div>
    </div>
  );
};
