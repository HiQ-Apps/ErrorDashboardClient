import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectUser } from "features/authSlice";
import { Sidebar, BaseButton } from "components/base";

const UserSidebar = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleUserProfileClick = () => {
    navigate(`/user/${user?.id}/profile`);
  };

  const links = [
    <BaseButton
      content="Profile"
      size="sm"
      variant="sidenavbutton"
      onClick={handleUserProfileClick}
    />,
  ];

  return <Sidebar isOpen={true} header="User" links={links} />;
};

export default UserSidebar;
