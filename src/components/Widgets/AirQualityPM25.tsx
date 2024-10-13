import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface AirQualityPM25Props {
  senderId?: string;
  name: string;
  characteristics: string[];
  simple?: boolean;
}

export default function AirQualityPM25({
  senderId,
  name,
  characteristics,
  simple,
}: AirQualityPM25Props) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (seconds === 60) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(senderId, characteristics, 1, 1);
          setLoading(false);
          setWidgetData(
            response.charactersData?.length
              ? response.charactersData.filter(
                  (char) => char.character === "pm2.5"
                )[0]
              : null
          );
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(60);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, seconds]);

  return (
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      <div className="flex flex-col flex-1 items-center justify-center">
        {simple && (
          <span className=" text-neutral-7 dark:text-neutral-4 text-lg mb-4 uppercase font-semibold">
            {widgetData?.character}
          </span>
        )}
        <div className=" flex mb-2 items-center">
          <Image
            width={32}
            height={32}
            alt="co2"
            src={"/assets/widgets/pm25.svg"}
          />
          <span className="text-xl text-neutral-7 dark:text-neutral-3 font-bold mr-2 ml-4">
            {widgetData?.data[0]?.payload}
          </span>
          <span className="text-neutral-6 dark:text-neutral-4 text-lg">
            {widgetData?.unit}
          </span>
        </div>
      </div>
    </WidgetDataContainer>
  );
}
