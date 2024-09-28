"use client";

import { addWidgetEdit } from "@/lib/features/dashboard/dashboardSlice";
import { IWidgetConfig, IWidgetPosition } from "@/types/general";
import Image from "next/image";
import { useDispatch } from "react-redux";
import CustomBarChart from "./BarChart";
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
import WidgetCardContainer from "./WidgetCardContainer";

interface WidgetProps {
  widget: IWidgetConfig;
  editMode: boolean;
  dashboardId: string;
  saved: boolean;
  index: number;
  onDelete: () => void;
  onPositionChange: (pos: IWidgetPosition) => void;
  defaultPosition: IWidgetPosition;
}

export default function Widget({
  widget,
  editMode,
  dashboardId,
  saved,
  onDelete,
  index,
  onPositionChange,
  defaultPosition,
}: WidgetProps) {
  const dispatch = useDispatch();
  const widgetName = widget.widgetName;
  console.log("widget", widget);
  return (
    <WidgetCardContainer
      defaultPosition={defaultPosition}
      positionChange={onPositionChange}
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
    >
      <div className="mb-6 dark:text-neutral-2 capitalize font-bold">
        {widget.title}
      </div>
      <div className="mb-6 dark:text-neutral-2">
        Thing Name : {widget.thingName}
      </div>
      {/* 
      ) : widgetName === "time series" ? (
        <>
          <TimeSeriesChart
            xLabel={widget.chartData?.xAxesLabel || ""}
            title={widget.chartData?.title || ""}
            min={(widget.chartData?.yAxesMin || 0) as number}
            max={(widget.chartData?.yAxesMax || 0) as number}
          />
        </>
      ) : widgetName === "entity table" ? (
        <>
          <EntityTable data={widget.tableData} />
        </>
      ) :  */}
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
        <OutdoorTemprature name={widgetName || ""} senderId={widget.senderId} />
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
