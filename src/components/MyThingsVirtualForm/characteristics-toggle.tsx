"use client";
import { IThingSensor } from "@/types/general";
import { ToggleSwitch } from "flowbite-react";

export interface CharacteristicOptionsProps {
  sensor: IThingSensor;
  setSensorData(sensor: IThingSensor): void;
}
export function CharacteristicToggle(props: CharacteristicOptionsProps) {
  return (
    <div className="flex justify-between">
      {props.sensor.character}
      <ToggleSwitch
        checked={!!props.sensor?.active}
        onChange={() =>
          props.setSensorData({ ...props.sensor, active: !props.sensor.active })
        }
      />
    </div>
  );
}
