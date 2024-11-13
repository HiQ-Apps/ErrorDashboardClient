import { useEffect, useState, useRef } from "react";

import { useWebSocket } from "hooks/useWebSocket";
import type { StreamErrorData } from "types/Error";
import LogTable from "components/base/LogTable/LogTable";

interface ErrorLogProps {
  id: string;
}

const ErrorLogTable = ({ id }: ErrorLogProps) => {
  const wsUrl = `/api/ws/namespace/${id}/error`;
  const { messages, resetMessages } = useWebSocket<StreamErrorData>(wsUrl);

  const [errors, setErrors] = useState<StreamErrorData[]>([]);
  const prevMessagesRef = useRef<StreamErrorData[]>([]);

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

  return (
    <div className="mb-36">
      <LogTable data={errors} />
    </div>
  );
};

export default ErrorLogTable;
