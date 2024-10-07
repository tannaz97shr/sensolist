"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";

import Spinner from "../UI/Spinner";

interface ValueCardProps {
  senderId?: string;
  name: string;
  characteristics: string[];
}

export default function ValueCard({
  senderId,
  name,
  characteristics,
}: ValueCardProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(10);
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds, characteristics]);

  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)] flex">
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <div className="flec flex-col mt-auto">
          <div className=" capitalize font-bold mx-auto text-xl text-neutral-7 dark:text-neutral-3 w-fit">
            {widgetData.character}
          </div>
          <div className=" mt-6 text-xl w-fit mx-auto dark:text-white">
            {widgetData.data.length && widgetData.data[0].payload}{" "}
            {widgetData.unit}
          </div>
        </div>
      )}
    </div>
  );
}
