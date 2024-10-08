import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BaseButton from "components/base/Button/Button";
import Sidebar from "components/base/Sidebar/Sidebar";
import { selectIsOpen } from "features/sidebarSlice";

const HomeSidebar = () => {
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsOpen);

  const handleDonateClick = () => {
    window.open(
      "https://www.paypal.com/donate/?business=9CQ3XGH3L2SLJ&no_recurring=0&item_name=Thank+you+for+donating+to+HiGuard.+All+donations+will+be+used+to+improve+the+product.&currency_code=USD"
    );
  };

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
    <BaseButton
      size="sm"
      content={"Buy me a coffee"}
      variant="sidenavbutton"
      onClick={handleDonateClick}
    />,
  ];

  return (
    <div className="relative">
      <Sidebar isOpen={isOpen} header="Home" links={links} />
    </div>
  );
};

export default HomeSidebar;
