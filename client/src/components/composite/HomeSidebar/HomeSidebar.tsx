import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BaseButton from "components/base/Button/Button";
import { selectIsAuthenticated, selectUser } from "features/authSlice";
import Sidebar from "components/base/Sidebar/Sidebar";

const HomeSidebar = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleDocumentationClick = () => {
    navigate("/documentation");
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
  ];

  const isAuthenticated = useSelector(selectIsAuthenticated);

  return <Sidebar isOpen={true} header="Home" links={links} />;
};

export default HomeSidebar;
