import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BaseButton from "components/base/Button/Button";
import Sidebar from "components/base/Sidebar/Sidebar";
import { selectUserProfile, selectIsAuthenticated } from "features/authSlice";
import { selectIsOpen } from "features/sidebarSlice";
import { Modal } from "components/base";
import CreateFeatureRequestForm from "forms/CreateFeatureRequestForm";

const HomeSidebar = () => {
  const navigate = useNavigate();
  const userProfile = useSelector(selectUserProfile);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isOpen = useSelector(selectIsOpen);
  const [featureRequestModalOpen, setFeatureRequestModalOpen] =
    useState<boolean>(false);

  const handleFeatureRequestClick = () => {
    setFeatureRequestModalOpen((prev) => !prev);
  };

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

  const handleAdminClick = () => {
    navigate("/admin/console");
  };

  const links = [
    {
      name: "About",
      path: "/about",
      component: (
        <BaseButton
          size="sm"
          content="About"
          variant="sidenavbutton"
          onClick={handleAboutClick}
        />
      ),
    },
    {
      name: "Terms of Service",
      path: "/termsofservice",
      component: (
        <BaseButton
          size="sm"
          content="Terms of Service"
          variant="sidenavbutton"
          onClick={handleTermsOfServiceClick}
        />
      ),
    },
    {
      name: "Releases",
      path: "/releases",
      component: (
        <BaseButton
          size="sm"
          content="Releases"
          variant="sidenavbutton"
          onClick={handleReleasesClick}
        />
      ),
    },
    {
      name: "Buy me a coffee",
      path: "/donate",
      component: (
        <BaseButton
          size="sm"
          content="Buy me a coffee"
          variant="sidenavbutton"
          onClick={handleDonateClick}
        />
      ),
    },
  ];

  if (isAuthenticated) {
    if (userProfile?.role === "admin") {
      links.push({
        name: "Admin Console",
        path: "/admin/console",
        component: (
          <BaseButton
            size="sm"
            content="Admin Console"
            variant="sidenavbutton"
            onClick={handleAdminClick}
          />
        ),
      });
    }

    links.push({
      name: "Request Feature",
      path: "None",
      component: (
        <BaseButton
          size="sm"
          content="Request Feature"
          variant="sidenavbutton"
          onClick={handleFeatureRequestClick}
        />
      ),
    });
  }

  return (
    <div className="relative">
      <Sidebar isOpen={isOpen} header="Home" links={links} />
      <Modal
        header="Request Feature"
        content={<CreateFeatureRequestForm />}
        open={featureRequestModalOpen}
        onClose={handleFeatureRequestClick}
        showConfirmButtons={false}
      />
    </div>
  );
};

export default HomeSidebar;
