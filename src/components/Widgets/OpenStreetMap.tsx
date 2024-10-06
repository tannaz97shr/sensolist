"use client";

import { _getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Spinner from "../UI/Spinner";
import RecenterMap from "../WidgetMapHelper";

interface OpenStreetMapProps {
  senderId?: string;
  name: string;
}

export default function OpenStreetMap({ senderId, name }: OpenStreetMapProps) {
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
      setSeconds(10);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderId, seconds]);

  console.log("wdg open street widget data", widgetData);

  return (
    <div className="w-full aspect-video ">
      {loading ? (
        <Spinner />
      ) : (
        widgetData && (
          <MapContainer
            className=" w-full aspect-video overflow-hidden z-0"
            center={widgetData}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={widgetData} icon={loctionIcon}></Marker>
            <RecenterMap lat={widgetData.lat} lng={widgetData.lng} />
          </MapContainer>
        )
      )}
    </div>
  );
}
