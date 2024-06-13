import { useParams } from "react-router-dom";

import { NamespaceSidebar, UpdateNamespaceCard } from "components/composite";
import { Separator } from "components/ui/separator";

const NamespaceSettings = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar />
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
