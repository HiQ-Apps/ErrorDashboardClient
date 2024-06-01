import { useParams } from "react-router-dom";
import { useGetNamespaceByIdQuery } from "features/namespaceApiSlice";
import ErrorDataTable from "components/composite/ErrorDataTable/ErrorDataTable";

const NamespaceDetail = () => {
  const { id } = useParams();

  const { data: namespace, isLoading } = useGetNamespaceByIdQuery(id as string);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Service Name: {namespace?.service_name}</h1>
      <p>Environment Type: {namespace?.environment_type}</p>
      {id ? <ErrorDataTable id={id} /> : null}
    </div>
  );
};

export default NamespaceDetail;
