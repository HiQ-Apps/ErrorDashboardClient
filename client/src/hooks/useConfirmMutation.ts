import { useDispatch, useSelector } from "react-redux";
import {
  openModal,
  closeModal,
  confirm,
  selectIsOpen,
} from "features/modalSlice";
import { useVerifyUserMutation } from "features/userApiSlice";

const useConfirmMutation = () => {
  const dispatch = useDispatch();
  const [verifyUser] = useVerifyUserMutation();
  const modalOpen = useSelector(selectIsOpen);

  const triggerConfirmation = () => {
    return new Promise<{ password: string }>((resolve, reject) => {
      dispatch(
        openModal({
          modalType: "confirmation",
          onConfirm: async (credentials: { password: string }) => {
            try {
              await verifyUser(credentials).unwrap();
              resolve(credentials);
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

  const confirmWithCredentials = (credentials: { password: string }) => {
    dispatch(confirm(credentials));
  };

  return { triggerConfirmation, confirmWithCredentials, modalOpen };
};

export default useConfirmMutation;
