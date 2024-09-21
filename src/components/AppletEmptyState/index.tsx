import { AddSquare } from "iconsax-react";
import Button from "../UI/Button";
import { SimplificationIcon } from "../UI/Icons";

export default function AppletEmptyState({
  setCreateOpen,
}: {
  setCreateOpen: () => void;
}) {
  return (
    <div className=" h-full mt-[200px] flex flex-col items-center">
      <SimplificationIcon className="w-[56px] h-[47px] md:w-[80px] md:h-[67px] lg:w-[112px] lg:h-[94px]" />
      <div
        className="w-[180px] text-neutral-5 text-xs text-center mt-4 
      md:text-base md:w-[330px] md:mt-6 lg:text-lg lg:w-[370px] dark:text-neutral-6"
      >
        You haven’t created any applet yet!
      </div>
      <Button
        onClick={setCreateOpen}
        className="w-[200px] mt-4 md:w-[240px] md:mt-6"
      >
        <AddSquare className="mr-2" />
        Create Applet
      </Button>
    </div>
  );
}
