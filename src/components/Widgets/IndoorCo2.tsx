"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts, { EChartsOption } from "echarts-for-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import WidgetDataContainer from "./WidgetDataContainer";

interface IndoorCo2Props {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function IndoorCo2({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: IndoorCo2Props) {
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
                  (char) => char.character === "co2"
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
      name: "CO2",
      title: {
        offsetCenter: ["0%", "45%"],
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
        radius: "75%",
        itemStyle: {
          color: "#004105",
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
          width: 8, // Increase the width of the progress bar
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 10, // Increase the axis line width
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10, // Increase split line length for bigger chart
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        data: gaugeData,
        title: {
          fontSize: 12, // Increase title font size for bigger chart
        },
        detail: {
          width: 40, // Increase the detail width
          height: 20, // Increase the detail height
          fontSize: 12, // Increase the font size of the central value
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 25, // Increase border radius for bigger size
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
            alt="co2"
            src={"/assets/widgets/co2.svg"}
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
