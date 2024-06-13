import { useNavigate, useParams } from "react-router-dom";

import { Sidebar, BaseButton } from "components/base";

const NamespaceSidebar = () => {
  const navigate = useNavigate();
  const { id } = useParams();

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

  return <Sidebar isOpen={true} header="Namespace" links={links} />;
};

export default NamespaceSidebar;
