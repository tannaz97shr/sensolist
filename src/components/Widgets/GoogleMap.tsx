"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface GoogleMapProps {
  senderId?: string;
  name: string;
}

export default function GoogleMap({ senderId, name }: GoogleMapProps) {
  const [widgetData, setWidgetData] = useState<{ lat: number; lng: number }>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  let loctionIcon = L.icon({ iconUrl: "/assets/location.png" });
  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          setLoading(false);
          const response = await getWidgetData(senderId, [
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds]);

  return (
    <div>
      {widgetData && (
        <MapContainer
          className=" w-full aspect-video bg-error overflow-hidden"
          center={widgetData}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution="Google Maps"
            url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
          />

          <Marker position={widgetData} icon={loctionIcon}></Marker>
        </MapContainer>
      )}
    </div>
  );
}
