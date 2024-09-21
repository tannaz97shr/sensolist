"use client";

import { INotification } from "@/types/general";
import { useEffect, useState } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import Tabs from "../UI/Tabs";
import EmptyState from "./EmptyState";

export default function ProfileNotificationsContainer({
  notifications,
}: {
  notifications: INotification[];
}) {
  const [currentTabIndex, setCurrentTabIndex] = useState<number>(0);
  const [displayNotifications, setDisplayNotifications] =
    useState<INotification[]>(notifications);

  useEffect(() => {
    setDisplayNotifications(
      currentTabIndex === 0
        ? notifications
        : currentTabIndex === 1
        ? notifications.filter((notif) => notif.new)
        : notifications.filter((notif) => !notif.new)
    );
  }, [currentTabIndex, notifications]);
  return (
    <div className="flex flex-col h-full">
      <Tabs
        items={["all", "inbox", "sent"]}
        currentIndex={currentTabIndex}
        onTabChange={(i: number) => {
          setCurrentTabIndex(i);
        }}
      />
      {displayNotifications.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col">
          {displayNotifications.map((notif, i) => (
            <NotificationItem
              key={i}
              content={notif.content}
              new={notif.new}
              date={notif.date}
              isFullContent={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
