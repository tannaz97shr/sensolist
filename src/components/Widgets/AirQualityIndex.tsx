"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { ICharatersData } from "@/types/general";
import ReactEcharts from "echarts-for-react";
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
                  (char) => char.character === "aqi"
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
        startAngle: 180,
        endAngle: 0,
        center: ["50%", "75%"],
        radius: "75%", // Reduce the radius to make the gauge smaller
        min: Number(range?.minimum),
        max: Number(range?.maximum),
        splitNumber: 8,
        axisLine: {
          lineStyle: {
            width: 4, // Make the axis line thinner
            color: [
              [0.25, "#FF6E76"],
              [0.5, "#FDDD60"],
              [0.75, "#58D9F9"],
              [1, "#7CFFB2"],
            ],
          },
        },
        pointer: {
          icon: "path://M12.8,0.7l12,40.1H0.7L12.8,0.7z",
          length: "8%", // Shorten the pointer
          width: 10, // Make the pointer narrower
          offsetCenter: [0, "-50%"], // Adjust the position
          itemStyle: {
            color: "auto",
          },
        },
        axisTick: {
          length: 6, // Shorten axis ticks
          lineStyle: {
            color: "auto",
            width: 1, // Make ticks narrower
          },
        },
        splitLine: {
          length: 10, // Shorten split lines
          lineStyle: {
            color: "auto",
            width: 3, // Make split lines narrower
          },
        },
        axisLabel: {
          color: "#464646",
          fontSize: 12, // Reduce font size of labels
          distance: -40, // Bring labels closer to the axis
          rotate: "tangential",
          formatter: function (_value: any) {
            return "";
          },
        },
        title: {
          offsetCenter: [0, "-10%"],
          fontSize: 12, // Reduce the title font size
        },
        detail: {
          fontSize: 12, // Reduce the detail font size
          offsetCenter: [0, "-30%"], // Adjust position of the detail
          valueAnimation: true,
          formatter: `${widgetData?.character} ${widgetData?.unit}`,
          color: "inherit",
        },
        data: [
          {
            value: percent,
            name: "Air Quality Index",
          },
        ],
      },
    ],
  };

  return (
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData?.data.length}
      loading={loading}
      seconds={seconds}
    >
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
