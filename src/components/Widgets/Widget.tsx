"use client";

import { addWidgetEdit } from "@/lib/features/dashboard/dashboardSlice";
import { IWidgetConfig } from "@/types/general";
import Image from "next/image";
import { useDispatch } from "react-redux";
import AirQualityHumidity from "./AirQualityHumidity";
import CustomBarChart from "./BarChart";
import EntityTable from "./EntityTable";
import GoogleMap from "./GoogleMap";
import HumidityCard from "./HumidityCard";
import IndoorCo2 from "./IndoorCo2";
import IndoorHumidityCard from "./IndoorHumidityCard";
import IndoorPm25 from "./IndoorPm25";
import IndoorPressureCard from "./IndoorPressureCard";
import IndoorTemprature from "./IndoorTemprature";
import CustomLineChart from "./LineChart";
import NoiseLevel from "./NoiseLevel";
import OpenStreetMap from "./OpenStreetMap";
import OutdoorCo2 from "./OutdoorCo2";
import OutdoorPm25 from "./OutdoorPm25";
import OutdoorTemprature from "./OutdoorTemprature";
import PressureCard from "./PressureCard";
import ProgressBar from "./ProgressBar";
import SpeedGuage from "./SpeedGuage";
import ValueCard from "./ValueCard";
import WidgetCardContainer from "./WidgetCardContainer";

interface WidgetProps {
  widget: IWidgetConfig;
  editMode: boolean;
  dashboardId: string;
  saved: boolean;
  index: number;
  onDelete: () => void;
  disableDragging: () => void;
  enableDragging: () => void;
}

export default function Widget({
  widget,
  editMode,
  dashboardId,
  saved,
  onDelete,
  index,
  disableDragging,
  enableDragging,
}: WidgetProps) {
  const dispatch = useDispatch();
  const widgetName = widget.widgetName;
  console.log("widget", widget);
  return (
    <WidgetCardContainer
      index={index}
      onDelete={onDelete}
      onEditSelect={() => {
        dispatch(
          addWidgetEdit({
            dashboardId: dashboardId,
            widget: widget,
            draft: !saved,
            index: index,
          })
        );
      }}
      widget={widget}
      editMode={editMode}
      dashboardId={dashboardId}
      key={widget.widget}
      disableDragging={disableDragging}
      enableDragging={enableDragging}
    >
      <div className="mb-6 dark:text-neutral-2 capitalize font-bold">
        {widget.title}
      </div>
      <div className="mb-6 dark:text-neutral-2">
        Thing Name : {widget.thingName}
      </div>
      {widgetName === "Line Chart" ? (
        <CustomLineChart
          name={widgetName || ""}
          senderId={widget.senderId}
          start={widget["start date"]}
          end={widget["end date"]}
          xLabel={widget["X Axes"].label}
          yLabel={widget["Y Axes"].label}
          title={widget.title}
          min={widget["Y Axes"].min}
          max={widget["Y Axes"].max}
          charactristics={widget.characteristics}
        />
      ) : widgetName === "Bar Chart" ? (
        <CustomBarChart
          name={widgetName || ""}
          senderId={widget.senderId}
          start={widget["start date"]}
          end={widget["end date"]}
          xLabel={widget["X Axes"].label}
          yLabel={widget["Y Axes"].label}
          title={widget.title}
          min={widget["Y Axes"].min}
          max={widget["Y Axes"].max}
          charactristics={widget.characteristics}
        />
      ) : widgetName === "Indoor Temprature Card" ? (
        <IndoorTemprature name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Outdoor Temprature Card" ? (
        <OutdoorTemprature
          name={widgetName || ""}
          senderId={widget.senderId}
          characteristics={widget.characteristics}
          range={widget["range of changes"]}
        />
      ) : widgetName === "Noise Level Card" ? (
        <NoiseLevel name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Indoor CO2 Card" ? (
        <IndoorCo2 name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Indoor PM2.5 Card" ? (
        <IndoorPm25 name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Outdoor Humidity Card" ? (
        <HumidityCard name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Pressure Card" ? (
        <PressureCard name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Outdoor CO2 Card" ? (
        <OutdoorCo2 name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Outdoor PM2.5 Card" ? (
        <OutdoorPm25 name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Indoor Humidity Card" ? (
        <IndoorHumidityCard
          name={widgetName || ""}
          senderId={widget.senderId}
        />
      ) : widgetName === "Indoor Pressure Card" ? (
        <IndoorPressureCard
          name={widgetName || ""}
          senderId={widget.senderId}
        />
      ) : widgetName === "OpenStreet Map" ? (
        <OpenStreetMap name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Google Map" ? (
        <GoogleMap name={widgetName || ""} senderId={widget.senderId} />
      ) : widgetName === "Entities table" ? (
        <EntityTable
          characteristics={widget.characteristics}
          name={widgetName || ""}
          senderIdList={widget.thingList}
        />
      ) : widgetName === "Progress bar" ? (
        <ProgressBar
          name={widgetName || ""}
          senderId={widget.senderId}
          characteristics={widget.characteristics}
          range={widget["range of changes"]}
        />
      ) : widgetName === "Value Card" ? (
        <ValueCard
          name={widgetName || ""}
          senderId={widget.senderId}
          characteristics={widget.characteristics}
        />
      ) : widgetName === "Speed gauge" ? (
        <SpeedGuage
          name={widgetName || ""}
          senderId={widget.senderId}
          characteristics={widget.characteristics}
          range={widget["range of changes"]}
        />
      ) : widgetName === "Humidity Card" ? (
        <AirQualityHumidity
          name={widgetName || ""}
          senderId={widget.senderId}
          characteristics={widget.characteristics}
          range={widget["range of changes"]}
        />
      ) : (
        <>
          <div className=" capitalize text-sm mb-2 dark:text-white">
            {widgetName || ""}
          </div>
          <div className="relative w-full aspect-square">
            {/* add widget name */}
            <Image fill src={"/assets/widgets/widget.jpg"} alt="widget name" />
          </div>
        </>
      )}
    </WidgetCardContainer>
  );
}
