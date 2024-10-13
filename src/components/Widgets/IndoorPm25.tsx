"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface IndoorPm25Props {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function IndoorPm25({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: IndoorPm25Props) {
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
                  (char) => char.character === "pm2.5"
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
          (Number(range.maximum) - Number(range.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  const gaugeData = [
    {
      value: Number(percent?.toFixed(2)),
      name: "PM2.5",
      title: {
        offsetCenter: ["0%", "40%"],
      },
      detail: {
        valueAnimation: true,
        offsetCenter: ["0%", "0%"],
      },
    },
  ];

  const option: EChartsOption = {
    series: [
      {
        type: "gauge",
        radius: "75%", // Reduced radius to make the chart smaller
        itemStyle: {
          color: "#C6125D",
        },
        startAngle: 90,
        endAngle: -270,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          width: 8,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 6, // Reduced width of the axis line
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: gaugeData,
        title: {
          fontSize: 12, // Reduced font size for the title
        },
        detail: {
          width: 50, // Reduced width of the detail area
          height: 12, // Reduced height of the detail area
          fontSize: 12, // Reduced font size of the detail
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: `${widgetData?.data[0]?.payload} ${widgetData?.unit}`,
        },
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
            alt="pm25"
            src={"/assets/widgets/pm25.svg"}
          />
          <span className=" text-neutral-6 text-lg">
            {widgetData?.character}
          </span>
        </div>
      )}
      {percent && (
        <ReactEcharts
          option={option}
          style={{ width: "150px", height: "150px", margin: "auto" }}
        />
      )}
    </WidgetDataContainer>
  );
}
