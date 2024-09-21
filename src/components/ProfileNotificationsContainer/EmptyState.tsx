import { MessageSearch } from "iconsax-react";

export default function EmptyState() {
  return (
    <div className="m-auto flex flex-col items-center">
      <MessageSearch className="size-12 text-neutral-6" />
      <div className=" text-neutral-7 dark:text-neutral-4 mt-2">
        No notifications
      </div>
      <div className=" text-sm text-neutral-6 mt-2">
        We’ll notify you when something arrives.
      </div>
    </div>
  );
}
