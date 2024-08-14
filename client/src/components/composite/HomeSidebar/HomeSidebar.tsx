import { useNavigate } from "react-router-dom";

import BaseButton from "components/base/Button/Button";

import Sidebar from "components/base/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import { selectIsOpen } from "features/sidebarSlice";

const HomeSidebar = () => {

  const navigate = useNavigate();
  const isOpen = useSelector(selectIsOpen);
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

  return (
    <div className="relative">
        <Sidebar isOpen={isOpen} header="Home" links={links} />
    </div>
  );
};

export default HomeSidebar;
