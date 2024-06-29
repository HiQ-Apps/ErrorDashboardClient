import { useNavigate } from "react-router-dom";

import BaseButton from "components/base/Button/Button";
import Sidebar from "components/base/Sidebar/Sidebar";

const HomeSidebar = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleDocumentationClick = () => {
    navigate("/documentation");
  };

  const handleTermsOfServiceClick = () => {
    navigate("/termsofservice");
  };

  const links = [
    <BaseButton
      size="sm"
      content={"About"}
      variant="sidenavbutton"
      onClick={handleAboutClick}
    />,
    <BaseButton
      size="sm"
      content={"Documentation"}
      variant="sidenavbutton"
      onClick={handleDocumentationClick}
    />,
    <BaseButton
      size="sm"
      content={"Terms of Service"}
      variant="sidenavbutton"
      onClick={handleTermsOfServiceClick}
    />,
  ];

  return <Sidebar isOpen={true} header="Home" links={links} />;
};

export default HomeSidebar;
