import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";
import { NamespaceData } from "types/Namespace";
import ErrorDataTable from "components/composite/ErrorDataTable/ErrorDataTable";

const NamespaceDetail = () => {
  const { id } = useParams();

  const { data: namespace, isLoading } = useGetNamespaceByIdQuery(id as string);

  return (
    <div>
      <h1>Service Name: {namespace?.service_name}</h1>
      <p>Environment Type: {namespace?.environment_type}</p>
      <ErrorDataTable />
    </div>
  );
};

export default NamespaceDetail;
