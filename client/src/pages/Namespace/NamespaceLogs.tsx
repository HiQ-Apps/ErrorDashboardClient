import { useParams } from "react-router-dom";

import { NamespaceSidebar, ErrorLogTable } from "components/composite";

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
      <div>
        <p>Logs for the namespace errors</p>
        <ErrorLogTable id={id} />
      </div>
    </div>
  );
};

export default NamespaceLogs;
