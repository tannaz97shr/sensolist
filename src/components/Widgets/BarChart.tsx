import { getWidgetData } from "@/ApiCall/widgets";
import { IWidgetData } from "@/types/general";
import type { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface BarChartProps {
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
  simple?: boolean;
}

export default function CustomBarChart({
  senderId,
  name,
  start,
  end,
  charactristics,
  xLabel,
  yLabel,
  min,
  max,
  simple,
}: BarChartProps) {
  const [widgetData, setWidgetData] = useState<IWidgetData>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 60) {
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
      setSeconds(60);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [senderId, seconds]);

  const transformData = (data: IWidgetData | undefined) => {
    const characters = data?.charactersData?.map((characterObj) => ({
      name: characterObj.character,
      unit: characterObj.unit,
      values: characterObj.data,
    }));
    const header = characters ? ["time", ...characters.map((c) => c.name)] : [];
    const rowCount = characters ? characters[0].values.length : 0;
    const chartData: (string | number)[][] = [header];

    if (characters) {
      for (let i = 0; i < rowCount; i++) {
        const time = new Date(
          characters[0].values[i].receivedTime
        ).toLocaleTimeString("en-US", { hour12: false });

        const row: (string | number)[] = [time];
        characters.forEach((character) => {
          row.push(parseFloat(character.values[i].payload)); // Convert payload to number
        });

        chartData.push(row);
      }
    }

    return chartData;
  };

  const convertedData = transformData(widgetData);

  const option: EChartsOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: convertedData,
    },
    xAxis: {
      type: "category",
      name: xLabel,
      nameLocation: "middle",
      nameGap: 18,
    },
    yAxis: {
      name: yLabel,
      min,
      max,
    },
    series: widgetData?.charactersData?.map((_item) => {
      return { type: "bar" };
    }),
  };
  return (
    <div
      className={` p-6 flex flex-col ${
        simple
          ? "min-h-[calc(100%-28px)] mt-6"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!widgetData ? (
        loading && (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        )
      ) : (
        <ReactEcharts option={option} />
      )}
      {!simple && (
        <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
          Last Update {seconds} seconds ago
        </div>
      )}
    </div>
  );
}
