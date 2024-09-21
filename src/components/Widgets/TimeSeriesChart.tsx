import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface TimeSeriesChartProps {
  xLabel: string;
  title: string;
  min: number;
  max: number;
}
export default function TimeSeriesChart({
  xLabel,
  title,
  min,
  max,
}: TimeSeriesChartProps) {
  const fakeData = [7, 4, 7, 6, 2, 1, 6, 8];

  const data = [
    {
      name: xLabel,
      amount: 7,
      value: 2,
    },
    {
      name: xLabel,
      amount: 4,
      value: 4,
    },
    {
      name: xLabel,
      amount: 7,
      value: 1,
    },
    {
      name: xLabel,
      amount: 6,
      value: 1,
    },
    {
      name: xLabel,
      amount: 2,
      value: 7,
    },
    {
      name: xLabel,
      amount: 3,
      value: 8,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart width={400} height={200} data={data}>
        <XAxis tick={{ fontSize: 10 }} interval={0} dataKey="name" />
        <YAxis
          interval={0}
          tick={{ fontSize: 10 }}
          type="number"
          domain={[(_dataMin: number) => min, (_dataMax: number) => max]}
        />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Bar dataKey="amount" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="value" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
