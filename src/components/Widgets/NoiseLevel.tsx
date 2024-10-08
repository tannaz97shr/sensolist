"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
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
  const [seconds, setSeconds] = useState<number>(10);
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, seconds]);
  const option = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c} dB",
    },
    series: [
      {
        name: name,
        type: "gauge",
        detail: {
          valueAnimation: true,
          formatter: "{value} dB",
        },
        data: [{ value: percent, name: "Noise Level" }],
        axisLine: {
          lineStyle: {
            color: [
              [0.2, "#76c043"],
              [0.5, "#ffeb3b"],
              [1, "#ff5722"],
            ],
            width: 10,
          },
        },
        axisTick: {
          show: true,
          splitNumber: 10,
          length: 10,
        },
        splitLine: {
          length: 15,
          lineStyle: {
            color: "#000",
          },
        },
        title: {
          show: true,
          offsetCenter: [0, "60%"],
          textStyle: {
            fontSize: 20,
            fontWeight: "bolder",
          },
        },
      },
    ],
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
  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)] flex flex-col">
      {!widgetData ? (
        loading && (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        )
      ) : percent ? (
        <ReactEcharts
          option={option}
          style={{ height: "200px", width: "100%" }}
        />
      ) : (
        <div className="flex h-full flex-1">
          <span className="m-auto">No Data available!</span>
        </div>
      )}
      <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
        Last Update {seconds} seconds ago
      </div>
    </div>
  );
}
