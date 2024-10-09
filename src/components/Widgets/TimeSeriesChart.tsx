interface TimeSeriesChartProps {
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
export default function TimeSeriesChart({
  senderId,
  name,
  start,
  end,
  charactristics,
  xLabel,
  yLabel,
  min,
  max,
}: TimeSeriesChartProps) {
  // const [widgetData, setWidgetData] = useState<IWidgetData | null>(null);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [chartData, setChartData] = useState<any[]>([]); // Stores all the fetched data
  // const [seconds, setSeconds] = useState<number>(1); // Update the data every 1 second

  // // Helper function to format data
  // const formatWidgetData = (response: IWidgetData) => {
  //   if (response && response.charactersData) {
  //     return response.charactersData.map((characterData: any) => ({
  //       name: characterData.character,
  //       data: characterData.data.map((d: any) => ({
  //         time: d.receivedTime,
  //         value: parseFloat(d.payload), // Ensure payload is a number
  //       })),
  //     }));
  //   }
  //   return [];
  // };

  // useEffect(() => {
  //   // Fetch 20 initial data points
  //   const fetchInitialData = async () => {
  //     if (senderId) {
  //       setLoading(true);
  //       const response = await getWidgetData(senderId, charactristics, 20, 1); // Fetch initial 20 data points
  //       setLoading(false);

  //       if (response) {
  //         const formattedData = formatWidgetData(response);
  //         console.log("Initial data fetched:", formattedData); // Debugging log for initial data

  //         if (formattedData.length > 0) {
  //           setChartData(formattedData); // Set the initial data to state
  //         }
  //       }
  //     }
  //   };

  //   fetchInitialData(); // Fetch the initial 20 data points on mount
  // }, [senderId, charactristics]);

  // useEffect(() => {
  //   // Add one new data point every second
  //   const fetchNewData = async () => {
  //     if (senderId) {
  //       const response = await getWidgetData(senderId, charactristics, 1, 1); // Fetch one new data point

  //       if (response) {
  //         const newData = formatWidgetData(response);
  //         console.log("New data fetched:", newData); // Debugging log for new data

  //         setChartData((prevData) =>
  //           prevData.map((series, index) => ({
  //             ...series,
  //             data: newData.length
  //               ? [...series.data, ...newData[index]?.data]
  //               : series.data, // Append new data without removing old ones
  //           }))
  //         );
  //       }
  //     }
  //   };

  //   // Set up an interval to fetch new data every second
  //   const interval = setInterval(() => {
  //     fetchNewData();
  //   }, 1000);

  //   return () => clearInterval(interval); // Clean up interval on unmount
  // }, [senderId, charactristics]);

  // console.log("time series chart data", chartData);
  // const option = {
  //   title: {
  //     text: name,
  //   },
  //   xAxis: {
  //     type: "category",
  //     data: chartData.length
  //       ? chartData[0].data.map((point: any) =>
  //           new Date(point.time).toLocaleTimeString()
  //         )
  //       : [],
  //     axisLine: { lineStyle: { color: "#8392A5" } },
  //   },
  //   yAxis: {
  //     type: "value",
  //     min: min,
  //     max: max,
  //     axisLine: { lineStyle: { color: "#8392A5" } },
  //     splitLine: { show: false },
  //   },
  //   tooltip: {
  //     trigger: "axis",
  //     axisPointer: {
  //       animation: false,
  //       type: "cross",
  //       lineStyle: {
  //         color: "#376df4",
  //         width: 2,
  //         opacity: 1,
  //       },
  //     },
  //   },
  //   grid: {
  //     bottom: 80,
  //   },
  //   dataZoom: [
  //     {
  //       textStyle: {
  //         color: "#8392A5",
  //       },
  //       handleIcon:
  //         "path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
  //       dataBackground: {
  //         areaStyle: {
  //           color: "#8392A5",
  //         },
  //         lineStyle: {
  //           opacity: 0.8,
  //           color: "#8392A5",
  //         },
  //       },
  //       brushSelect: true,
  //     },
  //     {
  //       type: "inside",
  //     },
  //   ],
  //   legend: {
  //     data: chartData.map((series: any) => series.name),
  //     inactiveColor: "#777",
  //   },
  //   series: chartData.map((series: any) => ({
  //     name: series.name,
  //     type: "line",
  //     data: series.data.map((point: any) => point.value),
  //     smooth: true,
  //     showSymbol: false,
  //     lineStyle: {
  //       width: 1,
  //     },
  //   })),
  // };

  return (
    <div className=" bg-black-opacity-50 dark:bg-white-opacity-50 mt-10 p-6 min-h-[calc(100%-140px)]">
      {/* {!chartData ? (
        <Spinner className="mx-auto mt-10" />
      ) : (
        <ReactEcharts option={option} />
      )} */}
    </div>
  );
}
