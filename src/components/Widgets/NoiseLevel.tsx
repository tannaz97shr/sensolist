"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { useEffect, useState } from "react";
import SteppedBarChart from "../SteppedBarChart";
import Spinner from "../UI/Spinner";

interface NoiseLevelProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
}

export default function NoiseLevel({
  senderId,
  name,
  characteristics,
  range,
}: NoiseLevelProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>();

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
                  (char) => char.character === "noise"
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
  const option = {
    xAxis: {
      type: "category",
      data: ["Noise level"],
      show: false, // Hide the x-axis labels since you're only showing one category
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100, // As percentage
      show: false, // Hide the y-axis labels
    },
    series: [
      {
        type: "bar",
        data: [percent], // Use the noise percentage for the bar height
        barWidth: "40%", // Adjust the bar width to match your design
        itemStyle: {
          color: (params: any) => {
            if ((percent || 0) <= 30) {
              return "#4caf50"; // Green for low noise
            } else if ((percent || 0) <= 60) {
              return "#ffeb3b"; // Yellow for medium noise
            } else {
              return "#f44336"; // Red for high noise
            }
          },
        },
      },
    ],
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "10%",
      containLabel: true,
    },
    tooltip: {
      show: false, // Disable tooltips since the percentage is directly displayed
    },
  };

  useEffect(() => {
    if (widgetData) {
      setPercent(
        ((Number(widgetData.data[0]?.payload) - Number(range.minimum)) /
          (Number(range.maximum) - Number(range.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  console.log("noise level percent", percent);
  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)] flex flex-col">
      {!percent ? (
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
        <SteppedBarChart
          percent={percent}
          amount={Number(widgetData?.data[0].payload)}
          unit={widgetData?.unit || ""}
        />
      )}
      <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
