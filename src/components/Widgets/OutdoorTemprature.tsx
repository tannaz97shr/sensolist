"use client";

import { _getWidgetData } from "@/ApiCall/widgets";
import { IWidgetPayload } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface OutdoorTempratureProps {
  senderId?: string;
  name: string;
}

export default function OutdoorTemprature({
  senderId,
  name,
}: OutdoorTempratureProps) {
  const [widgetData, setWidgetData] = useState<IWidgetPayload[]>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          setLoading(false);
          const response = await _getWidgetData(senderId, ["temperature"]);
          console.log("outdoor temperature res", response);
          setWidgetData(response.temperature?.data || []);
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds]);
  return (
    <div className=" aspect-square flex flex-col">
      <div className=" text-lg capitalize mx-auto dark:text-white">{name}</div>
      <div className="flex w-fit mx-auto mt-10">
        <Image
          className="dark:hidden"
          alt="temp"
          width={56}
          height={56}
          src={"/assets/icons/temperature.svg"}
        />
        <Image
          className="hidden dark:flex"
          alt="temp"
          width={56}
          height={56}
          src={"/assets/icons/temperature-dark.svg"}
        />
        <div className="flex flex-col">
          <div className="text-lg font-bold dark:text-neutral-2">
            Temperature
          </div>
          <div className=" text-neutral-7 dark:text-neutral-6">
            Last Update {seconds} seconds ago
          </div>
        </div>
      </div>
      {loading ? (
        <Spinner className="mx-auto mt-20" />
      ) : (
        <div className="text-4xl mt-20 mx-auto text-primary-tint-1 dark:text-primary-tint-3">
          {widgetData?.length
            ? widgetData[0].payload + " °C"
            : "There is no data."}
        </div>
      )}
    </div>
  );
}
