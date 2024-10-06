"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";
import SimpleGuage from "../WidgetGuage/SimpleGuage";

interface AirQualityhumidityProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
}

export default function AirQualityhumidity({
  senderId,
  name,
  characteristics,
  range,
}: AirQualityhumidityProps) {
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
    <div className=" bg-neutral-2 dark:bg-primary-tint-1 border border-neutral-6 min-h-40 mt-10 rounded-xl p-6">
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <div>
          <SimpleGuage
            min={Number(range.minimum)}
            max={Number(range.maximum)}
            value={
              widgetData.data.length ? Number(widgetData.data[0].payload) : 0
            }
            unit={widgetData.unit}
            character={widgetData.character}
          />
        </div>
      )}
    </div>
  );
}
