import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "components/ui/use-toast";
import { RootState } from "configs/store";
import { openModal, closeModal } from "features/modalSlice";
import Modal from "components/base/Modal/Modal";
import CreateNamespaceForm from "forms/CreateNamespaceForm";
import BaseButton from "components/base/Button/Button";
import NamespaceDataTable from "components/composite/NamespaceDataTable/NamespaceDataTable";
import NamespaceSidebar from "components/composite/NamespaceSidebar/NamespaceSidebar";

const Namespaces = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

  const handleOpenCreateNamespaceModal = () => {
    dispatch(openModal({}));
  };

  const handleCloseCreateNamespaceModal = () => {
    dispatch(closeModal());
    toast({
      title: "Namespace created successfully",
      description: "Success",
    });
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
        open={isOpen}
        onClose={handleCloseCreateNamespaceModal}
        showConfirmButtons={true}
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
