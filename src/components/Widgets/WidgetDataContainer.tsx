import Spinner from "../UI/Spinner";

interface WidgetDataContainerProps {
  simple?: boolean;
  haveData: boolean;
  loading: boolean;
  children: React.ReactNode;
  seconds: number;
}

export default function WidgetDataContainer({
  simple,
  haveData,
  loading,
  children,
  seconds,
}: WidgetDataContainerProps) {
  return (
    <div
      className={`flex flex-col ${
        simple
          ? "min-h-[calc(100%-32px)] mt-8"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!haveData ? (
        loading ? (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        ) : (
          <div className="flex h-full flex-1">
            <span className="m-auto dark:text-neutral-5">
              No Data available!
            </span>
          </div>
        )
      ) : (
        children
      )}
      {!simple && (
        <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
          Last Update {seconds} seconds ago
        </div>
      )}
    </div>
  );
}
