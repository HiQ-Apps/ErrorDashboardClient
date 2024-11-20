import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "components/ui/card";
import {
  useGetNamespaceAlertsByNamespaceIdQuery,
  useDeleteNamespaceAlertByIdMutation,
} from "features/namespaceAlertApiSlice";

import { BaseButton, DataTable, LoadingCard, TrashCan } from "components/base";
import { type ColumnDef } from "@tanstack/react-table";
import { UpdateIcon } from "@radix-ui/react-icons";

interface NamespaceAlertDataTableProps {
  namespaceId: string;
}

const NamespaceAlertDataTable = ({
  namespaceId,
}: NamespaceAlertDataTableProps) => {
  const {
    data: alertData,
    error,
    isLoading: namespaceAlertsIsLoading,
    refetch: namespaceAlertRefetch,
  } = useGetNamespaceAlertsByNamespaceIdQuery(namespaceId);

  const [deleteNamespaceAlertById] = useDeleteNamespaceAlertByIdMutation();

  if (!alertData || alertData.length === 0) {
    return <div>No alerts found</div>;
  }

  const columns: ColumnDef<(typeof alertData)[0]>[] = Object.keys(
    alertData[0]
  ).map((key) => ({
    header: key,
    accessorKey: key,
    cell: (info) => {
      const value = info.getValue();
      return (
        <div className="text-xs text-center" key={key}>
          {String(value)}
        </div>
      );
    },
  }));

  columns.push({
    header: "Delete",
    id: "actions",
    cell: ({ row }) => (
      <div className="cursor-pointer flex justify-center">
        <div onClick={() => handleDelete(row.original.id)}>{<TrashCan />}</div>
      </div>
    ),
  });

  const handleDelete = async (id: string) => {
    await deleteNamespaceAlertById(id);
  };

  return (
    <Card className="flex flex-col mr-4 mb-4">
      <div className="overflow-y-auto w-full">
        {namespaceAlertsIsLoading && <LoadingCard />}
        <BaseButton
          variant="accent"
          content={
            namespaceAlertsIsLoading ? (
              <UpdateIcon className="animate-ease-in-out-rotation" />
            ) : (
              <UpdateIcon className="text-slate-100 w-5 h-5" />
            )
          }
          overrideStyles="w-8 h-8 p-1 mb-4"
          onClick={() => {
            namespaceAlertRefetch();
          }}
        />
        <DataTable data={alertData} columns={columns} />
      </div>
    </Card>
  );
};

export default NamespaceAlertDataTable;
