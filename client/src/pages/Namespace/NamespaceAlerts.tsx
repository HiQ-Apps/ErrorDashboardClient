import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  NamespaceSidebar,
  CreateNamespaceAlertCard,
  NamespaceAlertListCard,
} from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { selectIsOpen } from "features/sidebarSlice";
import { LoadingCard } from "components/base";

const NamespaceAlerts = () => {
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
        <NamespaceSidebar isLoading={!!id} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div>
        <NamespaceAlertListCard namespaceId={id} />
        <CreateNamespaceAlertCard />
      </div>
    </div>
  );
};

export default NamespaceAlerts;
