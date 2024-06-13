import { useParams } from "react-router-dom";

import { NamespaceSidebar, ErrorDataTable } from "components/composite";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";

const NamespaceDetail = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const { data: namespace, isLoading } = useGetNamespaceByIdQuery(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar />
      </div>
      <div className="flex-1 p-4">
        <h1>Service Name: {namespace?.service_name}</h1>
        <p>Environment Type: {namespace?.environment_type}</p>
        {id ? <ErrorDataTable id={id} /> : null}
      </div>
    </div>
  );
};

export default NamespaceDetail;
