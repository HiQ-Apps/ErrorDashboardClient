import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Sidebar, BaseButton } from "components/base";
import {
  selectIsLoading as selectNamespaceSidebarIsLoading,
  selectIsOpen as selectNavIsOpen,
} from "features/sidebarSlice";
import { Modal } from "components/base";
import {
  selectIsOpen as selectModalIsOpen,
  selectModalType,
  openModal,
  closeModal,
  setIsLoading,
} from "features/modalSlice";
import InviteUserNamespaceForm from "forms/InviteUserNamespaceForm";
import {
  selectNamespaceById,
  useGetUserRoleQuery,
} from "features/namespaceApiSlice";
import { checkPermission } from "shared/utils/role";
import { useEffect } from "react";
import { SidebarLink } from "shared/types/extra";

const NamespaceSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const sidebarIsLoading = useSelector(selectNamespaceSidebarIsLoading);
  const navIsOpen = useSelector(selectNavIsOpen);
  const modalIsOpen = useSelector(selectModalIsOpen);
  const modalType = useSelector(selectModalType);

  const { data: userRole } = useGetUserRoleQuery(id as string, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    console.log("user role in namespace", userRole);
  }, [userRole]);

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

  let links: SidebarLink[] = [];

  if (!id) {
    links = [
      {
        name: "Console",
        path: "/namespace/console",
        component: (
          <BaseButton
            content="Console"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceConsoleClick}
          />
        ),
      },
    ];
  } else if (id && !sidebarIsLoading) {
    links = [
      {
        name: "Console",
        path: "/namespace/console",
        component: (
          <BaseButton
            content="Console"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceConsoleClick}
          />
        ),
      },
      {
        name: "Details",
        path: `/namespace/${id}`,
        component: (
          <BaseButton
            content="Details"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceDetailsClick}
          />
        ),
      },
      {
        name: "Logs",
        path: `/namespace/${id}/logs`,
        component: (
          <BaseButton
            content="Logs"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceLogsClick}
          />
        ),
      },
      {
        name: "Settings",
        path: `/namespace/${id}/settings`,
        component: (
          <BaseButton
            content="Settings"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceSettingsClick}
            disabled={userRole && !checkPermission(userRole, "update")}
          />
        ),
      },
      {
        name: "Metrics",
        path: `/namespace/${id}/metrics`,
        component: (
          <BaseButton
            content="Metrics"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceMetricClick}
          />
        ),
      },
      {
        name: "Alerts",
        path: `/namespace/${id}/alerts`,
        component: (
          <BaseButton
            content="Alerts"
            size="sm"
            variant="sidenavbutton"
            onClick={handleNamespaceAlertsClick}
          />
        ),
      },
      {
        name: "Invite User",
        path: "",
        component: (
          <BaseButton
            content="Invite User"
            size="sm"
            variant="sidenavbutton"
            onClick={handleOpenInviteUserModal}
          />
        ),
      },
    ];
  }

  return (
    <div className="relative">
      <Sidebar isOpen={navIsOpen} header="Namespace" links={links} />
      <Modal
        header="Invite User"
        content={<InviteUserNamespaceForm />}
        open={modalIsOpen && modalType === "namespaceInviteUser"}
        showConfirmButtons={false}
        onClose={handleCloseInviteUserModal}
        onConfirm={handleCloseInviteUserModal}
      />
    </div>
  );
};

export default NamespaceSidebar;
