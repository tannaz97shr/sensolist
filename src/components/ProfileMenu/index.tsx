"use client";

import { IProfileMenuItem } from "@/types/general";
import {
  ArrowRight2,
  Edit2,
  Key,
  LogoutCurve,
  Notification,
} from "iconsax-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

interface ProfileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfileMenu({ isOpen, onClose }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  setTimeout(() => {
    setOpen(isOpen ? true : false);
  }, 100);

  const pathname = usePathname();
  const router = useRouter();
  const menuItems: IProfileMenuItem[] = [
    {
      name: "edit",
      title: "edit profile",
      link: "",
      icon: (
        <Edit2 className=" text-neutral-7 dark:text-neutral-4  dark:md:text-white" />
      ),
    },
    {
      name: "changePassword",
      title: "change password",
      link: "/changePassword",
      icon: (
        <Key className=" text-neutral-7 dark:text-neutral-4  dark:md:text-white" />
      ),
    },
    {
      name: "notifications",
      title: "notification center",
      link: "/notifications",
      icon: (
        <Notification className=" text-neutral-7 dark:text-neutral-4  dark:md:text-white" />
      ),
    },
  ];
  return (
    <div
      className={` p-6 flex flex-col flex-1 absolute bg-neutral-2 md:min-w-[230px]
        dark:bg-primary-Shade-1 md:bg-black-opacity-50 md:dark:bg-white-opacity-50
         md:ml-6 h-[calc(100vh-134px)] 
    z-20 transition-transform ease-linear duration-500 ${
      !open
        ? "-translate-x-full invisible w-0 md:translate-x-0 md:visible"
        : "w-full"
    } md:static md:max-w-[232px] lg:[256px] md:rounded-l-2xl md:h-full`}
    >
      <div className="hidden md:flex text-xl lg:text-[1.37rem] dark:text-white">
        Profile
      </div>
      <div className="flex items-center md:hidden dark:text-white">
        <div className="w-[56px] h-[56px] relative rounded-full overflow-hidden">
          <Image alt="profile" src="/assets/profile.jpeg" fill />
        </div>
        <div className="ml-4 text-lg font-medium">Yas Izadi</div>
      </div>
      <div className="mt-6 md:mt-10">
        {menuItems.map((item, i) => (
          <button
            onClick={() => {
              router.push(`/profile${item.link}`);
              onClose();
            }}
            key={item.name}
            className={`flex items-center w-full md:p-2 md:rounded-lg dark:text-neutral-4 text-sm ${
              i !== 0 && "mt-6 md:mt-4"
            }
               ${
                 pathname === `/profile${item.link}`
                   ? "md:bg-grey md:text-neutral-8 dark:md:bg-primary-tint-1 dark:md:text-white"
                   : "md:text-neutral-7"
               }`}
          >
            {item.icon}
            <span className="ml-2 capitalize">{item.title}</span>
            <ArrowRight2
              className={` ml-auto md:hidden size-4 ${
                pathname === `/profile${item.link}`
                  ? " md:text-neutral-8"
                  : "md:text-neutral-7"
              }`}
            />
          </button>
        ))}
      </div>
      <button
        onClick={() => {
          signOut({ redirect: false });
        }}
        className="mt-auto flex items-center md:hidden"
      >
        <LogoutCurve className=" text-error mr-2" />
        <span className=" text-neutral-7 dark:text-neutral-4 ">Log Out</span>
      </button>
    </div>
  );
}
