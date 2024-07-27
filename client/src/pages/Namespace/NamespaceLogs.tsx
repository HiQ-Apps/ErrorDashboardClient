import { useParams } from "react-router-dom";

import {
  NamespaceSidebar,
  ErrorLogTable,
  NamespaceTitleCard,
} from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";

const NamespaceLogs = () => {
  const { height } = usePageDimensions();
  const { id } = useParams();

  if (!id) {
    return;
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
        <NamespaceTitleCard header="Namespace Error Logs" />
        <ErrorLogTable id={id} />
      </div>
    </div>
  );
};

export default NamespaceLogs;
