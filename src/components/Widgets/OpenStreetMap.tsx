"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import RecenterMap from "../WidgetMapHelper";
import WidgetDataContainer from "./WidgetDataContainer";

interface OpenStreetMapProps {
  senderId?: string;
  name: string;
  simple?: boolean;
}

export default function OpenStreetMap({
  senderId,
  name,
  simple,
}: OpenStreetMapProps) {
  const [widgetData, setWidgetData] = useState<{
    lat: number;
    lng: number;
  } | null>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  let loctionIcon = L.icon({ iconUrl: "/assets/location.png" });
  useEffect(() => {
    if (seconds === 60) {
      const getData = async () => {
        if (senderId) {
          setLoading(true);
          const response = await getWidgetData(
            senderId,
            ["Longitude", "Latitude"],
            1,
            1
          );
          setLoading(false);
          if (response.charactersData) {
            setWidgetData(
              response.charactersData?.length < 3
                ? {
                    lng: Number(response.charactersData[0].data[0]?.payload),
                    lat: Number(response.charactersData[1].data[0]?.payload),
                  }
                : null
            );
          }
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
    <WidgetDataContainer
      simple={simple}
      haveData={!!widgetData}
      loading={loading}
      seconds={seconds}
    >
      {widgetData && (
        <MapContainer
          className=" w-full overflow-hidden z-0 flex-1"
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
      )}
    </WidgetDataContainer>
  );
}
