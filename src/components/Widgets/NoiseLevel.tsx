"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import SteppedBarChart from "../SteppedBarChart";
import WidgetDataContainer from "./WidgetDataContainer";

interface NoiseLevelProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function NoiseLevel({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: NoiseLevelProps) {
  const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const [percent, setPercent] = useState<number>();

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
        ((Number(widgetData.data[0]?.payload) - Number(range?.minimum)) /
          (Number(range.maximum) - Number(range.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  return (
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      {simple && (
        <div className=" flex items-center gap-2 ml-2">
          <Image
            width={32}
            height={32}
            alt="noise"
            src={"/assets/widgets/noise.svg"}
          />
          <span className=" text-neutral-6 text-lg">
            {widgetData?.character}
          </span>
        </div>
      )}
      {percent && (
        <SteppedBarChart
          percent={percent}
          amount={Number(widgetData?.data[0]?.payload)}
          unit={widgetData?.unit || ""}
        />
      )}
    </WidgetDataContainer>
  );
}
