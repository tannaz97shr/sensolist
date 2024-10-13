"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetGuage from "../WidgetGuage";
import WidgetDataContainer from "./WidgetDataContainer";

interface SpeedGuageProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function SpeedGuage({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: SpeedGuageProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 60) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(senderId, ["speed"], 1, 1);
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
      {simple && (
        <div className=" flex items-center gap-2 ml-2">
          <Image
            width={32}
            height={32}
            alt="speed"
            src={"/assets/widgets/speed.svg"}
          />
          <span className="text-neutral-7 dark:text-neutral-4 text-lg uppercase font-semibold">
            {widgetData?.character}
          </span>
        </div>
      )}
      <WidgetGuage
        min={Number(range.minimum)}
        max={Number(range.maximum)}
        value={Number(widgetData?.data[0]?.payload || 0)}
        unit={widgetData?.unit || ""}
        character={widgetData?.character || ""}
      />
    </WidgetDataContainer>
  );
}
