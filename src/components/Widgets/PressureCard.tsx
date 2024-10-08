"use client";

import { _getWidgetData } from "@/ApiCall/widgets";
import { IWidgetPayload } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../UI/Spinner";

interface PressureCardProps {
  senderId?: string;
  name: string;
}

export default function PressureCard({ senderId, name }: PressureCardProps) {
  const [widgetData, setWidgetData] = useState<IWidgetPayload[]>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await _getWidgetData(senderId, ["pressure"]);
          setLoading(false);
          setWidgetData(response.pressure?.data || []);
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(60);
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
          className="mr-4"
          alt="temp"
          width={56}
          height={56}
          src={"/assets/icons/pressure.svg"}
        />
        <div className="flex flex-col">
          <div className="text-lg font-bold dark:text-neutral-2">Pressure</div>
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
            ? widgetData[0].payload + " hPa"
            : "There is no data."}
        </div>
      )}
    </div>
  );
}
