import { useParams, useNavigate } from "react-router-dom";

import { NamespaceSidebar, ErrorDataTable } from "components/composite";
import { BaseButton } from "components/base";
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

  const handleNamespaceSettingClick = () => {
    navigate(`/namespace/${id}/settings`);
  };

  const handleNamespaceConsoleClick = () => {
    navigate(`/namespace/console`);
  };

  const handleNamespaceMetricClick = () => {
    navigate(`/namespace/${id}/metrics`);
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
      onClick={handleNamespaceSettingClick}
    />,
    <BaseButton
      content="Metrics"
      size="sm"
      variant="sidenavbutton"
      onClick={handleNamespaceMetricClick}
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
