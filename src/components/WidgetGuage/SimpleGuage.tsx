import type { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";

interface SimpleGuageProps {
  min: number;
  max: number;
  value: number;
  unit: string;
  character: string;
}

export default function SimpleGuage({
  min,
  max,
  unit,
  value,
  character,
}: SimpleGuageProps) {
  const option: EChartsOption = {
    tooltip: {
      formatter: "{a} <br/>{b} : {c}%",
    },
    series: [
      {
        name: character,
        type: "gauge",
        min: min,
        max: max,
        progress: {
          show: true,
        },
        detail: {
          valueAnimation: true,
          formatter: "{value}",
        },
        data: [
          {
            value: value,
            name: character,
          },
        ],
      },
    ],
  };
  return <ReactEcharts option={option} />;
}
