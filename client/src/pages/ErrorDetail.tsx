import { useParams } from "react-router-dom";
import { useGetErrorByIdQuery } from "features/errorApiSlice";

const ErrorDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetErrorByIdQuery(id as string);

  return (
    <div>
      <h1>Error Detail</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <p>Error ID: {data?.id}</p>
          <p>Error Message: {data?.message}</p>
          <p>Error Stack Trace: {data?.stack_trace}</p>
          <p>Error Status Code: {data?.status_code}</p>
          <p>Error path: {data?.path}</p>
          <p>Error line: {data?.line}</p>
          <p>Error Resolved: {data?.resolved}</p>
          <p>User Affected: {data?.user_affected}</p>
        </div>
      )}
    </div>
  );
};

export default ErrorDetail;
