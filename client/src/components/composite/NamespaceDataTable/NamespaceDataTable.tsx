import { type ReactNode, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type ColumnDef } from "@tanstack/react-table";
import {
  useGetNamespacesByUserQuery,
  useDeleteNamespaceByIdMutation,
} from "features/namespaceApiSlice";

import { useVerifyUserMutation } from "features/userApiSlice";
import { setError, clearError } from "features/errorBoundarySlice";
import { DataTable, TrashCan, StatusDot } from "components/base";
import { selectUser } from "features/authSlice";
import { formatHeader } from "shared/utils/parseString";
import { useToast } from "components/ui/use-toast";
import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import ConfirmationModal from "components/composite/ConfirmationModal/ConfirmationModal";
import { openModal, closeModal, setIsLoading } from "features/modalSlice";
import type { VerifyUserRequest } from "types/User";

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { registerHandler, unregisterHandler } = useModalHandlerContext();
  const [params, setParams] = useState({ offset: 0, limit: 10 });

  const [verifyUser] = useVerifyUserMutation();

  const {
    data: namespaceData,
    isLoading: namespaceLoading,
    isError: namespaceIsError,
    error: namespaceError,
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

  const handleRowClick = (id: string) => {
    navigate(`/namespace/${id}`);
  };

  const handleRedirectBack = () => {
    navigate("/namespace/console");
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

  const columns: ColumnDef<(typeof namespaceData)[0]>[] = Object.keys(
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
          onClick={() => handleRowClick(info.row.original.id)}
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
    cell: ({ row }) => (
      <div className="cursor-pointer flex justify-center">
        <div onClick={() => handleDelete(row.original.id)}>{<TrashCan />}</div>
      </div>
    ),
  });

  return (
    <>
      {namespaceLoading && (
        <div className="flex text-center w-full h-full">Loading...</div>
      )}
      <DataTable data={namespaceData} columns={columns} />
      <ConfirmationModal />
    </>
  );
};

export default NamespaceDataTable;
