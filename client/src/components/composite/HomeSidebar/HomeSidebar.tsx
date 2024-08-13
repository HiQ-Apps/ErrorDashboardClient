import { useNavigate } from "react-router-dom";

import BaseButton from "components/base/Button/Button";
import Sidebar from "components/base/Sidebar/Sidebar";

const HomeSidebar = () => {
  const navigate = useNavigate();

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleTermsOfServiceClick = () => {
    navigate("/termsofservice");
  };

  const handleReleasesClick = () => {
    navigate("/releases");
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
      content={"Terms of Service"}
      variant="sidenavbutton"
      onClick={handleTermsOfServiceClick}
    />,
    <BaseButton
      size="sm"
      content={"Releases"}
      variant="sidenavbutton"
      onClick={handleReleasesClick}
    />,
  ];

  return <Sidebar isOpen={true} header="Home" links={links} />;
};

export default HomeSidebar;
