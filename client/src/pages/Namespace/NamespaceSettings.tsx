import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsOpen } from "features/sidebarSlice";
import {
  NamespaceSidebar,
  NamespaceTitleCard,
  UpdateNamespaceCard,
} from "components/composite";
import { Separator } from "components/ui/separator";
import { usePageDimensions } from "hooks/usePageDimensions";

const NamespaceSettings = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();
  const sidebarIsOpen = useSelector(selectIsOpen);

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <NamespaceSidebar />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex-1 px-4 pb-4">
        <NamespaceTitleCard header="Namespace Settings" />
        <UpdateNamespaceCard />
        <Separator className="my-8 bg-slate-600 dark:bg-slate-200" />
        <h1 className="pl-8 pr-4">Alerting</h1>
        <h2>Coming Soon!</h2>
      </div>
    </div>
  );
};

export default NamespaceSettings;
