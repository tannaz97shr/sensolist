"use client";

import { RootState } from "@/lib/store";
import {
  _ISubWidget,
  IAlarmData,
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

interface AlarmCountFormModalProps {
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
  onWidgetsClose,
  edit,
}: AlarmCountFormModalProps) {
  const usersList: ISelectOption[] = [
    {
      title: "User 1",
      value: "user1",
    },
    {
      title: "User 2",
      value: "user2",
    },
    {
      title: "User 3",
      value: "user3",
    },
    {
      title: "User 4",
      value: "user4",
    },
  ];

  const dispatch = useDispatch();

  const [values, setValues] = useState(edit?.widget.alarmData);
  useEffect(() => {
    reset();
    setValues(edit?.widget.alarmData);
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

  const [selectedUsers, setSelectedUsers] = useState<ISelectOption[]>([]);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IAlarmData>({
    values: values
      ? values
      : {
          title: "",
          thing: thingsList[0] ? thingsList[0].value : "",
          charactristic: charactristicList[0] ? charactristicList[0].value : "",
        },
  });

  const onSubmit: SubmitHandler<IAlarmData> = (data) => {
    // if (edit) {
    //   dispatch(
    //     editWidget({
    //       dashboardId: edit.dashboardId,
    //       widget: { ...edit.widget, alarmData: data },
    //       draft: edit.draft,
    //       index: edit.index,
    //     })
    //   );
    // } else {
    //   if (chart) onAddWidget({ ...chart, alarmData: data });
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
          <MultiSelect
            options={usersList}
            selectedValues={selectedUsers}
            setSelectedValues={setSelectedUsers}
            label="Assign User"
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
