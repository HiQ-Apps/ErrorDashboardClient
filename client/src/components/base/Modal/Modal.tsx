import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "components/ui/dialog";
import BaseButton from "components/base/Button/Button";
import { ReactNode } from "react";

interface ModalProps {
  header: string;
  content: ReactNode;
  open: boolean;
  onClose: () => void;
}

const Modal = ({ header, content, open, onClose }: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
        </DialogHeader>
        <div className="p-4">{content}</div>
        <div className="flex flex-row justify-end p-4">
          <BaseButton content="Close" onClick={onClose} variant="default" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
