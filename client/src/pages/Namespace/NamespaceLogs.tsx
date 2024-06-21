import { useParams } from "react-router-dom";

import {
  NamespaceSidebar,
  ErrorLogTable,
  NamespaceTitleCard,
} from "components/composite";

const NamespaceLogs = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar />
      </div>
      <div className="flex-1 p-4">
        <NamespaceTitleCard header="Namespace Error Logs" />
        <ErrorLogTable id={id} />
      </div>
    </div>
  );
};

export default NamespaceLogs;
