import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectIsOpen } from "features/sidebarSlice";
import { Sidebar, BaseButton } from "components/base";

const DocumentationSidebar = () => {
  const navigate = useNavigate();
  const sidebarIsOpen = useSelector(selectIsOpen);

  const handleDocumentationClick = () => {
    navigate(`/documentation/installation`);
  };

  const handleGettingStartedClick = () => {
    navigate(`/documentation/getting-started`);
  };

  let links;

  links = [
    <BaseButton
      content="Installation"
      size="sm"
      variant="sidenavbutton"
      onClick={handleDocumentationClick}
    />,
    <BaseButton
      content="Getting Started"
      size="sm"
      variant="sidenavbutton"
      onClick={handleGettingStartedClick}
    />,
  ];

  return (
    <div className="relative">
      <Sidebar isOpen={sidebarIsOpen} header="Documentation" links={links} />
    </div>
  );
};

export default DocumentationSidebar;
