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
        center: ["50%", "60%"], // Keep center, since it aligns the gauge in the middle
        startAngle: 200,
        endAngle: -20,
        min: min,
        max: max,
        itemStyle: {
          color: "#FFAB91",
        },
        progress: {
          show: true,
          width: 22.5, // Reduced width (30 * 0.75) for a 25% smaller gauge
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 22.5, // Reduced width (30 * 0.75) for a smaller appearance
          },
        },
        axisTick: {
          distance: -33.75, // Reduced distance (-45 * 0.75)
          splitNumber: 5,
          lineStyle: {
            width: 1.5, // Reduced width (2 * 0.75)
            color: "#999",
          },
        },
        splitLine: {
          distance: -39, // Reduced distance (-52 * 0.75)
          length: 10.5, // Reduced length (14 * 0.75)
          lineStyle: {
            width: 2.25, // Reduced width (3 * 0.75)
            color: "#999",
          },
        },
        axisLabel: {
          distance: 0,
          color: "#999",
          fontSize: 10.5, // Reduced font size (14 * 0.75)
          formatter: (value: number) => Math.round(value), // No change needed here
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          width: "37.5%", // Reduced width ("50%" * 0.75)
          lineHeight: 30, // Reduced line height (40 * 0.75)
          borderRadius: 6, // Reduced radius (8 * 0.75)
          offsetCenter: [0, "-15%"],
          fontSize: 24, // Reduced font size (32 * 0.75)
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
          width: 6, // Reduced width (8 * 0.75)
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
