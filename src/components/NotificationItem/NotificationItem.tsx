import { Message, MessageNotif } from "iconsax-react";

interface NotificationItemProps {
  content: string;
  new: boolean;
  date: string;
  isFullContent?: boolean;
}

export default function NotificationItem(props: NotificationItemProps) {
  const messageDate = new Date(props.date);

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  const now = new Date();
  const milliseconds = now.getTime() - messageDate.getTime();
  const timePast =
    milliseconds / day >= 1
      ? `${Math.ceil(milliseconds / day)} days ago`
      : milliseconds / hour > 0
      ? `${Math.ceil(milliseconds / hour)} hours ago`
      : milliseconds / minute > 0
      ? `${Math.ceil(milliseconds / minute)} minutes ago`
      : "now";
  return (
    <div className="w-full border-b border-neutral-6 dark:border-neutral-8 py-2 flex flex-col">
      <div className="flex flex-row items-center">
        <div className="w-8 h-8">
          {props.new ? (
            <MessageNotif className=" size-5 lg:size-8 text-secondary-main mt-1" />
          ) : (
            <Message className=" size-5 lg:size-8 text-neutral-7 mt-1" />
          )}
        </div>
        <div
          className={`${
            !props.isFullContent && "truncate"
          } text-left ml-2 text-xs ${
            props.new
              ? " text-neutral-8 dark:text-neutral-3"
              : "text-neutral-6 dark:text-neutral-7"
          }`}
        >
          {props.content}
        </div>
      </div>
      <div
        className={`${
          props.new
            ? " text-neutral-8 dark:text-neutral-3"
            : "text-neutral-6 dark:text-neutral-7"
        } text-neutral-6 dark:text-neutral-7 w-fit ml-auto text-[10px]`}
      >
        {timePast}
      </div>
    </div>
  );
}
