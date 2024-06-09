import { useNavigate, useParams } from "react-router-dom";

import NamespaceSidebar from "components/composite/NamespaceSidebar/NamespaceSidebar";
import BaseButton from "components/base/Button/Button";
import UpdateNamespaceForm from "forms/UpdateNamespaceForm";
import { Card, CardHeader } from "components/ui/card";
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
      <div className="w-full flex flex-col">
        <h1 className="py-12 underline underline-offset-8">
          Namespace Settings
        </h1>
        <Card className="pb-16 mr-4 dark:text-slate-800 dark:bg-slate-900 dark:text-slate-100">
          <CardHeader>Update Namespace</CardHeader>
          <UpdateNamespaceForm />
        </Card>
        <Separator className="my-8 bg-slate-600 dark:bg-slate-200" />
        <h1 className="pl-8 pr-4">Alerting</h1>
      </div>
    </div>
  );
};

export default NamespaceSettings;
