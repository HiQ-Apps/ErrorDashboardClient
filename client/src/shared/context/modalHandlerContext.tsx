import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type PasswordType = {
  password: string;
};

interface ModalHandlerContextType {
  onConfirm?: ({ password }: PasswordType) => void;
  onReject?: () => void;
  registerHandler: (
    onConfirm: ({ password }: PasswordType) => void,
    onReject: () => void
  ) => void;
  unregisterHandler: () => void;
}

const ModalHandlerContext = createContext<ModalHandlerContextType | undefined>(
  undefined
);

export const ModalHandlerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [handlers, setHandlers] = useState<{
    onConfirm?: ({ password }: PasswordType) => void;
    onReject?: () => void;
  }>({});

  const registerHandler = useCallback(
    (onConfirm: ({ password }: PasswordType) => void, onReject: () => void) => {
      setHandlers({ onConfirm, onReject });
    },
    []
  );

  const unregisterHandler = useCallback(() => {
    setHandlers({});
  }, []);

  return (
    <ModalHandlerContext.Provider
      value={{
        ...handlers,
        registerHandler,
        unregisterHandler,
      }}
    >
      {children}
    </ModalHandlerContext.Provider>
  );
};

export const useModalHandlerContext = (): ModalHandlerContextType => {
  const context = useContext(ModalHandlerContext);
  if (context === undefined) {
    throw new Error(
      "useModalHandlerContext must be used within a ModalHandlerProvider"
    );
  }
  return context;
};
