import { getWidgetData } from "@/ApiCall/widgets";
import { IWidgetData } from "@/types/general";
import { useEffect, useState } from "react";

import ReactEcharts, { EChartsOption } from "echarts-for-react";
import WidgetDataContainer from "./WidgetDataContainer";

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
  simple?: boolean;
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
  simple,
}: LineChartProps) {
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

  const option: EChartsOption = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: widgetData?.charactersData?.map((char) => char.character),
      textStyle: {
        color: "#b4b4b4",
      },
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
      name: xLabel,
      nameLocation: "center",
      nameGap: 18,
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
      name: yLabel,
      min,
      max,
    },
    series: widgetData?.charactersData?.length
      ? widgetData.charactersData.map((charData) => {
          return {
            name: charData.character,
            type: "line",
            // stack: "Total",
            data: charData.data.map((d) => Number(d.payload)),
          };
        })
      : [],
  };

  return (
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      <ReactEcharts option={option} />
    </WidgetDataContainer>
  );
}
