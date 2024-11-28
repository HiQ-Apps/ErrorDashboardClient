import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GearIcon,
  BellIcon,
  EnvelopeOpenIcon,
  EnvelopeClosedIcon,
  ExclamationTriangleIcon,
} from "@radix-ui/react-icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "components/ui/menubar";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "components/ui/hover-card";

import { useGetNotificationsByUserIdQuery } from "features/notificationApiSlice";
import { selectUser, selectUserProfile } from "features/authSlice";
import { NotificationMagnifyingGlass, Avatar } from "components/base";
import { useWebSocket } from "hooks/useWebSocket";
import type { NotificationStreamData } from "types/Notification";

const FooterMenu = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const userProfile = useSelector(selectUserProfile);
  const wsUrl = `/api/ws/notification/${user?.id}`;
  const { messages, resetMessages } =
    useWebSocket<NotificationStreamData>(wsUrl);

  if (!user) {
    return null;
  }

  const { data: notificationsData } = useGetNotificationsByUserIdQuery(
    user.id,
    { skip: !user }
  );

  const [notifications, setNotifications] = useState<NotificationStreamData[]>(
    []
  );
  const prevMessagesRef = useRef<NotificationStreamData[]>([]);

  useEffect(() => {
    if (messages.length > 0) {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        ...messages,
      ]);
      prevMessagesRef.current = messages;
      resetMessages();
    }
  }, [messages, resetMessages]);

  useEffect(() => {
    if (notificationsData) {
      setNotifications((prev) => [...notificationsData, ...prev]);
    }
  }, [notificationsData]);

  const handleNavigateProfile = () => {
    navigate(`/user/${user?.id}/profile`);
  };

  return (
    <Menubar className="h-10 border-none overflow-none">
      <MenubarMenu>
        <MenubarTrigger className="p-0 w-12 h-12 flex justify-center items-center">
          <div className="cursor-pointer">
            <NotificationMagnifyingGlass />
          </div>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            {/* Make this alertish */}
            <HoverCard>
              <HoverCardTrigger asChild>
                <BellIcon className="w-5 h-5 mr-2" />
                Notifications
              </HoverCardTrigger>
              <HoverCardContent>
                {notifications.map((notification) => (
                  <div key={notification.id} className="flex flex-col text-sm">
                    {notification.title}
                    <div className="flex flex-col">
                      <div className="text-sm">{notification.text}</div>
                      <div className="text-xs">From: {notification.source}</div>
                      <div className="text-xs">{notification.createdAt}</div>
                    </div>
                  </div>
                ))}
              </HoverCardContent>
            </HoverCard>
          </MenubarItem>
          <MenubarItem>
            {/* Danger this up a bit when there is an Alert */}
            <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
            Alerts
          </MenubarItem>
          <MenubarItem>
            {/* TODO: Implement alerting on messages */}
            {/* <EnvelopeOpenIcon className="w-5 h-5 mr-2"/> */}
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
  );
};

export default FooterMenu;
