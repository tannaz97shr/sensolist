"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

interface OpenStreetMapProps {
  senderId?: string;
  name: string;
}

export default function OpenStreetMap({ senderId, name }: OpenStreetMapProps) {
  // todo : change type of IWidgetPayload and assign
  const [widgetData, setWidgetData] = useState<any[]>();
  const [seconds, setSeconds] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(false);
  const position = { lat: 48.71291, lng: 44.52693 };
  let loctionIcon = L.icon({ iconUrl: "/assets/location.png" });
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

  return (
    <div>
      <MapContainer
        className=" w-full aspect-video bg-error overflow-hidden"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={loctionIcon}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
      </MapContainer>
    </div>
  );
}
