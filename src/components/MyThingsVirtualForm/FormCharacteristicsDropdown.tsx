import { ArrowDown2, Trash } from "iconsax-react";
import { useEffect, useState } from "react";

interface FormCharacteristicsDropdown {
  title: string;
  disable?: boolean;
}

export default function FormCharacteristicsDropdown({
  title,
  disable,
}: FormCharacteristicsDropdown) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [indexRows, setIndexRows] = useState<number[]>([1]);
  useEffect(() => {
    if (disable) setIsOpen(false);
  }, [disable]);
  const columnsArray: { title: string; value: string }[] = [
    {
      title: "Start time",
      value: "startTime",
    },
    {
      title: "End time",
      value: "endTime",
    },
    {
      title: "Value",
      value: "value",
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
                className="flex-1 text-sm text-neutral-7 whitespace-nowrap after:content-['*']"
              >
                {col.title}
              </div>
            ))}
            <div className="w-6"></div>
          </div>
          {/* rows: inputs */}
          {indexRows.map((row) => (
            <div className="flex w-full gap-4 mt-6 items-center" key={row}>
              <div className="w-6">
                <Trash />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
