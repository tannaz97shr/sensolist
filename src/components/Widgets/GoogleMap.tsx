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
  // todo : change type of IWidgetPayload and assign
  const [widgetData, setWidgetData] = useState<{ lat: number; lng: number }>();
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
            "Longitude",
            "Latitude",
          ]);
          //response.Longitude?.data[0].payload
          setWidgetData({ lng: 0, lat: 0 });
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
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
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
