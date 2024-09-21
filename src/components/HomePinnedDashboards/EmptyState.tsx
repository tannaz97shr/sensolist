import { ArrowRight } from "iconsax-react";
import Button from "../UI/Button";
import { SimplificationIcon } from "../UI/Icons";

export default function EmptyState() {
  return (
    <div className=" h-fit flex flex-col items-center m-auto">
      <SimplificationIcon className="w-[60px] h-[47px]" />
      <div
        className=" text-neutral-5 text-xs text-center
  md:text-base mt-4 lg:w-[370px] dark:text-neutral-6"
      >
        You haven’t pinned any dashboard yet!
      </div>
      <Button
        href={"/dashboard"}
        className="w-[200px] mt-2 md:w-[240px] md:mt-4 h-[40px]"
      >
        Go to Dashboards <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}
