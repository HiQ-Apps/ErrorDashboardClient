import { useNavigate } from "react-router-dom";

import { Sidebar, BaseButton } from "components/base";

const DocumentationSidebar = () => {
  const navigate = useNavigate();

  const handleDocumentationClick = () => {
    navigate(`/documentation`);
  };

  let links;

  links = [
    <BaseButton
      content="Getting Started"
      size="sm"
      variant="sidenavbutton"
      onClick={handleDocumentationClick}
    />,
  ];

  return <Sidebar isOpen={true} header="Documentation" links={links} />;
};

export default DocumentationSidebar;
