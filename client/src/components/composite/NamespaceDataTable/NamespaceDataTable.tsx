import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { ColumnDef, Row, RowData } from "@tanstack/react-table";
import {
  useGetNamespacesByUserQuery,
  useDeleteNamespaceByIdMutation,
} from "features/namespaceApiSlice";

import { useVerifyUserPasswordMutation } from "features/userApiSlice";
import { setError, clearError } from "features/errorBoundarySlice";
import {
  DataTable,
  TrashCan,
  StatusDot,
  LoadingCard,
  BaseButton,
} from "components/base";
import { selectUser } from "features/authSlice";
import { formatHeader } from "shared/utils/parseString";
import { useToast } from "components/ui/use-toast";
import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import { ConfirmationModal } from "components/composite";
import { openModal, closeModal, setIsLoading } from "features/modalSlice";
import type { VerifyUserRequest } from "types/User";
import { checkPermission, RoleRules, type Role } from "shared/utils/role";
import type { GetUserNamespacesData } from "types/Namespace";
import { UpdateIcon } from "@radix-ui/react-icons";

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { registerHandler, unregisterHandler } = useModalHandlerContext();
  const [params, setParams] = useState({ offset: 0, limit: 10 });

  const [verifyUser] = useVerifyUserPasswordMutation();

  const {
    data: namespaceData,
    isLoading: namespaceLoading,
    isError: namespaceIsError,
    error: namespaceError,
    refetch: namespaceRefetch,
  } = useGetNamespacesByUserQuery(
    { id: user?.id || "", offset: params.offset, limit: params.limit },
    { skip: !user?.id }
  );

  const [
    deleteNamespaceById,
    { isSuccess: deleteSuccess, isError: deleteError },
  ] = useDeleteNamespaceByIdMutation();

  useEffect(() => {
    if (namespaceIsError && namespaceError) {
      dispatch(
        setError({
          error: namespaceError as Error,
          errorInfo: { componentStack: "Error in useGetNamespacesByUserQuery" },
        })
      );
    } else {
      dispatch(clearError());
    }
  }, [namespaceIsError, namespaceError]);

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Namespace deleted successfully",
      });
    }
  }, [deleteSuccess, toast]);

  useEffect(() => {
    if (deleteError) {
      toast({
        title: "Namespace deletion failed",
        description: "error",
      });
    }
  }, [deleteError, toast]);

  const handleRowClick = (row: Row<GetUserNamespacesData>) => {
    const id = row.original.id;
    navigate(`/namespace/${id}`);
  };

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

  const columns: ColumnDef<GetUserNamespacesData>[] = Object.keys(
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
    header: "Delete",
    id: "actions",
    cell: ({ row }) =>
      checkPermission(row.original.role, "delete") && (
        <div className="cursor-pointer flex justify-center">
          <div onClick={() => handleDelete(row.original.id)}>
            {<TrashCan />}
          </div>
        </div>
      ),
  });

  return (
    <div className="flex flex-col">
      {namespaceLoading && <LoadingCard />}
      <BaseButton
        variant="accent"
        content={
          namespaceLoading ? (
            <UpdateIcon className="animate-ease-in-out-rotation" />
          ) : (
            <UpdateIcon className="text-slate-100 w-5 h-5" />
          )
        }
        overrideStyles="w-8 h-8 p-1 mb-4"
        onClick={() => {
          namespaceRefetch();
        }}
      />
      <DataTable
        data={namespaceData}
        columns={columns}
        onRowClick={handleRowClick}
      />
      <ConfirmationModal />
    </div>
  );
};

export default NamespaceDataTable;
