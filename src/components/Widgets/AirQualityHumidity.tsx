"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface AirQualityhumidityProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
}

export default function AirQualityhumidity({
  senderId,
  name,
  characteristics,
  range,
}: AirQualityhumidityProps) {
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
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 0,
          color: "#999",
          fontSize: 14,
          formatter: (value: number) => {
            return Math.round(value); // This will round the value and remove decimals
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
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 30,
          fontWeight: "bolder",
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
        percent && <ReactEcharts option={option} />
      )}
      <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
