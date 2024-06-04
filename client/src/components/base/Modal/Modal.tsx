import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import BaseButton from "components/base/Button/Button";

interface ModalProps {
  header: string;
  content: ReactNode;
  open: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  showConfirmButtons?: boolean;
}

const Modal = ({
  header,
  content,
  open,
  onClose,
  onConfirm,
  showConfirmButtons,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="p-4">{content}</div>
        <div className="flex flex-row justify-end p-4">
          {showConfirmButtons ? (
            <>
              <BaseButton
                content="Cancel"
                onClick={onClose}
                variant="default"
              />
              <BaseButton
                content="Confirm"
                onClick={onConfirm}
                variant="default"
              />
            </>
          ) : (
            <BaseButton content="Close" onClick={onClose} variant="default" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
