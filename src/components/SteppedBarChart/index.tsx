interface SteppedBarChartProps {
  percent: number;
  amount: number;
  unit: string;
}

export default function SteppedBarChart({
  percent,
  amount,
  unit,
}: SteppedBarChartProps) {
  const barArray = [
    "#50CB0E",
    "#50CB0E",
    "#50CB0E",
    "#50CB0E",
    "#EEBA56",
    "#EEBA56",
    "#EEBA56",
    "#EEBA56",
    "#DF2040",
    "#DF2040",
    "#DF2040",
    "#DF2040",
  ];
  console.log();
  return (
    <div className="flex-1 flex flex-col mb-4">
      <div className=" mt-auto w-fit mx-auto">
        <span className=" text-2xl text-neutral-7">{amount}</span>
        <span className=" text-neutral-6 text-xl ml-2">{unit}</span>
      </div>
      <div className="w-[100px] h-[100px] flex justify-between mx-auto">
        {barArray.map((bar, i) => (
          <div
            key={i}
            style={{
              background:
                i <= Math.floor((5 * percent) / 100) ? bar : "#DCDCDC",
              height: (i + 1) * 5,
            }}
            className=" w-1 mt-auto rounded-full"
          ></div>
        ))}
      </div>
    </div>
  );
}
