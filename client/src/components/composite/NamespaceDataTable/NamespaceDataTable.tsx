import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type ColumnDef } from "@tanstack/react-table";
import { formatHeader } from "shared/utils/parseString";
import {
  useGetNamespacesByUserQuery,
  useDeleteNamespaceByIdMutation,
} from "features/namespaceApiSlice";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "components/ui/tooltip";
import TrashCan from "components/base/TrashCan/TrashCan";
import { selectUser } from "features/authSlice";
import { DataTable } from "components/base/DataTable/DataTable";
import { ActiveDot, InactiveDot } from "assets/index";
import { ReactNode, useState } from "react";
import useConfirmMutation from "hooks/useConfirmMutation";
import BaseButton from "components/base/Button/Button";
import ConfirmationModal from "components/composite/ConfirmationModal/ConfirmationModal";
import { VerifyUserRequest } from "types/User";

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const { triggerConfirmation } = useConfirmMutation();
  const [selectedNamespaceId, setSelectedNamespaceId] = useState<string | null>(
    null
  );

  const { data, isLoading } = useGetNamespacesByUserQuery(
    { id: user?.id || "", offset: 0, limit: 20 },
    { skip: !user?.id }
  );

  const [deleteNamespaceById] = useDeleteNamespaceByIdMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div>No namespaces found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/namespace/${id}`);
  };

  const handleDelete = async (
    id: string,
    credentials?: { password: string }
  ) => {
    setSelectedNamespaceId(id);
    if (!credentials) {
      try {
        await triggerConfirmation();
        deleteNamespaceById(id);
      } catch (error) {
        console.error("Action rejected or failed:", error);
      }
      return;
    }

    try {
      await deleteNamespaceById(id).unwrap();
      console.log("Namespace deleted successfully");
    } catch (error) {
      console.error("Action rejected or failed:", error);
    }
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
            {isBoolean ? renderBooleanCell(value) : String(value)}
          </div>
        );
      },
    })
  );

  columns.push({
    header: "Delete",
    id: "actions",
    cell: ({ row }) => (
      <div className="flex justify-center">
        <BaseButton
          content={<TrashCan />}
          variant="outline"
          size="lg"
          onClick={() => handleDelete(row.original.id)}
        />
      </div>
    ),
  });

  return (
    <div>
      <DataTable data={data ?? []} columns={columns} />
      {selectedNamespaceId && (
        <ConfirmationModal
          onConfirm={(credentials: VerifyUserRequest) =>
            handleDelete(selectedNamespaceId, credentials)
          }
        />
      )}
    </div>
  );
};

export default NamespaceDataTable;
