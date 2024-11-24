import { useEffect, useState, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "components/ui/use-toast";
import type { ColumnDef, Row } from "@tanstack/react-table";
import { DateTime } from "luxon";

import {
  Avatar,
  DataTable,
  LoadingCard,
  StatusDot,
  TrashCan,
} from "components/base";
import { selectTimeZone } from "features/timezoneSlice";
import { useGetUsersAdminQuery } from "features/adminApiSlice";
import {
  BaseUserDTO,
  BaseUserProfileDTO,
  UserAdminData,
  VerifyUserRequest,
} from "types/User";
import { formatHeader } from "shared/utils/parseString";
import { Popover, PopoverContent, PopoverTrigger } from "components/ui/popover";

const AdminUserDataTable = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const timezone: string = useSelector(selectTimeZone);

  const [userProfilePopover, setUserProfilePopover] =
    useState<BaseUserProfileDTO>({
      id: "",
      userId: "",
      firstName: "",
      lastName: "",
      role: "",
      avatarColor: "",
      createdAt: "",
      updatedAt: "",
    });
  const [avatarName, setAvatarName] = useState("");

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

  const userTableData: BaseUserDTO[] = userData.map((item) => item.user);
  const userProfileData: BaseUserProfileDTO[] = userData.map(
    (item) => item.userProfile
  );

  const columns: ColumnDef<BaseUserDTO>[] = Object.keys(userTableData[0]).map(
    (key) => ({
      header: formatHeader(key),
      accessorKey: key,
      cell: (info) => {
        const userData = info.getValue();
        const isBoolean = typeof userData === "boolean";
        return (
          <div
            key={key}
            className={
              "p-2 align-middle text-center object-center cursor-pointer dark:text-slate-300 dark:bg-transparent"
            }
          >
            {isBoolean ? renderBooleanCell(userData) : String(userData)}
          </div>
        );
      },
    })
  );

  const onRowClick = (row: Row<BaseUserDTO>) => {
    const user = row.original;
    const username = user.username;
    const userProfile = userProfileData.filter(
      (profile) => profile.userId === user.id
    )[0];
    setAvatarName(username);
    setUserProfilePopover(userProfile);
  };

  return (
    <div>
      {userIsLoading && <LoadingCard />}
      <Popover>
        <PopoverTrigger>
          <DataTable
            columns={columns}
            data={userTableData}
            onRowClick={onRowClick}
          />
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-row items-center space-between px-2">
            <Avatar
              name={
                avatarName
                  ? avatarName
                  : `${userProfilePopover.firstName} ${userProfilePopover.lastName}`
              }
              size="sm"
              avatarColor={userProfilePopover.avatarColor}
            />
            <div className="flex flex-col items-center">
              <div className="text-sm">{userProfilePopover.role}</div>
              <div className="text-xs">
                Created:{" "}
                {DateTime.fromISO(userProfilePopover.createdAt, {
                  zone: timezone,
                }).toLocaleString(DateTime.DATE_MED)}
              </div>
              <div className="text-xs">
                Updated:{" "}
                {DateTime.fromISO(userProfilePopover.updatedAt, {
                  zone: timezone,
                }).toLocaleString(DateTime.DATE_MED)}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AdminUserDataTable;
