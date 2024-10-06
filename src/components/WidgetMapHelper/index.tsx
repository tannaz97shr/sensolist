import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface RecenterMapProps {
  lat: number;
  lng: number;
}

const RecenterMap = ({ lat, lng }: RecenterMapProps) => {
  const map = useMap();

  useEffect(() => {
    if (lat && lng) {
      map.setView([lat, lng], map.getZoom());
    }
  }, [lat, lng, map]);

  return null;
};
export default RecenterMap;
