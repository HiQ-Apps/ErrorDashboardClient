import { ReactNode, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { type ColumnDef } from "@tanstack/react-table";
import {
  useGetNamespacesByUserQuery,
  useDeleteNamespaceByIdMutation,
} from "features/namespaceApiSlice";
import { useVerifyUserMutation } from "features/userApiSlice";
import { setError, clearError } from "features/errorBoundarySlice";
import TrashCan from "components/base/TrashCan/TrashCan";
import { DataTable } from "components/base/DataTable/DataTable";
import { ActiveDot, InactiveDot } from "assets/index";
import { selectUser } from "features/authSlice";
import BaseButton from "components/base/Button/Button";
import { formatHeader } from "shared/utils/parseString";
import { useToast } from "components/ui/use-toast";
import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import ConfirmationModal from "components/composite/ConfirmationModal/ConfirmationModal";
import { openModal, closeModal } from "features/modalSlice";
import { VerifyUserRequest } from "types/User";

const NamespaceDataTable = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { registerHandler, unregisterHandler } = useModalHandlerContext();

  const [verifyUser] = useVerifyUserMutation();

  const {
    data: namespaceData,
    isLoading: namespaceLoading,
    isError: namespaceIsError,
    error: namespaceError,
  } = useGetNamespacesByUserQuery(
    { id: user?.id || "", offset: 0, limit: 20 },
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
  }, [namespaceIsError, namespaceError, dispatch]);

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

  const handleDelete = async (id: string) => {
    registerHandler(
      async (password: VerifyUserRequest) => {
        try {
          await verifyUser(password).unwrap();
          deleteNamespaceById(id).unwrap();
          dispatch(closeModal());
          console.log("Namespace deleted successfully");
          unregisterHandler();
        } catch (error) {
          console.error("Action rejected or failed:", error);
        }
      },
      () => {
        console.error("Action rejected");
        unregisterHandler();
        dispatch(closeModal());
      }
    );
    dispatch(openModal({ modalType: "confirmation" }));
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

  if (namespaceLoading) {
    return <div>Loading...</div>;
  }

  if (!namespaceData || namespaceData.length === 0) {
    return <div>No namespaces found.</div>;
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
      <DataTable data={namespaceData} columns={columns} />
      <ConfirmationModal />
    </div>
  );
};

export default NamespaceDataTable;
