import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useToast } from "components/ui/use-toast";
import { type ColumnDef } from "@tanstack/react-table";

import { DataTable, LoadingCard, StatusDot } from "components/base";
import { useGetUsersAdminQuery } from "features/adminApiSlice";
import { UserAdminData, VerifyUserRequest } from "types/User";
import { formatHeader } from "shared/utils/parseString";

const AdminUserDataTable = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    data: userData,
    error: userError,
    isError: userIsError,
    isLoading: userIsLoading,
  } = useGetUsersAdminQuery();

  const renderBooleanCell = (value: boolean) => {
    return <StatusDot status={value} />;
  };

  useEffect(() => {
    if (userError && userIsError) {
      toast({
        title: "User Error",
        description: JSON.stringify(userError),
      });
    }
  }, [userError, userIsError]);

  if (!userData || userData.length === 0) {
    return (
      <div className="flex text-center w-full h-full">No users registered</div>
    );
  }

  const columns: ColumnDef<UserAdminData>[] = Object.keys(userData[0]).map(
    (key) => ({
      header: formatHeader(key),
      accessorKey: key,
      cell: (info) => {
        const value = info.getValue() as UserAdminData;
        const user = value.user;
        const userProfile = value.userProfile;
        const isBoolean = typeof value === "boolean";
        return Object.keys(user).map((key) => {
          return (
            <div
              key={key}
              className={
                "p-2 align-middle text-center object-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
              }
            >
              {isBoolean ? renderBooleanCell(value) : String(value)}
            </div>
          );
        });
      },
    })
  );

  return (
    <div>
      {userIsLoading && <LoadingCard />}
      <DataTable columns={columns} data={userData} />
    </div>
  );
};

export default AdminUserDataTable;
