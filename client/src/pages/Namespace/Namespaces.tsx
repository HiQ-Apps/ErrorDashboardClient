import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {
  openModal,
  closeModal,
  selectIsOpen,
  selectModalType,
} from "features/modalSlice";
import { Modal, BaseButton } from "components/base";
import { NamespaceDataTable, NamespaceSidebar } from "components/composite";
import CreateNamespaceForm from "forms/CreateNamespaceForm";

const Namespaces = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isOpen = useSelector(selectIsOpen);
  const modalType = useSelector(selectModalType);

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

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

  const links = [
    <BaseButton
      content="Console"
      size="sm"
      variant="sidenavbutton"
      onClick={handleNamespaceConsoleClick}
    />,
    <BaseButton
      content="Create Namespace"
      size="sm"
      variant="sidenavbutton"
      onClick={handleOpenCreateNamespaceModal}
    />,
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <Modal
        header="Create Namespace"
        content={
          <CreateNamespaceForm onClose={handleCloseCreateNamespaceModal} />
        }
        open={isOpen && modalType === "createNamespace"}
        onClose={handleCloseCreateNamespaceModal}
        showConfirmButtons={false}
        onConfirm={handleConfirmCreateNamespace}
      />
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar links={links} />
      </div>
      <div className="flex-1 p-4">
        <NamespaceDataTable />
      </div>
    </div>
  );
};

export default Namespaces;
