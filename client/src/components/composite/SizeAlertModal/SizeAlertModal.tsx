import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Modal } from "components/base";
import {
  closeModal,
  openModal,
  selectModalType,
  selectIsOpen,
} from "features/modalSlice";
import { usePageDimensions } from "hooks/usePageDimensions";

const SizeAlertModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);
  const { width, height } = usePageDimensions();

  useEffect(() => {
    if (width < 768 || height < 600) {
      dispatch(openModal({ modalType: "mobileWarning" }));
    }
  }, [width, height]);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      header={"Site not optimized for mobile"}
      content={<div>Please use a larger screen to view this site</div>}
      open={isOpen && modalType === "mobileWarning"}
      onClose={handleClose}
      showConfirmButtons={false}
    />
  );
};

export default SizeAlertModal;
