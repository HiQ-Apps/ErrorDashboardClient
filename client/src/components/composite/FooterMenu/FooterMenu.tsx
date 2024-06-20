import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GearIcon,
  BellIcon,
  EnvelopeOpenIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "components/ui/menubar";
import { selectUser } from "features/authSlice";
import { NotificationMagnifyingGlass, Avatar } from "components/base";

const FooterMenu = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleNavigateProfile = () => {
    navigate(`/user/${user?.id}/profile`);
  };

  return (
    <Menubar className="h-10 border-none overflow-none">
      <MenubarMenu>
        <MenubarTrigger className="p-0 w-12 h-12 flex justify-center items-center">
          <div className="cursor-pointer">
            <NotificationMagnifyingGlass />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {/* Make this alertish */}
            <BellIcon className="w-5 h-5 mr-2" />
            Notifications
          </MenubarItem>
          <MenubarItem>
            {/* Danger this up a bit when there is an Alert */}
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            Alerts
          </MenubarItem>
          <MenubarItem>
            {/* TODO: Implement alerting on messages */}
            {/* <EnvelopeOpenIcon className="w-5 h-5 mr-2"/> */}
            <EnvelopeClosedIcon className="w-5 h-5 mr-2" />
            Messages
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>
          <div className="cursor-pointer flex align-center items-center justify-center">
            <Avatar name={user?.username} size="30px" />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={handleNavigateProfile}>
            <GearIcon className="w-5 h-5 mr-2" />
            Profile Settings
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default FooterMenu;
