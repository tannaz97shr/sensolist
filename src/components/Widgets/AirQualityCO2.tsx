import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface AirQualityCO2Props {
  senderId?: string;
  name: string;
  characteristics: string[];
  simple?: boolean;
}

export default function AirQualityCO2({
  senderId,
  name,
  characteristics,
  simple,
}: AirQualityCO2Props) {
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
                  (char) => char.character === "co2"
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
          <span className=" text-neutral-6 text-lg">
            {widgetData?.character}
          </span>
        )}
        <span className="text-xl text-neutral-7 dark:text-neutral-3 font-bold">
          {widgetData?.data[0]?.payload}
        </span>
        <span className=" text-neutral-6 text-lg">{widgetData?.unit}</span>
      </div>
    </WidgetDataContainer>
  );
}
