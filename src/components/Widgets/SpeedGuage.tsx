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
}

export default function SpeedGuage({
  senderId,
  name,
  characteristics,
  range,
}: SpeedGuageProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(10);
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds, characteristics]);

  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)]">
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
    </div>
  );
}
