import { ArrowDown2 } from "iconsax-react";

interface FormCharacteristicsDropdown {
  title: string;
  disable?: boolean;
}

export default function FormCharacteristicsDropdown({
  title,
  disable,
}: FormCharacteristicsDropdown) {
  return (
    <div
      className={`border  rounded-lg flex flex-col py-2 px-4 w-full ${
        disable ? " border-neutral-3 text-neutral-3" : "border-neutral-4"
      }`}
    >
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
        }}
        disabled={disable}
        className="w-full flex justify-between"
      >
        <span>{title}</span>
        <ArrowDown2 className=" size-4 my-auto" />
      </button>
    </div>
  );
}
