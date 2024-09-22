"use client";

import { ISelectOption } from "@/types/general";
import { Checkbox } from "flowbite-react";
import { ArrowDown2 } from "iconsax-react";
import { Dispatch, SetStateAction, useState } from "react";
import DropDownModal from "../DropDownModal";
import FormError from "../FormError";

interface MultiSelectProps {
  options: ISelectOption[];
  className?: string;
  selectedValues: ISelectOption[];
  setSelectedValues: Dispatch<SetStateAction<ISelectOption[]>>;
  label: string;
  error?: string;
}

export default function MultiSelect({
  options,
  className,
  selectedValues,
  setSelectedValues,
  label,
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className={`relative ${className}`}>
      <span className=" text-sm mb-4 dark:text-white">{label}</span>
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          setIsOpen(true);
        }}
        type="button"
        className="relative flex items-center border border-neutral-6 rounded-lg 
        w-full py-2 pl-4 pr-10 min-h-[45px] mt-2 flex-wrap"
      >
        {selectedValues.map((val, i) => (
          <div
            key={val.value}
            className=" whitespace-nowrap dark:text-neutral-2"
          >
            {i !== selectedValues.length && i !== 0 && (
              <span className="mx-2">-</span>
            )}
            {val.title}{" "}
          </div>
        ))}
        <ArrowDown2
          className={` absolute size-4 right-2 transition-all duration-500 dark:text-neutral-2 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>

      {error && <FormError error={error} />}
      {isOpen && (
        <>
          <div className=" absolute w-full bg-neutral-2 dark:bg-neutral-8 z-50 top-20 rounded-xl border border-neutral-4 dark:text-white">
            {options.map((option, i) => {
              return (
                <button
                  type="button"
                  onClick={(event: React.MouseEvent<HTMLElement>) => {
                    const filtered = selectedValues.filter(
                      (val) => val.value === option.value
                    );
                    setSelectedValues((prev) =>
                      filtered.length
                        ? prev.filter((item) => item.value !== option.value)
                        : [...prev, option]
                    );
                  }}
                  key={option.value}
                  className={`${
                    i !== options.length - 1 && "border-b"
                  }  border-b-neutral-4 py-2 w-full flex gap-4 items-center px-4`}
                >
                  <Checkbox
                    checked={
                      !!selectedValues.filter(
                        (val) => val.value === option.value
                      ).length
                    }
                  />
                  {option.title}
                </button>
              );
            })}
          </div>
          <DropDownModal
            visible={isOpen}
            onClick={() => {
              setIsOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
