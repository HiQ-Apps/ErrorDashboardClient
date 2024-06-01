import { ReactNode, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";

import { formatHeader } from "shared/utils/parseString";
import { useGetNamespaceErrorsQuery } from "features/namespaceApiSlice";
import { useWebSocket } from "hooks/useWebSocket";
import { ActiveDot, InactiveDot } from "assets/index";
import { DataTable } from "components/base/DataTable/DataTable";
import { ShortErrorData } from "types/Error";
import { API_URL } from "configs/environment";

interface ErrorDataTableProps {
  id: string;
}

const ErrorDataTable = ({ id }: ErrorDataTableProps) => {
  const navigate = useNavigate();

  // Replace with batching
  const wsUrl = `${API_URL}/namespace/${id}/error/ws`;

  const { messages, resetMessages } = useWebSocket<ShortErrorData>(wsUrl);

  const { data, isLoading } = useGetNamespaceErrorsQuery({
    id: id,
    offset: 0,
    limit: 10,
  });

  const [errors, setErrors] = useState<ShortErrorData[]>(data || []);
  const prevMessagesRef = useRef<ShortErrorData[]>([]);

  useEffect(() => {
    if (messages.length > 0) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, ...messages];
        prevMessagesRef.current = messages;
        return newErrors;
      });
      resetMessages();
    }
  }, [messages, resetMessages]);
  useEffect(() => {
    if (data) {
      setErrors(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!errors || errors.length === 0) {
    return <div>No errors found.</div>;
  }

  const handleRowClick = (id: string) => {
    navigate(`/error/${id}`);
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

  const columns: ColumnDef<(typeof errors)[0]>[] = Object.keys(errors[0]).map(
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
            {isBoolean ? renderBooleanCell(value as boolean) : String(value)}
          </div>
        );
      },
    })
  );

  return <DataTable data={errors} columns={columns} />;
};

export default ErrorDataTable;
