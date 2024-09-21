"use client";

import { ISelectOption } from "@/types/general";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import DropDownModal from "../DropDownModal";

interface SelectProps {
  options: ISelectOption[];
  className?: string;
  selectedValue: ISelectOption;
  setSelectedValue: (option: ISelectOption) => void;
  register: UseFormRegister<any>;
  name: string;
  label: string;
}

export default function SelectInput({
  options,
  className,
  selectedValue,
  setSelectedValue,
  register,
  name,
  label,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className={`relative ${className}`}>
      <input
        required
        {...register(name, { required: true })}
        className="hidden"
        value={selectedValue?.value}
      />
      <span className=" text-sm mb-2">{label}</span>
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          setIsOpen(true);
        }}
        className="flex mt-2 items-center border border-neutral-6 rounded-lg w-full py-3 px-4 justify-between"
      >
        <span className=" whitespace-nowrap">{selectedValue?.title}</span>
        <ArrowDown2
          className={`ml-2 size-4 transition-all duration-500 ${
            isOpen && "rotate-180"
          }`}
        />
      </button>
      {isOpen && (
        <>
          <div className=" absolute w-full bg-neutral-2 dark:bg-neutral-8 z-50 top-20 rounded-xl border border-neutral-4 dark:text-white">
            {options.map((option, i) => (
              <button
                onClick={() => {
                  setSelectedValue(option);
                  setIsOpen(false);
                }}
                key={option.value}
                className={`${
                  i !== options.length - 1 && "border-b"
                }  border-b-neutral-4 p-2 w-full`}
              >
                {option.title}
              </button>
            ))}
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
