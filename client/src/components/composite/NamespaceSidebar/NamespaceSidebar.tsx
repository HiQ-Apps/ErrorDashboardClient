import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sidebar, BaseButton } from "components/base";
import { selectIsOpen } from "features/sidebarSlice";

interface NamespaceSidebarProps {
  isLoading: boolean;
}

const NamespaceSidebar = ({ isLoading }: NamespaceSidebarProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isOpen = useSelector(selectIsOpen);

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
    ];
  }

  return (
    <div className="relative">
      <Sidebar isOpen={isOpen} header="Namespace" links={links} />
    </div>
  );
};

export default NamespaceSidebar;
