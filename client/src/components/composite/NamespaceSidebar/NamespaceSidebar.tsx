import Sidebar from "components/base/Sidebar/Sidebar";
import { ReactNode } from "react";

interface NamespaceSidebarProps {
  links: ReactNode[];
}

const NamespaceSidebar = ({ links }: NamespaceSidebarProps) => {
  return <Sidebar isOpen={true} header="Namespace" links={links} />;
};

export default NamespaceSidebar;
