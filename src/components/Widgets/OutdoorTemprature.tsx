"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface OutdoorTempratureProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function OutdoorTemprature({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: OutdoorTempratureProps) {
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
            response.charactersData?.length
              ? response.charactersData.filter(
                  (char) => char.character === "temperature"
                )[0]
              : null
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
        ((Number(widgetData.data[0]?.payload) - Number(range?.minimum)) /
          (Number(range?.maximum) - Number(range?.minimum))) *
          100
      );
    }
  }, [range?.maximum, range?.minimum, widgetData]);

  const gaugeData = [
    {
      value: Number(percent?.toFixed(2)),
      // name: "Temperature",
      // title: {
      //   offsetCenter: ["0%", "40%"],
      // },
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
        radius: "75%",
        itemStyle: {
          color: "#2A4FA3",
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
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 10,
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
          fontSize: 12,
        },
        detail: {
          width: 50,
          height: 12,
          fontSize: 12,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 0,
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
            alt="temperature"
            src={"/assets/widgets/temperature.svg"}
          />
          <span className="text-neutral-7 dark:text-neutral-4 text-lg uppercase font-semibold">
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
