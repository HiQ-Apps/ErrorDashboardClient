import { useNavigate, useParams } from "react-router-dom";

import { NamespaceSidebar, UpdateNamespaceCard } from "components/composite";
import { BaseButton } from "components/base";
import { Separator } from "components/ui/separator";

const NamespaceSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

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

  const links = [
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

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar links={links} />
      </div>
      <div className="w-full flex flex-col">
        <h1 className="py-12 underline underline-offset-8">
          Namespace Settings
        </h1>
        <UpdateNamespaceCard />
        <Separator className="my-8 bg-slate-600 dark:bg-slate-200" />
        <h1 className="pl-8 pr-4">Alerting</h1>
      </div>
    </div>
  );
};

export default NamespaceSettings;
