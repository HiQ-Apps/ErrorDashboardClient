import { useParams } from "react-router-dom";

import {
  BarGraphCard,
  NamespaceSidebar,
  NamespaceTitleCard,
} from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";

const NamespaceMetrics = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();

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
      <div className="min-w-52" />
      <div className="flex-1 px-4 pb-4">
        <NamespaceTitleCard header="Namespace Metrics" />
        <BarGraphCard />
      </div>
    </div>
  );
};

export default NamespaceMetrics;
