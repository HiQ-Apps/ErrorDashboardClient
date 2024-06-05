import { useSelector, useDispatch } from "react-redux";
import { closeModal, selectIsOpen, selectModalType } from "features/modalSlice";
import Modal from "components/base/Modal/Modal";
import VerifyUserForm from "forms/VerifyUserForm";

interface ConfirmationModalProps {
  onConfirm: (credentials: { password: string }) => void;
}

const ConfirmationModal = ({ onConfirm }: ConfirmationModalProps) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  return (
    <Modal
      header="Confirmation"
      content={
        <VerifyUserForm
          onClose={() => dispatch(closeModal())}
          onConfirm={onConfirm}
        />
      }
      open={isOpen && modalType === "confirmation"}
      onClose={() => dispatch(closeModal())}
      showConfirmButtons={false}
    />
  );
};

export default ConfirmationModal;
