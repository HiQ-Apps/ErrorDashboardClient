import { useSelector, useDispatch } from "react-redux";

import {
  openModal,
  closeModal,
  selectIsOpen as modalSelectIsOpen,
  selectModalType,
} from "features/modalSlice";
import { Modal, BaseButton } from "components/base";
import { NamespaceDataTable, NamespaceSidebar } from "components/composite";
import CreateNamespaceForm from "forms/CreateNamespaceForm";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen as sidebarSelectIsOpen } from "features/sidebarSlice";

const Namespaces = () => {
  const { height } = usePageDimensions();
  const dispatch = useDispatch();
  const sidebarIsOpen = useSelector(sidebarSelectIsOpen);

  const modalIsOpen = useSelector(modalSelectIsOpen);
  const modalType = useSelector(selectModalType);

  const handleOpenCreateNamespaceModal = () => {
    dispatch(
      openModal({
        modalType: "createNamespace",
      })
    );
  };

  const handleCloseCreateNamespaceModal = () => {
    dispatch(closeModal());
  };

  const handleConfirmCreateNamespace = () => {
    handleCloseCreateNamespaceModal();
  };

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <Modal
        header="Create Namespace"
        content={
          <CreateNamespaceForm onClose={handleCloseCreateNamespaceModal} />
        }
        open={modalIsOpen && modalType === "createNamespace"}
        onClose={handleCloseCreateNamespaceModal}
        showConfirmButtons={false}
        onConfirm={handleConfirmCreateNamespace}
      />
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <NamespaceSidebar />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex-1 px-4 pb-4 overflow-hidden mb-36">
        <BaseButton
          content="Create Namespace"
          size="sm"
          variant="accent"
          onClick={handleOpenCreateNamespaceModal}
          overrideStyles="my-4 px-3"
        />
        <NamespaceDataTable />
      </div>
    </div>
  );
};

export default Namespaces;
