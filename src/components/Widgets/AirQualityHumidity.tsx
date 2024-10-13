"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts from "echarts-for-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface AirQualityhumidityProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function AirQualityhumidity({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: AirQualityhumidityProps) {
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
        ((Number(widgetData.data[0]?.payload) - Number(range?.minimum)) /
          (Number(range?.maximum) - Number(range?.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  const option = {
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
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
          width: 15, // Reduce this to make the gauge narrower
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 15, // Reduce this to make the axis thinner
          },
        },
        axisTick: {
          distance: -25, // Bring ticks closer to the center
          splitNumber: 5,
          lineStyle: {
            width: 1, // Reduce the width of ticks
            color: "#999",
          },
        },
        splitLine: {
          distance: -30, // Bring split lines closer
          length: 10, // Shorten split lines
          lineStyle: {
            width: 2, // Reduce the width of split lines
            color: "#999",
          },
        },
        axisLabel: {
          distance: -5, // Bring labels closer
          color: "#999",
          fontSize: 10, // Reduce the font size of the labels
          formatter: (value: number) => {
            return Math.round(value);
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
          width: "60%",
          lineHeight: 30, // Reduce the line height
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 20, // Reduce the font size of the detail text
          fontWeight: "bolder",
          formatter: `${widgetData?.data[0]?.payload} ${widgetData?.unit}`,
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
            alt="co2"
            src={"/assets/widgets/humidity.svg"}
          />
          <span className="text-neutral-7 dark:text-neutral-4 text-lg uppercase font-semibold">
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
