import { TimezoneSelector } from "components/composite";
import { NotificationMagnifyingGlass } from "components/base";
import { Clock } from "components/base";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between p-2 text-slate-600 bg-slate-100 min-w-full fixed bottom-0 text-xs text-right dark:bg-slate-900 dark:text-slate-300">
      <NotificationMagnifyingGlass />

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
