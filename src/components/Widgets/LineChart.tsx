import { _getWidgetData } from "@/ApiCall/widgets";
import { _IWidgetData } from "@/types/general";
import { useEffect, useState } from "react";
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

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
  const colors = [
    "#FF5733", // Vivid Red
    "#33FF57", // Vivid Green
    "#3357FF", // Vivid Blue
    "#F1C40F", // Bright Yellow
    "#9B59B6", // Vibrant Purple
    "#E67E22", // Rich Orange
    "#1ABC9C", // Teal
    "#34495E", // Dark Blue-Grey
    "#E74C3C", // Soft Red
    "#2ECC71", // Bright Green
  ];
  const [widgetData, setWidgetData] = useState<_IWidgetData>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await _getWidgetData(
            senderId,
            charactristics,
            start,
            end
          );
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
  console.log("dataa", widgetData);

  const convertToChartData = (data: _IWidgetData) => {
    const keys = Object.keys(data);
    const maxLength = 20;

    const chartData = Array.from({ length: maxLength }, (_, i) => {
      const entry: Record<string, number | string> = {
        name: `Data Point ${i + 1}`,
      };

      keys.forEach((key) => {
        if (i < data[key].data.length) {
          entry[key] = data[key].data[i].payload;
        } else {
          entry[key] = 0;
        }
      });

      return entry;
    });

    return chartData;
  };
  // Convert the input data
  const chartData = widgetData ? convertToChartData(widgetData) : [];

  console.log("chart data", chartData);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        {widgetData &&
          Object.keys(widgetData).map((key, i) => (
            <Line
              key={key}
              dataKey={key}
              strokeWidth={3}
              type="monotone"
              stroke={colors[i]}
            />
          ))}

        <CartesianGrid stroke="#ccc" />
        <XAxis tick={{ fontSize: 10 }} interval={5} dataKey="name">
          <Label position={"insideBottom"} offset={-5}>
            {xLabel}
          </Label>
        </XAxis>
        <YAxis
          interval={0}
          tick={{ fontSize: 10 }}
          type="number"
          domain={[(_dataMin: number) => min, (_dataMax: number) => max]}
        >
          <Label>{yLabel}</Label>
        </YAxis>
      </LineChart>
    </ResponsiveContainer>
  );
}
