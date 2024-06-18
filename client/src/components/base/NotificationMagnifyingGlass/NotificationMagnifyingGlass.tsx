import { NotificationMagnifyingGlass as NotifyGlass } from "assets/index";
import { BaseButton } from "components/base";

const NotificationMagnifyingGlass = () => {
  return (
    <BaseButton
      variant="ghost"
      content={
        <div className="flex relative">
          <div className="bg-green-500 rounded-full w-4.2 h-4.2 absolute top-4.4 left-4.9" />
          <img
            className="min-h-14 min-w-14 h-14 w-14"
            src={NotifyGlass}
            alt="Alerts"
          />
        </div>
      }
    />
  );
};

export default NotificationMagnifyingGlass;
