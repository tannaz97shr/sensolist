"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";

import Spinner from "../UI/Spinner";

interface ValueCardProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  simple?: boolean;
}

export default function ValueCard({
  senderId,
  name,
  characteristics,
  simple,
}: ValueCardProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(senderId, characteristics, 1, 1);
          setWidgetData(
            response.charactersData?.length ? response.charactersData[0] : null
          );
          setLoading(false);
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(60);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds, characteristics]);

  return (
    <div
      className={` p-6 flex flex-col ${
        simple
          ? "min-h-[calc(100%-28px)] mt-6"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!widgetData ? (
        loading ? (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        ) : (
          <div className="flex h-full flex-1">
            <span className="m-auto">No Data available!</span>
          </div>
        )
      ) : (
        <div className="flex flex-col flex-1 items-center justify-center">
          <span className="mb-2 text-xl text-neutral-7 dark:text-neutral-3 font-bold capitalize">
            {widgetData.character}
          </span>
          <span className=" text-neutral-6 text-lg">
            {widgetData.data[0]?.payload} {widgetData.unit}
          </span>
        </div>
      )}
      {!simple && (
        <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
          Last Update {seconds} seconds ago
        </div>
      )}
    </div>
  );
}
