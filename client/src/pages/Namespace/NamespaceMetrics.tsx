import { useNavigate, useParams } from "react-router-dom";

import { ErrorBarGraph, NamespaceSidebar } from "components/composite";
import { BaseButton } from "components/base";
import { Card, CardContent, CardHeader } from "components/ui/card";

const NamespaceMetrics = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

  const handleNamespaceSettingsClick = () => {
    navigate(`/namespace/${id}/settings`);
  };

  const handleNamespaceLogsClick = () => {
    navigate(`/namespace/${id}/logs`);
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
      <Card>
        <CardHeader>
          <h1>Namespace Metrics</h1>
        </CardHeader>
        <CardContent className="w-96">
          <ErrorBarGraph />
        </CardContent>
      </Card>
    </div>
  );
};

export default NamespaceMetrics;
