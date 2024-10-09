import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface AirQualityPM25Props {
  senderId?: string;
  name: string;
  characteristics: string[];
}

export default function AirQualityPM25({
  senderId,
  name,
  characteristics,
}: AirQualityPM25Props) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (seconds === 10) {
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, seconds]);

  console.log("air pm 25 data", widgetData);
  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)] flex flex-col">
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
          <span className="mb-2 text-xl text-neutral-7 dark:text-neutral-3 font-bold">
            {widgetData.data[0].payload}
          </span>
          <span className=" text-neutral-6 text-lg">{widgetData.unit}</span>
        </div>
      )}
      <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
