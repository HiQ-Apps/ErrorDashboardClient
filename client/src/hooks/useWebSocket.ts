import { useCallback, useEffect, useState } from "react";

export const useWebSocket = <T>(url: string | undefined) => {
  const [messages, setMessages] = useState<T[]>([]);
  const [connectionError, setConnectionError] = useState<string | null>(null);

  const resetMessages = useCallback(() => {
    setMessages([]);
  }, []);

  useEffect(() => {
    if (!url) {
      setConnectionError("WebSocket URL is not provided");
      return;
    }

    const socket = new WebSocket(url);

    socket.onopen = () => {
      setConnectionError(null);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data) as T;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.onclose = () => {
      setConnectionError("WebSocket connection closed");
    };

    socket.onerror = (error) => {
      setConnectionError("WebSocket connection error");
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, [url]);

  return { messages, connectionError, resetMessages };
};
