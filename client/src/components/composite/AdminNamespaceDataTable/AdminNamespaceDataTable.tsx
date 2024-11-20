import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "components/ui/use-toast";
import { type ColumnDef } from "@tanstack/react-table";

import { BaseButton, DataTable, StatusDot, TrashCan } from "components/base";
import { useGetNamespacesAdminQuery } from "features/adminApiSlice";
import {
  useDeleteNamespaceByIdMutation,
  useGetNamespaceMembersQuery,
} from "features/namespaceApiSlice";
import {
  UpdateNamespaceCard,
  ConfirmationModal,
  NamespaceMemberList,
} from "components/composite";
import { LoadingCard } from "components/base";
import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import type { ShortNamespaceData } from "types/Namespace";
import { formatHeader } from "shared/utils/parseString";
import { checkPermission } from "shared/utils/role";
import { useVerifyAdminMutation } from "features/adminApiSlice";
import { VerifyUserRequest } from "types/User";
import { openModal, closeModal, setIsLoading } from "features/modalSlice";
import { Sheet, SheetTrigger } from "components/ui/sheet";

const AdminNamespaceDataTable = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { registerHandler, unregisterHandler } = useModalHandlerContext();

  const {
    data: namespaceData,
    error: namespaceError,
    isError: namespaceIsError,
    isSuccess: namespaceIsSuccess,
    isLoading: namespaceLoading,
  } = useGetNamespacesAdminQuery();

  const [
    deleteNamespaceById,
    { isSuccess: deleteIsSuccess, isError: deleteIsError, error: deleteError },
  ] = useDeleteNamespaceByIdMutation();

  const [verifyUser] = useVerifyAdminMutation();

  useEffect(() => {
    if (namespaceIsError && namespaceError) {
      toast({
        title: "Namespace Error",
        description: JSON.stringify(namespaceError),
      });
    }
  }, [namespaceIsError, namespaceError]);

  useEffect(() => {
    if (deleteIsError && deleteError) {
      toast({
        title: "Delete Namespace Error",
        description: JSON.stringify(deleteError),
      });
    }
  }, [deleteIsError, deleteError]);

  const handleDelete = async (id: string) => {
    registerHandler(
      async (password: VerifyUserRequest) => {
        try {
          dispatch(setIsLoading(true));
          await verifyUser(password).unwrap();
          await deleteNamespaceById(id).unwrap();
          dispatch(setIsLoading(false));
          unregisterHandler();
          dispatch(closeModal());
        } catch (error) {
          dispatch(setIsLoading(false));
          dispatch(closeModal());
          toast({
            title: "Failed to delete namespace",
          });
        }
      },
      () => {
        dispatch(closeModal());
      }
    );
    dispatch(openModal({ modalType: "confirmation" }));
  };

  const renderBooleanCell = (value: boolean): ReactNode => {
    return <StatusDot status={value} />;
  };

  if (!namespaceData || namespaceData.length === 0) {
    return (
      <div className="flex text-center w-full h-full">No namespaces found</div>
    );
  }

  const columns: ColumnDef<ShortNamespaceData>[] = Object.keys(
    namespaceData[0]
  ).map((key) => ({
    header: formatHeader(key),
    accessorKey: key,
    cell: (info) => {
      const value = info.getValue();
      const isBoolean = typeof value === "boolean";
      return (
        <div
          key={key}
          className={
            "p-2 align-middle text-center object-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
          }
        >
          {isBoolean ? renderBooleanCell(value) : String(value)}
        </div>
      );
    },
  }));

  columns.push({
    header: "View Members",
    id: "viewMembers",
    cell: ({ row }) => {
      return (
        <Sheet>
          <SheetTrigger asChild>
            <BaseButton
              variant="accent"
              size="sm"
              overrideStyles="px-3"
              content="View Members"
            />
          </SheetTrigger>
          <NamespaceMemberList namespaceId={row.original.id} />
        </Sheet>
      );
    },
  });

  columns.push({
    header: "Delete",
    id: "actions",
    cell: ({ row }) =>
      checkPermission("admin", "delete") && (
        <div className="cursor-pointer flex justify-center">
          <div onClick={() => handleDelete(row.original.id)}>
            <TrashCan />
          </div>
        </div>
      ),
  });

  // Column to update namespace details. This will open a modal with the UpdateNamespaceCard component

  return (
    <div>
      {namespaceLoading && <LoadingCard />}
      <DataTable columns={columns} data={namespaceData} />
      <ConfirmationModal />
    </div>
  );
};

export default AdminNamespaceDataTable;
