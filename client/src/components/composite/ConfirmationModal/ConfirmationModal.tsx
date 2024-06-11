import { useModalHandlerContext } from "shared/context/modalHandlerContext";
import { Modal } from "components/base";
import VerifyUserForm from "forms/VerifyUserForm";
import { useSelector } from "react-redux";
import { selectIsOpen, selectModalType } from "features/modalSlice";
import { VerifyUserRequest } from "types/User";

const ConfirmationModal = () => {
  const { onConfirm, onReject, unregisterHandler } = useModalHandlerContext();
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  const handleClose = () => {
    if (onReject) onReject();
    unregisterHandler();
  };

  const handleConfirm = (password: VerifyUserRequest) => {
    if (onConfirm) onConfirm(password);
    unregisterHandler();
  };

  return (
    <Modal
      header="Confirmation"
      content={<VerifyUserForm onConfirm={handleConfirm} />}
      open={isOpen && modalType === "confirmation"}
      onClose={handleClose}
      showConfirmButtons={false}
    />
  );
};

export default ConfirmationModal;
