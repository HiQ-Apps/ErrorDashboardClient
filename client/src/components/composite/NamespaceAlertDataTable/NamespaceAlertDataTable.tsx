import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "components/ui/card";
import {
  useGetNamespaceAlertsByNamespaceIdQuery,
  useDeleteNamespaceAlertByIdMutation,
} from "features/namespaceAlertApiSlice";
import { useToast } from "components/ui/use-toast";
import { DataTable, TrashCan } from "components/base";
import { type ColumnDef } from "@tanstack/react-table";

interface NamespaceAlertDataTableProps {
  namespaceId: string;
}

const NamespaceAlertDataTable = ({
  namespaceId,
}: NamespaceAlertDataTableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    data: alertData,
    error,
    isLoading,
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
        {isLoading && <p>Loading...</p>}
        <DataTable data={alertData} columns={columns} />
      </div>
    </Card>
  );
};

export default NamespaceAlertDataTable;
