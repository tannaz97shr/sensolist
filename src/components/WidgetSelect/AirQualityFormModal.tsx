"use client";

import { RootState } from "@/lib/store";
import {
  _ISubWidget,
  IAirQualityFormData,
  ISelectOption,
  IThing,
} from "@/types/general";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import MultiSelect from "../UI/MultiSelect";
import SelectInput from "../UI/SelectInput";

interface AirQualityFormModalProps {
  open: boolean;
  onClose: () => void;
  card: { name: string; image: string } | null;
  onWidgetsClose: () => void;
  dashboardId: string;
  onAddWidget: (widget: _ISubWidget) => void;
  edit?: {
    dashboardId: string;
    widget: _ISubWidget;
    draft: boolean;
    index: number;
  };
}

export default function AirQualityFormModal({
  open,
  onClose,
  card,
  onWidgetsClose,
  dashboardId,
  onAddWidget,
  edit,
}: AirQualityFormModalProps) {
  const units: ISelectOption[] = [
    {
      title: "aqi",
      value: "aqi",
    },
    {
      title: "ppb",
      value: "ppb",
    },
    {
      title: "ppm",
      value: "ppm",
    },
    {
      title: "µg/m³",
      value: "µg/m³",
    },
  ];

  const dispatch = useDispatch();

  const [values, setValues] = useState(edit?.widget.airQualityData);
  useEffect(() => {
    reset();
    setValues(edit?.widget.airQualityData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, edit]);

  const { things, loading, error } = useSelector(
    (state: RootState) => state.thingsSlice
  );
  const thingsList: ISelectOption[] = things.length
    ? things.map((thing) => {
        return {
          title: thing.name.charAt(0).toUpperCase() + thing.name.slice(1),
          value: thing.id,
        };
      })
    : [];

  const [selectedThingOption, setSelectedThingOption] =
    useState<ISelectOption | null>(thingsList.length ? thingsList[0] : null);

  useEffect(() => {
    setSelectedThingOption(thingsList.length ? thingsList[0] : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [things]);

  const [selectedThing, setSelectedThing] = useState<IThing>(
    [...things.filter((thing) => thing.id === selectedThingOption?.value)][0]
  );
  useEffect(() => {
    setSelectedThing(
      [...things.filter((thing) => thing.id === selectedThingOption?.value)][0]
    );
  }, [selectedThingOption, things]);

  const charactristicList: ISelectOption[] = selectedThing?.characteristics
    .length
    ? selectedThing.characteristics.map((char) => {
        return {
          title: char,
          value: char,
        };
      })
    : [];

  const [selectedcharacteristics, setSelectedcharacteristics] = useState<
    ISelectOption[]
  >([]);

  const [characteristicsError, setcharacteristicsError] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedcharacteristics([]);
    setcharacteristicsError(null);
  }, [open]);

  useEffect(() => {
    setSelectedcharacteristics([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThingOption, things]);

  const [selectedUnit, setSelectedUnit] = useState<ISelectOption>(units[0]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAirQualityFormData>({
    values: values
      ? values
      : {
          title: "",
          thing: thingsList[0] ? thingsList[0].value : "",
          unit: units[0].value,
        },
  });

  const onSubmit: SubmitHandler<IAirQualityFormData> = (data) => {
    // if (edit) {
    //   dispatch(
    //     editWidget({
    //       dashboardId: edit.dashboardId,
    //       widget: {
    //         ...edit.widget,
    //         airQualityData: {
    //           ...data,
    //           charactristic: selectedcharacteristics.map((char) => char.value),
    //           senderId: selectedThing.senderId,
    //         },
    //       },
    //       draft: edit.draft,
    //       index: edit.index,
    //     })
    //   );
    // } else {
    //   if (card)
    //     onAddWidget({
    //       ...card,
    //       airQualityData: {
    //         ...data,
    //         charactristic: selectedcharacteristics.map((char) => char.value),
    //         senderId: selectedThing.senderId,
    //       },
    //     });
    // }
    // reset();
    // onClose();
    // onWidgetsClose();
  };
  return (
    <Modal onClose={onClose} open={open}>
      <div className=" border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className=" capitalize font-semibold">{card?.name}</span>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            required
            error={
              errors.title?.type === "required" ? "This field is required" : ""
            }
            label="Title"
            register={register}
            name="title"
            className="mt-6"
          />
          {selectedThingOption && (
            <SelectInput
              options={thingsList}
              selectedValue={selectedThingOption}
              setSelectedValue={(option) => {
                setSelectedThingOption(option);
              }}
              register={register}
              name="thing"
              label="Thing"
              className="mt-6"
            />
          )}
          {charactristicList && (
            <MultiSelect
              options={charactristicList}
              selectedValues={selectedcharacteristics}
              setSelectedValues={setSelectedcharacteristics}
              label="characteristics"
              className="mt-6"
              error={characteristicsError || undefined}
            />
          )}
          <SelectInput
            options={units}
            selectedValue={selectedUnit}
            setSelectedValue={(option) => {
              setSelectedUnit(option);
            }}
            register={register}
            name="unit"
            label="unit"
            className="mt-6"
          />
          <Input
            error={
              errors.description?.type === "required"
                ? "This field is required"
                : ""
            }
            label="Description"
            register={register}
            name="description"
            className="mt-6"
          />
          <div className="flex items-center gap-4 mt-8">
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                reset();
                onClose();
              }}
              className="w-[36%]"
              variant="secondary"
            >
              Cancel
            </Button>
            <Button className="w-[64%]" type="submit">
              {edit ? "edit" : "Create"}
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
