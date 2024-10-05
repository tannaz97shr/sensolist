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

  useEffect(() => {
    console.log("wdg data", widgetData);
    if (widgetData) {
      setPercent(
        ((Number(widgetData.data[0].payload) - Number(range.minimum)) /
          (Number(range.maximum) - Number(range.minimum))) *
          100
      );
    }
  }, [range.maximum, range.minimum, widgetData]);

  console.log("loading", percent);
  return (
    <div className=" bg-neutral-2 dark:bg-primary-tint-1 border border-neutral-6 h-40 mt-10 rounded-xl p-6">
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        percent && (
          <>
            <div className="mt-10 flex justify-between dark:text-white">
              <span>{range.minimum}</span>
              <span>{range.maximum}</span>
            </div>
            <Progress progress={percent} size={"lg"} color="dark" />
          </>
        )
      )}
    </div>
  );
}
