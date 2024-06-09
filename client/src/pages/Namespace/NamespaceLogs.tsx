import { useParams, useNavigate } from "react-router-dom";

import { BaseButton } from "components/base";
import { NamespaceSidebar, ErrorLogTable } from "components/composite";

const NamespaceLogs = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const navigate = useNavigate();

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
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
        <p>Logs for the namespace errors</p>
        <ErrorLogTable id={id} />
      </div>
    </div>
  );
};

export default NamespaceLogs;
