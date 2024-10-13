"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface IndoorHumidityCardProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function IndoorHumidityCard({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: IndoorHumidityCardProps) {
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
                  (char) => char.character === "humidity"
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

  useEffect(() => {
    if (widgetData) {
      setPercent(
        ((Number(widgetData.data[0]?.payload) - Number(range.minimum)) /
          (Number(range.maximum) - Number(range.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  const option: EChartsOption = {
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"], // Keep the center position
        radius: "72%", // Increased by 20% (original was 60%)
        startAngle: 200,
        endAngle: -20,
        min: Number(range?.minimum),
        max: Number(range?.maximum),
        splitNumber: 12,
        itemStyle: {
          color: "#58D9F9",
        },
        progress: {
          show: true,
          width: 18, // Increase progress bar width slightly (20% bigger)
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 18, // Increase outer line width to maintain proportions
          },
        },
        axisTick: {
          distance: -24, // Adjust distance from center to fit the bigger size
          splitNumber: 5,
          lineStyle: {
            width: 1.8,
            color: "#999",
          },
        },
        splitLine: {
          distance: -30, // Adjust distance from center to fit the bigger size
          length: 12, // Increase split line length slightly
          lineStyle: {
            width: 2.4, // Slightly increase line width
            color: "#999",
          },
        },
        axisLabel: {
          distance: -6, // Slight adjustment for label distance
          color: "#999",
          fontSize: 12, // Increase font size slightly
          formatter: (value: number) => {
            return Math.round(value); // Round and remove decimals
          },
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "50%", // Slight increase to match the larger size
          lineHeight: 30, // Increase line height to match the bigger chart
          borderRadius: 4,
          offsetCenter: [0, "-15%"], // Keep the detail centered
          fontSize: 16, // Slightly increase font size for the detail
          fontWeight: "bolder",
          // overflow: "truncate",
          formatter: `${widgetData?.data[0].payload} ${widgetData?.unit}`,
          color: "inherit",
        },
        data: [
          {
            value: percent,
          },
        ],
      },
    ],
  };

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
            alt="humidity"
            src={"/assets/widgets/humidity.svg"}
          />
          <span className=" text-neutral-6 text-lg">
            {widgetData?.character}
          </span>
        </div>
      )}
      {percent && (
        <div className="mx-auto">
          <ReactEcharts
            option={option}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      )}
    </WidgetDataContainer>
  );
}
