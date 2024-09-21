"use client";

import { RootState } from "@/lib/store";
import { _ISubWidget, ICardData, ISelectOption, IThing } from "@/types/general";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import SelectInput from "../UI/SelectInput";

interface CardFormModalProps {
  open: boolean;
  onClose: () => void;
  chart: { name: string; image: string } | null;
  onAddWidget: (widget: _ISubWidget) => void;
  onWidgetsClose: () => void;
  edit?: {
    dashboardId: string;
    widget: _ISubWidget;
    draft: boolean;
    index: number;
  };
}

export default function ChartFormModal({
  open,
  onClose,
  chart,
  onAddWidget,
  edit,
  onWidgetsClose,
}: CardFormModalProps) {
  const unitList: ISelectOption[] = [
    {
      title: "kelvin",
      value: "kelvin",
    },
    {
      title: "celsius",
      value: "celsius",
    },
  ];

  const dispatch = useDispatch();

  const [values, setValues] = useState(edit?.widget.cardData);
  useEffect(() => {
    reset();
    setValues(edit?.widget.cardData);
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

  const [selectedCharactristic, setSelectedCharactristic] =
    useState<ISelectOption>(charactristicList[0]);

  useEffect(() => {
    setSelectedCharactristic(charactristicList[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThingOption, things]);

  const [selectedUnit, setSelectedUnit] = useState<ISelectOption>(unitList[0]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICardData>({
    values: values
      ? values
      : {
          title: "",
          thing: thingsList[0] ? thingsList[0].value : "",
          charactristic: charactristicList[0] ? charactristicList[0].value : "",
          unit: unitList[0].value,
          value: "",
        },
  });

  const onSubmit: SubmitHandler<ICardData> = (data) => {
    // if (edit) {
    //   dispatch(
    //     editWidget({
    //       dashboardId: edit.dashboardId,
    //       widget: { ...edit.widget, cardData: data },
    //       draft: edit.draft,
    //       index: edit.index,
    //     })
    //   );
    // } else {
    //   if (chart) onAddWidget({ ...chart, cardData: data });
    // }
    // reset();
    // onClose();
    // onWidgetsClose();
  };

  return (
    <Modal onClose={onClose} open={open}>
      <div className=" border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className=" capitalize font-semibold">{chart?.name}</span>
      </div>
      {loading ? (
        <div>Loading...</div>
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
          {selectedCharactristic && (
            <SelectInput
              options={charactristicList}
              selectedValue={selectedCharactristic}
              setSelectedValue={(option) => {
                setSelectedCharactristic(option);
              }}
              register={register}
              name="charactristic"
              label="Charactristic"
              className="mt-6"
            />
          )}
          <div className="px-4 pt-4 py-6 rounded-lg bg-black-opacity-50 dark:bg-white-opacity-100 mt-4 flex gap-4 items-center">
            <div className="w-3/5">
              <Input
                required
                error={
                  errors.value?.type === "required"
                    ? "This field is required"
                    : ""
                }
                label="value"
                register={register}
                name="value"
              />
            </div>
            <div className="w-2/5">
              <SelectInput
                options={unitList}
                selectedValue={selectedUnit}
                setSelectedValue={(option) => {
                  setSelectedUnit(option);
                }}
                register={register}
                name="unit"
                label="Unit"
              />
            </div>
          </div>
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
