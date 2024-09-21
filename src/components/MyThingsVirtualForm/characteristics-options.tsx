"use client";
import { IThingSensor } from "@/types/general";
import Input from "../UI/Input";
import { useForm } from "react-hook-form";
import { useState } from "react";

export interface CharacteristicOptionsProps {
  sensor: IThingSensor;
  setSensorData(sensor: IThingSensor): void;
}
export function CharacteristicOptions(props: CharacteristicOptionsProps) {
  const { register, handleSubmit, getValues } = useForm({
    values: Object.fromEntries(props.sensor.dataModel ?? []),
  });
  function saveFormData(state: Record<string, string>) {
    props.setSensorData({ ...props.sensor, dataModel: Object.entries(state) });
  }
  const [isOpen, setOpen] = useState(false);
  return (
    <form
      onSubmit={handleSubmit(saveFormData)}
      className="relative w-full flex flex-col"
    >
      <button
        onClick={() => setOpen(!isOpen)}
        type="button"
        className="text-white h-10 rounded-lg border-2 text-left px-4 border-neutral-4"
      >
        {props.sensor.character}
      </button>
      {isOpen && (
        <div className="absolute top-full bg-neutral-3 z-10 px-2 pb-2 rounded">
          <Input
            onChange={() => saveFormData(getValues())}
            register={register}
            required
            name="start_time"
            type="text"
            placeholder="Start Time"
          />
          <Input
            onChange={() => saveFormData(getValues())}
            register={register}
            required
            name="end_time"
            type="text"
            placeholder="End Time"
          />
          <Input
            onChange={() => saveFormData(getValues())}
            register={register}
            required
            name="value"
            type="text"
            placeholder="Value"
          />
          <Input
            onChange={() => saveFormData(getValues())}
            register={register}
            required
            name="cv"
            type="text"
            placeholder="Coefficient of Variation (CV)"
          />
        </div>
      )}
    </form>
  );
}
