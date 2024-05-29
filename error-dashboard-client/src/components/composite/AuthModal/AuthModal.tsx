import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import BaseButton from "components/base/Button/Button";

interface AuthModalProps {
  header: string;
  content: ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthModal = ({
  header,
  content,
  isOpen,
  onOpenChange,
}: AuthModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          {content}
        </DialogHeader>
        <div className="flex flex-row justify-end">
          <BaseButton
            content="Close"
            onClick={() => onOpenChange(false)}
            variant="default"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
