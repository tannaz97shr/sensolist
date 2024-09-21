"use client";

import { toggleMenu } from "@/lib/features/profile/profileSlice";
import { Notification } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import NotificationItem from "../NotificationItem/NotificationItem";
import DropDownModal from "../UI/DropDownModal";

export default function Notifications() {
  const [newNotification, setNewNotification] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const fakeNotifications: {
    content: string;
    date: string;
    new: boolean;
  }[] = [
    {
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "Wed Jun 26 2024 19:56:01 GMT+0300 (GMT+03:00)",
      new: true,
    },
    {
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "Wed Jun 26 2024 19:56:01 GMT+0300 (GMT+03:00)",
      new: false,
    },
    {
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      date: "Wed Jun 26 2024 19:56:01 GMT+0300 (GMT+03:00)",
      new: false,
    },
  ];
  return (
    <div className="relative">
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="relative flex w-[32px] h-[32px] mx-4 rounded-full order-2 md:order-none
     dark:bg-white-opacity-100 shadow bg-primary-tint-3 md:bg-neutral-3"
      >
        <Notification className="m-auto size-5 dark:text-white md:text-primary-tint-3" />
        {newNotification && (
          <div
            className="absolute w-[8px] h-[8px] lg:w-2.5 lg:h-2.5 top-0 right-1
      bg-secondary-main rounded-full"
          ></div>
        )}
      </button>
      <>
        <DropDownModal
          visible={isOpen}
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <div
          className={` overflow-hidden absolute
          w-[80vw] max-w-[200px] h-[240px] right-[-2rem] mx-auto
      border border-primary-tint-3 rounded-2xl rounded-tr-none
       top-11 lg:top-16 px-2 py-4 
       bg-white dark:bg-primary-Shade-1  transition-all duration-500
        ${isOpen ? "visible opacity-100 z-40 " : " invisible h-0 opacity-0"}`}
        >
          <div
            className=" w-full border-b text-black border-neutral-6 text-sm text-start pb-2
           dark:text-neutral-2 dark:border-neutral-3 flex items-center"
          >
            Notifications
            <button className=" text-secondary-main font-medium ml-auto text-[10px] capitalize">
              mark all as read
            </button>
          </div>
          {fakeNotifications.map((notification, i) => (
            <NotificationItem
              key={i}
              content={notification.content}
              new={notification.new}
              date={notification.date}
            />
          ))}

          <div
            className="absolute h-14 w-full bg-white dark:bg-primary-Shade-1 left-0 bottom-0
          flex items-center gap-2 px-4"
          >
            <button
              onClick={() => {
                router.push("/profile/notifications");
                setIsOpen(false);
                dispatch(toggleMenu({ menuOpen: false }));
              }}
              className="w-full bg-secondary-main rounded-lg text-white text-sm py-1.5 border-2 border-secondary-main mx-auto"
            >
              view all
            </button>
            {/* <button className="w-1/2 rounded-lg border-2 border-secondary-main text-secondary-main py-1.5 whitespace-nowrap">
                mark all as read
              </button> */}
          </div>
        </div>
      </>
      {/* )} */}
    </div>
  );
}
