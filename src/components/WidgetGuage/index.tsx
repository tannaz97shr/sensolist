import ReactEcharts from "echarts-for-react";

interface WidgetGuageProps {
  min: number;
  max: number;
  value: number;
  unit: string;
  character: string;
}

export default function WidgetGuage({
  min,
  max,
  unit,
  value,
  character,
}: WidgetGuageProps) {
  const option = {
    series: [
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,
        itemStyle: {
          color: "#FFAB91",
        },
        progress: {
          show: true,
          width: 30,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 30,
          },
        },
        axisTick: {
          distance: -45,
          splitNumber: 5,
          lineStyle: {
            width: 2,
            color: "#999",
          },
        },
        splitLine: {
          distance: -52,
          length: 14,
          lineStyle: {
            width: 3,
            color: "#999",
          },
        },
        axisLabel: {
          distance: 0,
          color: "#999",
          fontSize: 14,
          formatter: (value: number) => {
            return Math.round(value); // This will round the value and remove decimals
          },
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "50%",
          lineHeight: 40,
          borderRadius: 8,
          offsetCenter: [0, "-15%"],
          fontSize: 32,
          fontWeight: "bolder",
          formatter: `{value} ${unit}`,
          color: "inherit",
        },
        data: [
          {
            value: value,
          },
        ],
      },
      {
        type: "gauge",
        center: ["50%", "60%"],
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,
        itemStyle: {
          color: "#FD7347",
        },
        progress: {
          show: true,
          width: 8,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        detail: {
          show: false,
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
