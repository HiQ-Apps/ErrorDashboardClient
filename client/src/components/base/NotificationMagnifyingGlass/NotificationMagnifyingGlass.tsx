import { NotificationMagnifyingGlass as NotifyGlass } from "assets/index";

interface NotificationMagnifyingGlass {
  hasAlert: boolean;
}

const NotificationMagnifyingGlass = ({
  hasAlert,
}: NotificationMagnifyingGlass) => {
  return (
    <div className="flex relative my-0 overflow-none">
      <div
        className="rounded-full w-4.2 h-4.2 absolute top-4.4 left-4.925"
        style={{
          // red if hasAlert, green if !hasAlert
          backgroundColor: hasAlert ? "#ef4444" : "#22c55e",
        }}
      />
      <img className="min-h-14 min-w-14 h-14 w-14" src={NotifyGlass} />
    </div>
  );
};
export default NotificationMagnifyingGlass;
