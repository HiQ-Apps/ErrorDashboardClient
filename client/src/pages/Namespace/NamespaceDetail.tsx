import { useParams, useNavigate } from "react-router-dom";

import NamespaceSidebar from "components/composite/NamespaceSidebar/NamespaceSidebar";
import ErrorDataTable from "components/composite/ErrorDataTable/ErrorDataTable";
import BaseButton from "components/base/Button/Button";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";

const NamespaceDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    throw new Error("Namespace ID is required");
  }

  const { data: namespace, isLoading } = useGetNamespaceByIdQuery(id);

  const handleNamespaceLogsClick = () => {
    navigate(`/namespace/${id}/logs`);
  };

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
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
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 p-4 bg-gray-200 h-screen dark:bg-slate-800">
        <NamespaceSidebar links={links} />
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
