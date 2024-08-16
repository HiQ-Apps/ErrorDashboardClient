import { useSelector } from "react-redux";

import { selectIsOpen } from "features/sidebarSlice";
import { DocumentationSidebar } from "components/composite";
import { usePageDimensions } from "hooks/usePageDimensions";
import { InstallationCard } from "components/composite";

const InstallationDocumentation = () => {
  const { height } = usePageDimensions();
  const sidebarIsOpen = useSelector(selectIsOpen);

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <DocumentationSidebar />
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarIsOpen ? "min-w-60" : "min-w-8"
        }`}
      />
      <div className="flex-1 justify-center px-4 pb-4 mt-3">
        <InstallationCard />
      </div>
    </div>
  );
};

export default InstallationDocumentation;
