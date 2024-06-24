import { NotificationMagnifyingGlass as NotifyGlass } from "assets/index";

const NotificationMagnifyingGlass = () => {
  return (
    <div className="flex relative my-0 overflow-none">
      <div className="bg-green-500 rounded-full w-4.2 h-4.2 absolute top-4.4 left-4.925" />
      <img className="min-h-14 min-w-14 h-14 w-14" src={NotifyGlass} />
    </div>
  );
};
export default NotificationMagnifyingGlass;
