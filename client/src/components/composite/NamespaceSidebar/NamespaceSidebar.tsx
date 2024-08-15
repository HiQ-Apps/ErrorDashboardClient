import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { Sidebar, BaseButton } from "components/base";
import { selectIsOpen } from "features/sidebarSlice";

const NamespaceSidebar = () => {
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
    ];
  }

  return (
    <div className="relative">
      <Sidebar isOpen={isOpen} header="Namespace" links={links} />;
    </div>
  );
};

export default NamespaceSidebar;
