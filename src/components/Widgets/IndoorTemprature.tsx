"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface IndoorTempratureProps {
  senderId?: string;
  name: string;
  characteristics: string[];
  range: {
    minimum: string;
    maximum: string;
  };
  simple?: boolean;
}

export default function IndoorTemprature({
  senderId,
  name,
  characteristics,
  range,
  simple,
}: IndoorTempratureProps) {
  const [sensorData, setSensorData] = useState<any[]>([]);

  useEffect(() => {
    // Establish a connection with the Socket.IO server
    const socket: Socket = io("185.110.189.232:1997", {
      path: "/sensor-data",
      transports: ["websocket"],
    });

    // Define the payload to be sent with the SensorsData.RealTime event
    const realTimePayload: any = {
      sensors: [
        {
          senderId: "1728383761482",
          characters: ["pressure", "temperature", "speed"],
        },
        {
          senderId: "1728383764657",
          characters: ["speed"],
        },
      ],
    };

    // Send SensorsData.RealTime event when the dashboard opens
    socket.emit("SensorsData.RealTime", realTimePayload);

    // Listen for Sensor.Data event to receive real-time sensor data
    socket.on("Sensor.Data", (data: any) => {
      console.log("socket Received sensor data:", data);
      setSensorData((prevData) => [...prevData, data]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  console.log("socket sensor data", sensorData);

  // const [widgetData, setWidgetData] = useState<ICharatersData | null>();
  // const [seconds, setSeconds] = useState<number>(60);
  // const [loading, setLoading] = useState<boolean>(false);
  // const [percent, setPercent] = useState<number>();

  // useEffect(() => {
  //   if (seconds === 10) {
  //     const getData = async () => {
  //       if (senderId) {
  //         setLoading(true);
  //         const response = await getWidgetData(senderId, characteristics, 1, 1);
  //         setLoading(false);
  //         setWidgetData(
  //           response.charactersData?.length
  //             ? response.charactersData.filter(
  //                 (char) => char.character === "temperature"
  //               )[0]
  //             : null
  //         );
  //       }
  //     };
  //     getData();
  //   } else if (seconds <= 0) {
  //     setSeconds(60);
  //     return;
  //   }

  //   const interval = setInterval(() => setSeconds(seconds - 1), 1000);

  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [senderId, seconds]);

  // useEffect(() => {
  //   if (widgetData) {
  //     setPercent(
  //       ((Number(widgetData.data[0]?.payload) - Number(range.minimum)) /
  //         (Number(range.maximum) - Number(range.minimum))) *
  //         100
  //     );
  //   }
  // }, [range?.maximum, range?.minimum, widgetData]);

  // const gaugeData = [
  //   {
  //     value: Number(percent?.toFixed(2)),
  //     name: "Temperature",
  //     title: {
  //       offsetCenter: ["0%", "20%"],
  //     },
  //     detail: {
  //       valueAnimation: true,
  //       offsetCenter: ["0%", "0%"],
  //     },
  //   },
  // ];

  // const option: EChartsOption = {
  //   series: [
  //     {
  //       type: "gauge",
  //       itemStyle: {
  //         color: "#2A4FA3",
  //       },
  //       startAngle: 90,
  //       endAngle: -270,
  //       pointer: {
  //         show: false,
  //       },
  //       progress: {
  //         show: true,
  //         overlap: false,
  //         roundCap: true,
  //         clip: false,
  //         itemStyle: {
  //           borderWidth: 1,
  //           borderColor: "#464646",
  //         },
  //       },
  //       axisLine: {
  //         lineStyle: {
  //           width: 10,
  //         },
  //       },
  //       splitLine: {
  //         show: false,
  //         distance: 0,
  //         length: 10,
  //       },
  //       axisTick: {
  //         show: false,
  //       },
  //       axisLabel: {
  //         show: false,
  //         distance: 50,
  //       },
  //       data: gaugeData,
  //       title: {
  //         fontSize: 14,
  //       },
  //       detail: {
  //         width: 50,
  //         height: 14,
  //         fontSize: 14,
  //         color: "inherit",
  //         borderColor: "inherit",
  //         borderRadius: 20,
  //         borderWidth: 1,
  //         formatter: `${widgetData?.data[0]?.payload} ${widgetData?.unit}`,
  //       },
  //     },
  //   ],
  // };

  return (
    <></>
    // <div
    //   className={` p-6 flex flex-col ${
    //     simple
    //       ? "min-h-[calc(100%-28px)] mt-6"
    //       : "min-h-[calc(100%-140px)] mt-10"
    //   }`}
    // >
    //   {!widgetData ? (
    //     loading && (
    //       <div className="flex h-full flex-1">
    //         <Spinner className="m-auto" />
    //       </div>
    //     )
    //   ) : percent ? (
    //     <ReactEcharts option={option} />
    //   ) : (
    //     <div className="flex h-full flex-1">
    //       <span className="m-auto">No Data available!</span>
    //     </div>
    //   )}
    //   {!simple && (
    //     <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
    //       Last Update {seconds} seconds ago
    //     </div>
    //   )}
    // </div>
  );
}
