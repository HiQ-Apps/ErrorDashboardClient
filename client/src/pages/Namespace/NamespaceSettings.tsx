import { useNavigate, useParams } from "react-router-dom";

import NamespaceSidebar from "components/composite/NamespaceSidebar/NamespaceSidebar";
import BaseButton from "components/base/Button/Button";

const NamespaceSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

  const handleNamespaceLogsClick = () => {
    navigate(`/namespace/${id}/logs`);
  };

  const handleNamespaceSettingsClick = () => {
    navigate(`/namespace/${id}/settings`);
  };

  const links = [
    <BaseButton
      content="Console"
      size="sm"
      variant="sidenavbutton"
      onClick={handleNamespaceConsoleClick}
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
  ];

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar links={links} />
      </div>
      <div>
        <h1>Namespace Settings</h1>
      </div>
    </div>
  );
};

export default NamespaceSettings;
