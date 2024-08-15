import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsOpen } from "features/sidebarSlice";
import { useGetErrorByIdQuery } from "features/errorApiSlice";
import { BaseButton } from "components/base";
import { ErrorSidebar, ErrorDetailCard } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";

const ErrorDetail = () => {
  const { height } = usePageDimensions();
  const navigate = useNavigate();
  const { id } = useParams();
  const sidebarIsOpen = useSelector(selectIsOpen);

  if (!id) {
    throw new Error("Error ID is required");
  }

  const { data, isLoading } = useGetErrorByIdQuery(id);

  const handleErrorsClick = () => {
    navigate(`/error/${id}/console`);
  };

  const links = [
    <BaseButton
      content="Console"
      size="sm"
      variant="sidenavbutton"
      onClick={handleErrorsClick}
      overrideStyles="px-3"
    />,
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <ErrorSidebar links={links} />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex flex-row px-4 justify-between">
        <ErrorDetailCard error={data} />
      </div>
    </div>
  );
};

export default ErrorDetail;
