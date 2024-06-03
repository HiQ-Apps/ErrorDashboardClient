import { useEffect, useState, useRef } from "react";

import { useWebSocket } from "hooks/useWebSocket";
import type { ShortErrorData } from "types/Error";
import { API_URL } from "configs/environment";
import LogTable from "components/base/LogTable/LogTable";

interface ErrorLogProps {
  id: string;
}

const ErrorLogTable = ({ id }: ErrorLogProps) => {
  const columns = ["Message", "Status code", "Resolved", "Created At"];
  const wsUrl = `${API_URL}/namespace/${id}/error/ws`;

  const { messages, resetMessages } = useWebSocket<ShortErrorData>(wsUrl);

  const [errors, setErrors] = useState<ShortErrorData[]>([]);
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

  return <LogTable data={errors} columns={columns} />;
};

export default ErrorLogTable;
