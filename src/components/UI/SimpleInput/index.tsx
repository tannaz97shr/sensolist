"use client";

import { UseFormRegister } from "react-hook-form";
import FormError from "../FormError";

interface SimpleInputProps {
  // value: string;
  onChange?: (val: string) => void;
  className?: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  required?: boolean;
  name: string;
  error?: string;
  type?: string;
}

export default function SimpleInput({
  // value,
  onChange,
  className,
  placeholder,
  register,
  name,
  required,
  error,
  type,
}: SimpleInputProps) {
  // const [inputValue, setInputValue] = useState(value);
  // useEffect(() => {
  //   setInputValue(value);
  // }, [value]);
  return (
    <div className={`relative ${className}`}>
      <input
        {...register(name, {
          // value: inputValue === "" ? undefined : inputValue,
          required: required,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(e.target.value);
          },
        })}
        placeholder={placeholder}
        type={type}
        // value={value === "" ? undefined : value}
        className={` border border-neutral-6 rounded-lg py-3 px-4 text-sm backdrop-blur-[30px] bg-transparent w-full
    placeholder:text-neutral-6 placeholder:text-sm focus-visible:outline-none dark:text-neutral-2`}
      />
      {error && <FormError error={error} />}
    </div>
  );
}
