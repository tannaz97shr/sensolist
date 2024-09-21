"use client";
import { debounce } from "@mui/material";
import { SearchNormal } from "iconsax-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function SearchBar() {
  const params = useSearchParams();
  const router = useRouter();
  const [value, setValue] = useState(params.get("search") || "");

  const setSearchValue = useMemo(
    () =>
      debounce((value: string) => {
        const tmpParams = new URLSearchParams(params);
        if (!value) {
          tmpParams.delete("search");
        } else {
          tmpParams.set("search", value);
        }
        router.replace(`?${tmpParams.toString()}`);
      }, 500),
    [params, router],
  );

  useEffect(() => {
    if (value !== params.get("search")) setSearchValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, setSearchValue]);
  return (
    <div
      className="static md:bg-transparent mr-auto lg:ml-4
       w-full md:pb-0 left-0 top-[-16px] md:pt-0 rounded-b-xl px-0
    md:w-[300px]"
    >
      <div className="w-full relative lg:h-full">
        <input
          placeholder="search"
          className="w-full rounded-full bg-white-opacity-100 h-[40px] pl-10
         placeholder:text-sm placeholder:text-neutral-4 placeholder:capitalize
          focus-visible:outline-none dark:text-neutral-2
           border-2 md:border-neutral-3
           md:placeholder:text-neutral-7
            text-neutral-8
           dark:md:border-0 dark:md:placeholder:text-neutral-6"
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <SearchNormal
          className="absolute text-neutral-4 top-3 left-4 md:text-neutral-7 size-4
        dark:md:text-neutral-6"
        />
      </div>
    </div>
  );
}
