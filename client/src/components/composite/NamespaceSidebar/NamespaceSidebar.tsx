import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Sidebar, BaseButton } from "components/base";
import { selectIsOpen as selectNavIsOpen } from "features/sidebarSlice";
import { Modal } from "components/base";
import {
  selectIsOpen as selectModalIsOpen,
  selectModalType,
  openModal,
  closeModal,
  setIsLoading,
} from "features/modalSlice";

interface NamespaceSidebarProps {
  isLoading: boolean;
}

const NamespaceSidebar = ({ isLoading }: NamespaceSidebarProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navIsOpen = useSelector(selectNavIsOpen);
  const modalIsOpen = useSelector(selectModalIsOpen);
  const modalType = useSelector(selectModalType);

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

  const handleNamespaceDetailsClick = () => {
    navigate(`/namespace/${id}`);
  };

  const handleNamespaceLogsClick = () => {
    navigate(`/namespace/${id}/logs`);
  };

  const handleNamespaceSettingsClick = () => {
    navigate(`/namespace/${id}/settings`);
  };

  const handleNamespaceMetricClick = () => {
    navigate(`/namespace/${id}/metrics`);
  };

  const handleNamespaceAlertsClick = () => {
    navigate(`/namespace/${id}/alerts`);
  };

  const handleOpenInviteUserModal = () => {
    dispatch(
      openModal({
        modalType: "namespaceInviteUser",
      })
    );
  };

  const handleCloseInviteUserModal = () => {
    dispatch(closeModal());
  };

  let links;

  if (!id) {
    links = [
      <BaseButton
        content="Console"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceConsoleClick}
      />,
    ];
  } else {
    links = [
      <BaseButton
        content="Console"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceConsoleClick}
      />,
      <BaseButton
        content="Details"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceDetailsClick}
      />,
      <BaseButton
        content="Logs"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceLogsClick}
      />,
      <BaseButton
        content="Settings"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceSettingsClick}
      />,
      <BaseButton
        content="Metrics"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceMetricClick}
      />,
      <BaseButton
        content="Alerts"
        size="sm"
        variant="sidenavbutton"
        onClick={handleNamespaceAlertsClick}
      />,
      <BaseButton
        content="Invite User"
        size="sm"
        variant="sidenavbutton"
        onClick={handleOpenInviteUserModal}
      />,
    ];
  }

  return (
    <div className="relative">
      <Sidebar isOpen={navIsOpen} header="Namespace" links={links} />
      <Modal
        header="Invite User"
        content={<div>Invite user form</div>}
        open={modalIsOpen && modalType === "namespaceInviteUser"}
        showConfirmButtons={false}
        onClose={handleCloseInviteUserModal}
        onConfirm={handleCloseInviteUserModal}
      />
    </div>
  );
};

export default NamespaceSidebar;
