"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface OutdoorPm25Props {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
}

export default function OutdoorPm25({
  senderId,
  name,
  characteristics,
  range,
}: OutdoorPm25Props) {
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
            response.charactersData?.length
              ? response.charactersData.filter(
                  (char) => char.character === "pm2.5"
                )[0]
              : null
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
    if (widgetData) {
      setPercent(
        ((Number(widgetData.data[0]?.payload) - Number(range.minimum)) /
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
        offsetCenter: ["0%", "20%"],
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
          fontSize: 14,
        },
        detail: {
          width: 50,
          height: 14,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 20,
          borderWidth: 1,
          formatter: "{value}%",
        },
      },
    ],
  };

  return (
    <div className="flex flex-col bg-neutral-2 dark:bg-primary-tint-1 border border-neutral-6 min-h-40 mt-10 rounded-xl p-6">
      {widgetData ? (
        percent ? (
          percent > 100 || percent < 0 ? (
            <div>out of range</div>
          ) : (
            <ReactEcharts option={option} />
          )
        ) : (
          loading && <Spinner />
        )
      ) : (
        <div>No Data</div>
      )}

      <div className="mt-auto text-neutral-7 dark:text-neutral-6 mx-auto w-fit">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
