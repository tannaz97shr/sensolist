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
}: BarChartProps) {
  const [widgetData, setWidgetData] = useState<IWidgetData>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(senderId, charactristics, 20, 1);
          console.log("bar response", response);
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

  console.log(" bar response", convertedData);

  const option: EChartsOption = {
    legend: {},
    tooltip: {},
    dataset: {
      source: convertedData,
    },
    xAxis: { type: "category" },
    yAxis: {},
    series: widgetData?.charactersData?.map((_item) => {
      return { type: "bar" };
    }),
  };
  return (
    <div className=" bg-neutral-2 dark:bg-primary-tint-1 border border-neutral-6 min-h-40 mt-10 rounded-xl p-6">
      {!widgetData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <ReactEcharts option={option} />
      )}
    </div>
  );
}
