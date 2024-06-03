import type { ReactNode } from "react";

import Sidebar from "components/base/Sidebar/Sidebar";

interface ErrorSidebarProps {
  links: ReactNode[];
}

const ErrorSidebar = ({ links }: ErrorSidebarProps) => {
  return <Sidebar isOpen={true} header="Error" links={links} />;
};

export default ErrorSidebar;
