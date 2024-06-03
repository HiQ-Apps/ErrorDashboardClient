import { useParams, useNavigate } from "react-router-dom";

import { useGetErrorByIdQuery } from "features/errorApiSlice";
import BaseButton from "components/base/Button/Button";
import ErrorSidebar from "components/composite/ErrorSidebar/ErrorSidebar";
import ErrorDetailCard from "components/composite/ErrorDetailCard/ErrorDetailCard";

const ErrorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, isLoading } = useGetErrorByIdQuery(id as string);

  const handleErrorsClick = () => {
    navigate(`/error/${id}/console`);
  };

  const links = [
    <BaseButton
      content="Console"
      size="sm"
      variant="sidenavbutton"
      onClick={handleErrorsClick}
    />,
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div className="bg-slate-50 w-52 bg-gray-200 h-screen dark:bg-slate-800">
        <ErrorSidebar links={links} />
      </div>
      <div className="flex flex-row px-4 justify-between">
        <ErrorDetailCard error={data} />
      </div>
    </div>
  );
};

export default ErrorDetail;
