"use client";

import { ArrowDown2, Sort } from "iconsax-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DropDownModal from "../UI/DropDownModal";
// Name, Oldest, Newst
const sortValues = [
  {
    value: "Name",
    title: "Name",
  },
  {
    value: "Oldest",
    title: "Oldest",
  },
  {
    value: "Newst",
    title: "Newest",
  },
];
const defaultSortValue = "Newst";

export default function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("sort") ?? "");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    if (value === defaultSortValue || !value) {
      params.delete("sort");
    }
    if (params.get("sort") !== searchParams.get("sort")) {
      router.replace(pathname + "?" + params.toString());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="flex items-center relative">
      <span
        className="hidden lg:flex mr-2 
      text-neutral-7 dark:text-neutral-3 whitespace-nowrap"
      >
        Sort By:
      </span>
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className=" text-neutral-7 rounded-xl lg:rounded-full py-2 px-2 lg:px-4 lg:py-[11px] text-sm
      border-2 border-neutral-3 dark:border-none h-[36px] items-center
      dark:bg-white-opacity-100 dark:text-neutral-3 flex gap-2 lg:min-w-[120px]"
      >
        <Sort className=" text-black dark:text-white size-5" />
        <span className=" capitalize hidden lg:flex">{value}</span>
        <ArrowDown2
          className={`ml-auto size-4 hidden lg:flex transition-all duration-500 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>
      {/* {isOpen && ( */}
      <>
        <DropDownModal
          visible={isOpen}
          onClick={() => {
            setIsOpen(false);
          }}
        />
        <div
          className={` absolute shadow rounded-lg bg-neutral-2 dark:bg-primary 
        w-[130px] lg:w-[150px] overflow-hidden right-0 top-12 lg:top-12 flex flex-col
        transition-all duration-500
           ${isOpen ? "visible opacity-100 z-30" : " invisible h-0 opacity-0"}`}
        >
          {sortValues.map((val, i: number) => (
            <button
              onClick={() => {
                setValue(val.value);
                setIsOpen(false);
              }}
              key={val.value}
              className={`py-2 lg:py-2 capitalize text-sm text-center text-neutral-7 dark:text-neutral-3
                hover:bg-neutral-3 dark:hover:text-neutral-7
                 ${
                   i !== sortValues.length - 1 &&
                   "border-b border-neutral-4 dark:border-neutral-7"
                 }`}
            >
              {val.title}
            </button>
          ))}
        </div>
      </>
      {/* )} */}
    </div>
  );
}
