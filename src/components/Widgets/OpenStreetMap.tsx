"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import { useEffect, useState } from "react";

interface OpenStreetMapProps {
  senderId?: string;
  name: string;
}

export default function OpenStreetMap({ senderId, name }: OpenStreetMapProps) {
  // todo : change type of IWidgetPayload and assign
  const [widgetData, setWidgetData] = useState<any[]>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          setLoading(false);
          const response = await getWidgetData(senderId, [
            "longitude",
            "latitude",
          ]);
          setWidgetData(response.pm25?.data || []);
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

  console.log("open street widget", widgetData);

  return <></>;
}
