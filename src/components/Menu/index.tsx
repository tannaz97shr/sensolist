"use client";

import {
  Cpu,
  Element3,
  Home2,
  LogoutCurve,
  Setting4,
  UserTick,
} from "iconsax-react";
import { signOut } from "next-auth/react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function Menu() {
  const pathname = usePathname();
  const { locale } = useParams<{ locale: string }>();
  const { t } = useTranslation();

  const router = useRouter();
  return (
    <div
      className=" rounded-t-2xl flex flex-row md:flex-col z-30
     bg-primary-tint-1 dark:bg-primary-Shade-2 md:ml-4
     bottom-0 w-full h-[62px] md:w-[64px] lg:w-[80px] md:h-full 
     md:bg-transparent dark:md:bg-transparent 
     fixed md:top-[7rem]
     px-9 pt-2 items-center justify-between md:justify-start md:gap-2"
    >
      <button
        onClick={() => {
          router.push(`/${locale}/userManager`);
        }}
        className={` flex flex-col items-center md:bg-black-opacity-50 order-1 md:order-5
        w-[74px] md:w-[64px] md:h-[64px]  lg:w-[80px] lg:h-[80px] rounded-lg md:justify-center menu-animation
        ${
          pathname.includes("/userManager")
            ? "dark:md:bg-white-opacity-200"
            : "dark:md:bg-white-opacity-30"
        }`}
      >
        <UserTick
          className="md:text-neutral-7 md:size-6 dark:text-white"
          variant={pathname.includes("/userManager") ? "Bold" : undefined}
          color={pathname.includes("/userManager") ? "#E67F3A" : undefined}
        />
        <div
          className={`text-xs capitalize  text-secondary-main md:text-[10px] lg:text-xs 
            lg:max-w-[80px] lg:truncate
             md:text-neutral-7 dark:text-white ${
               pathname.includes("/userManager")
                 ? "flex md:text-secondary-main dark:md:text-secondary-main"
                 : "hidden md:flex"
             }`}
        >
          {t("userManager", "user manager")}
        </div>
      </button>
      <button
        onClick={() => {
          router.push(`/${locale}/myThings`);
        }}
        className={` flex flex-col items-center md:bg-black-opacity-50 order-2
        w-[74px] md:w-[64px] md:h-[64px]  lg:w-[80px] lg:h-[80px] rounded-lg md:justify-center menu-animation
        ${
          pathname.includes("/myThings")
            ? "dark:md:bg-white-opacity-200"
            : "dark:md:bg-white-opacity-30"
        }`}
      >
        <Cpu
          className="md:text-neutral-7 md:size-6 dark:text-white"
          variant={pathname.includes("/myThings") ? "Bold" : undefined}
          color={pathname.includes("/myThings") ? "#E67F3A" : undefined}
        />
        <div
          className={`text-xs capitalize text-secondary-main md:text-[10px] lg:text-xs
            lg:max-w-[80px] lg:truncate
             md:text-neutral-7 dark:text-white ${
               pathname.includes("/myThings")
                 ? "flex md:text-secondary-main dark:md:text-secondary-main"
                 : "hidden md:flex"
             }`}
        >
          {t("my-things")}
        </div>
      </button>
      <button
        onClick={() => {
          router.push(`/${locale}`);
        }}
        className={` flex flex-col items-center md:bg-black-opacity-50 order-3 md:order-1
        w-[74px] md:w-[64px] md:h-[64px]  lg:w-[80px] lg:h-[80px] rounded-lg md:justify-center menu-animation
        ${
          pathname === `/${locale === "en" ? "" : locale}`
            ? "dark:md:bg-white-opacity-200"
            : "dark:md:bg-white-opacity-30"
        }`}
      >
        <Home2
          className="md:text-neutral-7 md:size-6 dark:text-white"
          variant={
            pathname === `/${locale === "en" ? "" : locale}`
              ? "Bold"
              : undefined
          }
          color={
            pathname === `/${locale === "en" ? "" : locale}`
              ? "#E67F3A"
              : undefined
          }
        />
        <div
          className={`text-xs capitalize text-secondary-main md:text-[10px] lg:text-xs
            lg:max-w-[80px] lg:truncate
             md:text-neutral-7 dark:text-white ${
               pathname === `/${locale === "en" ? "" : locale}`
                 ? "flex md:text-secondary-main dark:md:text-secondary-main"
                 : "hidden md:flex"
             }`}
        >
          {t("home")}
        </div>
      </button>
      <button
        onClick={() => {
          router.push(`/${locale}/dashboard`);
        }}
        className={` flex flex-col items-center md:bg-black-opacity-50 order-4 md:order-3
        w-[74px] md:w-[64px] md:h-[64px]  lg:w-[80px] lg:h-[80px] rounded-lg md:justify-center menu-animation
        ${
          pathname.includes("/dashboard")
            ? "dark:md:bg-white-opacity-200"
            : "dark:md:bg-white-opacity-30"
        }`}
      >
        <Element3
          className="md:text-neutral-7 md:size-6 dark:text-white"
          variant={pathname.includes("/dashboard") ? "Bold" : undefined}
          color={pathname.includes("/dashboard") ? "#E67F3A" : undefined}
        />
        <div
          className={`text-xs capitalize text-secondary-main md:text-[10px] lg:text-xs
            lg:max-w-[80px]
             md:text-neutral-7 dark:text-white ${
               pathname.includes("/dashboard")
                 ? "flex md:text-secondary-main dark:md:text-secondary-main"
                 : "hidden md:flex"
             }`}
        >
          {t("dashboard")}
        </div>
      </button>
      <button
        onClick={() => {
          router.push(`/${locale}/applets`);
        }}
        className={` flex flex-col items-center md:bg-black-opacity-50 order-5 md:order-3
        w-[74px] md:w-[64px] md:h-[64px]  lg:w-[80px] lg:h-[80px] rounded-lg md:justify-center menu-animation
        ${
          pathname.includes("/applets")
            ? "dark:md:bg-white-opacity-200"
            : "dark:md:bg-white-opacity-30"
        }`}
      >
        <Setting4
          className="md:text-neutral-7 md:size-6 dark:text-white"
          variant={pathname.includes("/applets") ? "Bold" : undefined}
          color={pathname.includes("/applets") ? "#E67F3A" : undefined}
        />
        <div
          className={`text-xs capitalize text-secondary-main md:text-[10px] lg:text-xs
            lg:max-w-[80px] lg:truncate
            md:text-neutral-7 dark:text-white ${
              pathname.includes("/applets")
                ? "flex md:text-secondary-main dark:md:text-secondary-main"
                : " hidden md:flex"
            }`}
        >
          {t("applets")}
        </div>
      </button>
      <button
        onClick={() => {
          signOut({ redirect: false });
        }}
        className="hidden md:flex flex-col items-center order-6"
      >
        <LogoutCurve size={40} color="#DF2040" />
        <div className=" capitalize dark:text-neutral-4 text-neutral-7 whitespace-nowrap md:text-[10px] lg:text-xs">
          log out
        </div>
      </button>
    </div>
  );
}
