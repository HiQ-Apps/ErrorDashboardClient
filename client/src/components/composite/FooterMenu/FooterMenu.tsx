import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DateTime } from "luxon";
import {
  GearIcon,
  EnvelopeClosedIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import { FaBell } from "react-icons/fa";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "components/ui/menubar";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer";

import { selectTimeZone } from "features/timezoneSlice";
import {
  useGetNotificationsByUserIdQuery,
  useBatchMarkNotificationAsReadMutation,
  useMarkNotificationAsReadMutation,
} from "features/notificationApiSlice";
import { selectUser, selectUserProfile } from "features/authSlice";
import {
  NotificationMagnifyingGlass,
  Avatar,
  BaseButton,
  NewIcon,
} from "components/base";
import { useWebSocket } from "hooks/useWebSocket";
import type { NotificationStreamData } from "types/Notification";
import { ScrollArea } from "components/ui/scroll-area";
import { useToast } from "components/ui/use-toast";

const FooterMenu = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const timezone = useSelector(selectTimeZone);
  const userProfile = useSelector(selectUserProfile);
  const { toast } = useToast();
  const wsUrl = `/api/ws/notifications/${user?.id}`;
  const { messages, resetMessages } =
    useWebSocket<NotificationStreamData>(wsUrl);
  const [unreadNotificationCount, setUnreadNotificationCount] =
    useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationStreamData[]>(
    []
  );
  const [newNotificationIds, setNewNotificationIds] = useState<Set<string>>(
    new Set()
  );
  const limit = 10;
  const prevMessagesRef = useRef<NotificationStreamData[]>([]);

  if (!user) {
    return null;
  }

  const {
    data: notificationsData,
    refetch: refetchNotificationsData,
    isLoading: notificationsDataIsLoading,
  } = useGetNotificationsByUserIdQuery({ offset, limit }, { skip: !user });

  const [
    batchMarkNotificationAsRead,
    {
      isSuccess: batchMarkNotificationsIsSuccess,
      isLoading: batchMarkNotificationsIsLoading,
    },
  ] = useBatchMarkNotificationAsReadMutation();

  const [
    markNotificationAsRead,
    { isLoading: markNotificationAsReadIsLoading },
  ] = useMarkNotificationAsReadMutation();

  // Update notifications when new messages are received
  useEffect(() => {
    if (messages.length > 0) {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [
          ...messages,
          ...prevNotifications.filter(
            (prev) => !messages.some((msg) => msg.id === prev.id)
          ),
        ];
        prevMessagesRef.current = messages;
        setUnreadNotificationCount((prev) => prev + messages.length);
        setNewNotificationIds((prevIds) => {
          const newIds = new Set(prevIds);
          messages.forEach((msg) => newIds.add(msg.id));
          return newIds;
        });
        resetMessages();

        return updatedNotifications.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
    }
  }, [messages, resetMessages]);

  // Update notifications when new notifications are fetched
  useEffect(() => {
    if (notificationsData) {
      setNotifications((prevNotifications) => {
        const updatedNotifications = [
          ...notificationsData.notifications.filter(
            (data) => !prevNotifications.some((notif) => notif.id === data.id)
          ),
          ...prevNotifications,
        ];
        setUnreadNotificationCount(notificationsData.unreadCount);
        return updatedNotifications;
      });
    }
  }, [notificationsData]);

  const handleNavigateProfile = () => {
    navigate(`/user/${user?.id}/profile`);
  };

  const handleIsRead = async (notificationId: string) => {
    try {
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== notificationId)
      );
      setUnreadNotificationCount((prev) => prev - 1);
      await markNotificationAsRead(notificationId).unwrap();

      toast({
        title: "Notification marked as read",
      });
    } catch (error) {
      toast({
        title: "Error marking notification as read",
        description: JSON.stringify(error),
      });
    }
  };

  const handleBatchMarkAsRead = () => {
    let notificationIds: string[] = [];
    if (offset === 0) {
      notificationIds = notifications.map((notification) => notification.id);
    } else {
      notificationIds =
        notificationsData?.notifications.map(
          (notification) => notification.id
        ) || [];
    }

    try {
      batchMarkNotificationAsRead(notificationIds).unwrap();
      if (batchMarkNotificationsIsSuccess) {
        toast({
          title: "Notifications marked as read",
        });
      }
      setNotifications([]);
      setUnreadNotificationCount(0);
      setNewNotificationIds(new Set());
    } catch (error) {
      toast({
        title: "Error marking notifications as read",
        description: JSON.stringify(error),
      });
    }
  };

  const nextPage = () => {
    if (offset + limit) {
      setOffset(offset + limit);
      refetchNotificationsData();
      setNotifications([]);
    }
  };

  const prevPage = () => {
    if (offset - limit >= 0) {
      setOffset(offset - limit);
      refetchNotificationsData();
      setNotifications([]);
    }
  };

  return (
    <Drawer>
      <Menubar className="h-10 border-none overflow-none">
        <MenubarMenu>
          <MenubarTrigger className="p-0 w-12 h-12 flex justify-center items-center">
            <div className="cursor-pointer">
              {notificationsData && (
                <NotificationMagnifyingGlass
                  hasAlert={unreadNotificationCount > 0}
                />
              )}
            </div>
          </MenubarTrigger>
          <MenubarContent>
            <DrawerTrigger className="w-full">
              <MenubarItem>
                {unreadNotificationCount > 0 ? (
                  <div className="flex flex-row w-full relative text-red-500">
                    <FaBell className="w-5 h-5 mr-2" />
                    Notifications
                  </div>
                ) : (
                  <div className="flex flex-row w-full">
                    <FaBell className="w-5 h-5 mr-2" />
                    Notifications
                  </div>
                )}
              </MenubarItem>
            </DrawerTrigger>
            <MenubarItem>
              <EnvelopeClosedIcon className="w-5 h-5 mr-2" />
              Messages
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger>
            <div className="cursor-pointer flex align-center items-center justify-center">
              <Avatar
                name={
                  user?.username ||
                  userProfile?.firstName + " " + userProfile?.lastName
                }
                size="sm"
                avatarColor={userProfile?.avatarColor}
              />
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
      <DrawerContent className="h-120">
        <DrawerHeader>
          <DrawerTitle className="dark:text-slate-100 flex flex-row justify-between items-center">
            Notifications
            <div className="flex text-slate-800 dark:text-slate-200 text-sm">
              {unreadNotificationCount + " Unread Notifications"}
            </div>
          </DrawerTitle>
          <DrawerDescription>
            View and check off important notifications and alerts.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-80">
          {offset === 0
            ? notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={
                    "flex flex-col p-4 space-y-1 text-xs text-wrap border-b hover:bg-gray-200 dark:text-slate-100 dark:bg-slate-1000 dark:hover:bg-slate-700 transition-opacity duration-500"
                  }
                >
                  <div className="flex flex-row justify-between">
                    <div className="text-sm">{notification.title}</div>
                    {newNotificationIds.has(notification.id) && (
                      <NewIcon size="xs" />
                    )}
                  </div>
                  <div className="flex flex-row justify-between w-full">
                    <div>{notification.text}</div>
                    <BaseButton
                      content="Mark as Read"
                      variant="accent"
                      size="sm"
                      onClick={() => handleIsRead(notification.id)}
                      overrideStyles="px-3"
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>From: {notification.source}</div>
                    <div>
                      Created At:
                      {" " +
                        DateTime.fromISO(notification.createdAt)
                          .setZone(timezone)
                          .toFormat("yyyy-MM-dd HH:mm:ss")}
                    </div>
                  </div>
                </div>
              ))
            : notificationsData &&
              notificationsData.notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex flex-col p-4 space-y-1 text-xs text-wrap border-b hover:bg-gray-200 dark:text-slate-100 dark:bg-slate-1000 dark:hover:bg-slate-700"
                >
                  <div className="text-sm">{notification.title}</div>
                  <div className="flex flex-row justify-between w-full">
                    <div>{notification.text}</div>
                    <BaseButton
                      content={
                        markNotificationAsReadIsLoading ? (
                          <UpdateIcon />
                        ) : (
                          "Mark as Read"
                        )
                      }
                      variant="accent"
                      size="sm"
                      onClick={() => handleIsRead(notification.id)}
                      overrideStyles="px-3 text-sm"
                    />
                  </div>
                  <div className="flex flex-row justify-between">
                    <div>From: {notification.source}</div>
                    <div>
                      Created At:
                      {" " +
                        DateTime.fromISO(notification.createdAt)
                          .setZone(timezone)
                          .toFormat("yyyy-MM-dd HH:mm:ss")}
                    </div>
                  </div>
                </div>
              ))}
        </ScrollArea>
        <div className="flex flex-row justify-between items-center">
          {notificationsData && (
            <div className="flex flex-row space-x-4 mt-4 mx-2 justify-start px-4">
              <BaseButton
                content={notificationsDataIsLoading ? <UpdateIcon /> : "Prev"}
                variant="default"
                size="sm"
                onClick={prevPage}
                disabled={offset === 0}
                overrideStyles="px-3"
              />
              <div className="flex flex-row text-2xs text-slate-700 dark:text-slate-200 items-center">
                Page {(offset % limit) + 1} of{" "}
                {Math.ceil(notificationsData.unreadCount / limit)}
              </div>
              <BaseButton
                content={notificationsDataIsLoading ? <UpdateIcon /> : "Next"}
                variant="default"
                size="sm"
                onClick={nextPage}
                disabled={offset + limit >= notificationsData.unreadCount}
                overrideStyles="px-3"
              />
            </div>
          )}
          <BaseButton
            content={
              batchMarkNotificationsIsLoading ? (
                <UpdateIcon />
              ) : (
                "Mark All as Read"
              )
            }
            variant="accent"
            size="sm"
            onClick={handleBatchMarkAsRead}
            overrideStyles="px-3 mt-2 mx-2"
            disabled={
              notifications.length === 0 || unreadNotificationCount === 0
            }
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FooterMenu;
