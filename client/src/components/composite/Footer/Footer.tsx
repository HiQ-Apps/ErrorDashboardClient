import { useSelector } from "react-redux";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "components/ui/menubar";
import { selectUser } from "features/authSlice";
import { TimezoneSelector } from "components/composite";
import { NotificationMagnifyingGlass, Avatar, Clock } from "components/base";

const Footer = () => {
  const user = useSelector(selectUser);

  return (
    <div className="flex flex-row justify-between p-2 text-slate-600 bg-slate-100 min-w-full fixed bottom-0 text-xs text-right dark:bg-slate-900 dark:text-slate-300">
      <div className="flex flex-row space-x-4">
        <NotificationMagnifyingGlass />
        <Avatar name={user?.username} />
      </div>
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row">
          <TimezoneSelector />
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default Footer;
