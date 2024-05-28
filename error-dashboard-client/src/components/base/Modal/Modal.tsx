import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "components/ui/dialog";
import BaseButton from "components/base/Button/Button";
import { ReactNode } from "react";

interface ModalProps {
  header: string;
  content: ReactNode;
  open: () => void;
  onClose: () => void;
}

const Modal = ({ header, content, open, onClose }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <BaseButton content="Open Dialog" onClick={open} variant="default" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{header}</DialogTitle>
          <DialogDescription>{content}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-row justify-end">
          <BaseButton content="Close" onClick={onClose} variant="default" />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
