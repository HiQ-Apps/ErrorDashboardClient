import { useSelector } from "react-redux";

import { selectIsAuthenticated } from "features/authSlice";
import { TimezoneSelector, FooterMenu } from "components/composite";
import { Clock } from "components/base";

const Footer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return (
    <div className="flex flex-row justify-between p-2 text-slate-600 bg-slate-100 min-w-full fixed bottom-0 text-xs text-right dark:bg-slate-900 dark:text-slate-300">
      {isAuthenticated ? <FooterMenu /> : <></>}
      <div className="flex flex-row space-x-4">
        <div className="flex flex-row align-center justify-center items-center">
          <TimezoneSelector />
        </div>
        <Clock />
      </div>
    </div>
  );
};

export default Footer;
