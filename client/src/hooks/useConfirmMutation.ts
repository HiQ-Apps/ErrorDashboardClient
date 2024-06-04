import { useDispatch, useSelector } from "react-redux";

import type { LoginUserRequest } from "types/User";
import { RootState } from "configs/store";
import { openModal, closeModal } from "features/modalSlice";
import { useVerifyUserMutation } from "features/userApiSlice";

const useConfirmMutation = () => {
  const dispatch = useDispatch();
  const [verifyUser] = useVerifyUserMutation();
  const modalOpen = useSelector((state: RootState) => state.modal.isOpen);

  const triggerConfirmation = (credentials: LoginUserRequest) => {
    return new Promise((resolve, reject) => {
      dispatch(
        openModal({
          onConfirm: async () => {
            try {
              const result = await verifyUser(credentials).unwrap();
              resolve(result);
            } catch (err) {
              reject(err);
            } finally {
              dispatch(closeModal());
            }
          },
          onReject: () => {
            reject(new Error("User rejected the confirmation."));
            dispatch(closeModal());
          },
        })
      );
    });
  };

  return { triggerConfirmation, modalOpen };
};

export default useConfirmMutation;
