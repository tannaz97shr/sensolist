"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";

import Image from "next/image";
import WidgetDataContainer from "./WidgetDataContainer";

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
    if (seconds === 60) {
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
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      <div className="flex flex-col flex-1 items-center justify-center">
        {simple && (
          <span className=" text-neutral-6 text-lg">
            {widgetData?.character}
          </span>
        )}
        <div className=" flex mb-2 items-center">
          <Image
            width={32}
            height={32}
            alt="co2"
            src={"/assets/widgets/co2.svg"}
          />
          <span className="text-xl text-neutral-7 dark:text-neutral-3 font-bold mx-2">
            {widgetData?.data[0]?.payload}
          </span>
          <span className=" text-neutral-6 text-lg">{widgetData?.unit}</span>
        </div>
      </div>
    </WidgetDataContainer>
  );
}
