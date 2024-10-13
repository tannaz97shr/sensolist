"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";

import { Progress } from "flowbite-react";
import WidgetDataContainer from "./WidgetDataContainer";

interface ProgressBarProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function ProgressBar({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: ProgressBarProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [percent, setPercent] = useState<number>();
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

  useEffect(() => {
    if (widgetData) {
      setPercent(
        widgetData.data[0]
          ? ((Number(widgetData.data[0]?.payload) - Number(range?.minimum)) /
              (Number(range?.maximum) - Number(range?.minimum))) *
              100
          : undefined
      );
    }
  }, [range.maximum, range.minimum, widgetData]);

  return (
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      {percent &&
        (percent > 100 || percent < 0 ? (
          <div className=" flex-1 flex flex-col justify-center">
            <div>out of range</div>
          </div>
        ) : (
          <>
            <div className=" dark:text-neutral-3 uppercase text-lg w-fit mx-auto mt-6">
              {widgetData?.character}
            </div>
            <div className=" flex-1 flex flex-col justify-center px-4">
              <div className="mt-10 flex justify-between dark:text-white">
                <span>{range.minimum}</span>
                <span>{range.maximum}</span>
              </div>
              <Progress progress={percent} size={"lg"} color="dark" />
            </div>
          </>
        ))}
    </WidgetDataContainer>
  );
}
