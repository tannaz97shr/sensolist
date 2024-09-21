"use client";

import FormError from "@/components/UI/FormError";
import { LoginInputs } from "@/types/general";
import { RefCallBack, UseFormRegister } from "react-hook-form";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface InputProps {
  register?: UseFormRegister<LoginInputs>;
  name?: keyof LoginInputs;
  label?: string;
  ref: RefCallBack;
  error?: string;
  className?: string;
  variant?: "simple";
  placeholder?: string;
}

export function CustomPhoneInput({
  label,
  register,
  name,
  ref,
  error,
  className,
  variant,
  placeholder,
  ...rest
}: InputProps) {
  return (
    <label className={`w-full relative flex flex-col ${className}`}>
      <span className="mb-1 text-sm  dark:text-white">{label}</span>
      <ReactPhoneInput
        disableSearchIcon
        enableSearch={true}
        containerClass="simple"
        placeholder={placeholder ? placeholder : ""}
        searchPlaceholder="Search for country"
        inputClass={`!h-[45px] !w-full mt-2 flex dark:text-neutral-2
           placeholder:text-xs placeholder:text-neutral-7 focus:ring-0 ${
             error && "border !border-error"
           } ${variant === "simple" && "simple  !border-neutral-6"}`}
        {...rest}
      />
      {error && <FormError error={error} />}
    </label>
  );
}
