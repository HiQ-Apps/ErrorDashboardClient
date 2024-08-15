import type { ReactNode } from "react";
import { useSelector } from "react-redux";

import { selectIsOpen } from "features/sidebarSlice";
import Sidebar from "components/base/Sidebar/Sidebar";

interface ErrorSidebarProps {
  links: ReactNode[];
}

const ErrorSidebar = ({ links }: ErrorSidebarProps) => {
  const sidebarIsOpen = useSelector(selectIsOpen);

  return (
    <div className="relative">
      <Sidebar isOpen={sidebarIsOpen} header="Error" links={links} />
    </div>
  );
};

export default ErrorSidebar;
