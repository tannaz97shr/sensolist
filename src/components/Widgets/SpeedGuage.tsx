"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import WidgetGuage from "../WidgetGuage";

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
    if (seconds === 10) {
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
    <div
      className={` p-6 flex flex-col ${
        simple
          ? "min-h-[calc(100%-28px)] mt-6"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <div>
          <WidgetGuage
            min={Number(range.minimum)}
            max={Number(range.maximum)}
            value={Number(widgetData.data[0]?.payload || 0)}
            unit={widgetData.unit}
            character={widgetData.character}
          />
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
