import { getWidgetData } from "@/ApiCall/widgets";
import { IWidgetData } from "@/types/general";
import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";

import ReactEcharts, { EChartsOption } from "echarts-for-react";

interface LineChartProps {
  senderId?: string;
  name: string;
  start: string;
  end: string;
  xLabel: string;
  yLabel: string;
  min: number;
  max: number;
  title: string;
  charactristics: string[];
}
export default function CustomLineChart({
  senderId,
  name,
  start,
  end,
  charactristics,
  xLabel,
  yLabel,
  min,
  max,
}: LineChartProps) {
  const [widgetData, setWidgetData] = useState<IWidgetData>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(senderId, charactristics, 20, 1);
          setLoading(false);
          setWidgetData(response);
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

  console.log(
    "line chart widget data",
    widgetData?.charactersData?.map((char) => char.character)
  );

  const option: EChartsOption = {
    title: {
      text: name,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: widgetData?.charactersData?.map((char) => char.character),
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: widgetData?.charactersData?.length
        ? widgetData?.charactersData[0].data.map((d) => {
            const time = new Date(d.receivedTime).toLocaleTimeString("en-US", {
              hour12: false,
            });
            return time;
          })
        : [],
    },
    yAxis: {
      type: "value",
      min,
      max,
    },
    series: widgetData?.charactersData?.length
      ? widgetData.charactersData.map((charData) => {
          return {
            name: charData.character,
            type: "line",
            stack: "Total",
            data: charData.data.map((d) => Number(d.payload)),
          };
        })
      : [],
  };

  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)]">
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <ReactEcharts option={option} />
      )}
    </div>
  );
}
