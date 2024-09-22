import { Add, ArrowDown2, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import Button from "../UI/Button";
import SimpleInput from "../UI/SimpleInput";

interface FormCharacteristicsDropdown {
  title: string;
  disable?: boolean;
  register: UseFormRegister<any>;
}

export default function FormCharacteristicsDropdown({
  title,
  disable,
  register,
}: FormCharacteristicsDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [indexRows, setIndexRows] = useState<number[]>([1]);
  useEffect(() => {
    if (disable) setIsOpen(false);
  }, [disable]);
  const columnsArray: { title: string; value: string; type?: string }[] = [
    {
      title: "Start time",
      value: "startTime",
      type: "time",
    },
    {
      title: "End time",
      value: "endTime",
      type: "time",
    },
    {
      title: "Value",
      value: "value",
      type: "number",
    },
    {
      title: "Coefficient of Variation(CV)",
      value: "coefficient",
    },
  ];
  return (
    <div
      className={`border  rounded-lg flex flex-col py-2 px-4 w-full ${
        disable ? " border-neutral-3 text-neutral-3" : "border-neutral-4"
      }`}
    >
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          if (!disable) setIsOpen((prev) => !prev);
        }}
        disabled={disable}
        className="w-full flex justify-between"
      >
        <span>{title}</span>
        <ArrowDown2 className=" size-4 my-auto" />
      </button>
      {isOpen && (
        <div className=" flex flex-col">
          {/* headers */}
          <div className="flex w-full gap-4 mt-6">
            {columnsArray.map((col) => (
              <div
                key={col.value}
                className="flex-1 text-sm text-neutral-7 after:content-['*']"
              >
                {col.title}
              </div>
            ))}
            <div className="w-6"></div>
          </div>
          {/* rows: inputs */}
          {indexRows.map((row) => (
            <div className="flex w-full gap-4 mt-6 items-center" key={row}>
              {columnsArray.map((col) => (
                <div key={col.value} className="flex-1">
                  <SimpleInput
                    name={`${col.value}${row}`}
                    register={register}
                    type={col.type}
                  />
                </div>
              ))}
              <button
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault();
                  setIndexRows((prev) => prev.filter((item) => item !== row));
                }}
                className="w-6"
              >
                <Trash />
              </button>
            </div>
          ))}
          <Button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              setIndexRows((prev) => [...prev, prev[prev.length - 1] + 1]);
            }}
            className="w-fit aspect-square h-3 mt-6"
            variant="secondary"
          >
            <Add />
          </Button>
        </div>
      )}
    </div>
  );
}
