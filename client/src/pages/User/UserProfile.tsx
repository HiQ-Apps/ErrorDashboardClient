import { UserSidebar } from "components/composite";
import { UpdateUserProfileCard } from "components/composite";
import { usePageHeight } from "hooks/usePageHeight";

const UserProfile = () => {
  const height = usePageHeight();

  return (
    <div className="bg-slate-50 text-slate-900 w-full flex flex-row relative dark:bg-slate-800 dark:text-slate-200">
      <div
        style={{ height: height ?? `${height}px` }}
        className="bg-slate-50 bg-gray-200 dark:bg-slate-800"
      >
        <UserSidebar />
      </div>
      <div className="min-w-52" />
      <div className="flex-1 p-4">
        <UpdateUserProfileCard />
      </div>
    </div>
  );
};

export default UserProfile;
