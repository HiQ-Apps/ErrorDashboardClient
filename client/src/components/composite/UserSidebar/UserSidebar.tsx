import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "features/authSlice";
import { selectIsOpen as selectNavIsOpen } from "features/sidebarSlice";
import { Sidebar, BaseButton } from "components/base";

const UserSidebar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const navIsOpen = useSelector(selectNavIsOpen);

  const handleUserProfileClick = () => {
    navigate(`/user/${user?.id}/profile`);
  };

  const links = [
    {
      name: "Profile",
      path: "/user/:id/profile",
      component: (
        <BaseButton
          content="Profile"
          size="sm"
          variant="sidenavbutton"
          onClick={handleUserProfileClick}
        />
      ),
    },
  ];

  return (
    <div className="relative">
      <Sidebar isOpen={navIsOpen} header="User" links={links} />
    </div>
  );
};

export default UserSidebar;
