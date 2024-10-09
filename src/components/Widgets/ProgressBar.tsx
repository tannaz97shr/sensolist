"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";

import { Progress } from "flowbite-react";
import Spinner from "../UI/Spinner";

interface ProgressBarProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
}

export default function ProgressBar({
  senderId,
  name,
  characteristics,
  range,
}: ProgressBarProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [percent, setPercent] = useState<number>();
  const [seconds, setSeconds] = useState<number>(60);
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
          ? ((Number(widgetData.data[0]?.payload) - Number(range.minimum)) /
              (Number(range.maximum) - Number(range.minimum))) *
              100
          : undefined
      );
    }
  }, [range.maximum, range.minimum, widgetData]);

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
        percent &&
        (percent > 100 || percent < 0 ? (
          <div className=" flex-1 flex flex-col justify-center">
            <div>out of range</div>
          </div>
        ) : (
          <div className=" flex-1 flex flex-col justify-center">
            <div className="mt-10 flex justify-between dark:text-white">
              <span>{range.minimum}</span>
              <span>{range.maximum}</span>
            </div>
            <Progress progress={percent} size={"lg"} color="dark" />
          </div>
        ))
      )}
      <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
