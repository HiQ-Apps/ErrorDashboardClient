import { useEffect, useState, useRef } from "react";
import { useWebSocket } from "hooks/useWebSocket";
import type { StreamErrorData } from "types/Error";
import { API_URL } from "configs/environment";
import LogTable from "components/base/LogTable/LogTable";

interface ErrorLogProps {
  id: string;
}

const ErrorLogTable = ({ id }: ErrorLogProps) => {
  const wsUrl = `${API_URL}/namespace/${id}/error/ws`;
  const { messages, resetMessages } = useWebSocket<StreamErrorData>(wsUrl);

  const [errors, setErrors] = useState<StreamErrorData[]>([]);
  const prevMessagesRef = useRef<StreamErrorData[]>([]);

  useEffect(() => {
    console.log(messages);
    if (messages.length > 0) {
      setErrors((prevErrors) => {
        const newErrors = [...prevErrors, ...messages];
        prevMessagesRef.current = messages;
        return newErrors;
      });
      resetMessages();
    }
  }, [messages, resetMessages]);

  return <LogTable data={errors} />;
};

export default ErrorLogTable;
