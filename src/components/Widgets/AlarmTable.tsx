import { _getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import { useEffect, useState } from "react";

interface AlarmTableProps {
  senderId?: string;
  name: string;
}

export default function AlaramTable({ senderId, name }: AlarmTableProps) {
  const [widgetData, setWidgetData] = useState<{ lat: number; lng: number }>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  let loctionIcon = L.icon({ iconUrl: "/assets/location.png" });
  useEffect(() => {
    if (seconds === 60) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          setLoading(false);
          const response = await _getWidgetData(senderId, [
            "Longitude",
            "Latitude",
          ]);
          //response.Longitude?.data[0].payload
          setWidgetData({
            lng: response.Longitude?.data[0].payload,
            lat: response.Latitude?.data[0].payload,
          });
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
  return <></>;
}
