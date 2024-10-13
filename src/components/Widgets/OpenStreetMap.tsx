"use client";

import { getWidgetData } from "@/ApiCall/widgets";
import L from "leaflet";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import Spinner from "../UI/Spinner";
import RecenterMap from "../WidgetMapHelper";

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
                    lng: Number(response.charactersData[0].data[0].payload),
                    lat: Number(response.charactersData[1].data[0].payload),
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
    <div
      className={` p-6 flex flex-col ${
        simple
          ? "min-h-[calc(100%-28px)] mt-6"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!widgetData ? (
        loading ? (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        ) : (
          <div className="flex h-full flex-1">
            <span className="m-auto">No Data available!</span>
          </div>
        )
      ) : (
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
      {!simple && (
        <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
          Last Update {seconds} seconds ago
        </div>
      )}
    </div>
  );
}
