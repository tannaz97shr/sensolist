"use client";

import { Moon, Sun1 } from "iconsax-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="w-[112px] h-[40px]"></div>;
  }
  return (
    <div
      className="flex w-[32px] md:w-[80px] h-[32px] mr-4 md:mr-0 order-1 md:order-none
      shadow rounded-full relative gap-2 justify-around items-center
     dark:bg-white-opacity-100 bg-white-opacity-100 md:bg-neutral-3 py-0.5 md:px-3"
    >
      <button
        className={`z-10 ${resolvedTheme === "dark" ? "hidden md:flex" : ""}`}
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
      >
        <Sun1 className=" size-5" />
      </button>
      <button
        className={`z-10 ${resolvedTheme === "light" ? "hidden md:flex" : ""}`}
        onClick={() => {
          setTheme(resolvedTheme === "light" ? "dark" : "light");
        }}
      >
        <Moon
          className={`${resolvedTheme === "light" && " text-black"} size-5`}
        />
      </button>
      <div
        className={`absolute dark:bg-white-opacity-200 bg-primary-tint-3 hidden md:flex
        rounded-full w-[40px] h-[26px] transition-all
      left-0 ${resolvedTheme === "dark" ? "ml-9" : " ml-1"}`}
      ></div>
    </div>
  );
}
