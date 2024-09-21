"use client";

import { RootState } from "@/lib/store";
import { _ISubWidget, ISelectOption, IThing } from "@/types/general";
import { Add, Trash } from "iconsax-react";
import { useEffect, useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import SelectInput from "../UI/SelectInput";

interface TableFormModalProps {
  open: boolean;
  onClose: () => void;
  table: { name: string; image: string } | null;
  dashboardId: string;
  onWidgetsClose: () => void;
  onAddWidget: (widget: _ISubWidget) => void;
  edit?: {
    dashboardId: string;
    widget: _ISubWidget;
    draft: boolean;
    index: number;
  };
}

interface ICreateWidgetInputs {
  title: string;
  thing: string;
  charactristic: string;
  description?: string;
  columns: { key: string; name: string }[];
}

export default function TableFormModal({
  open,
  onClose,
  table,
  dashboardId,
  onWidgetsClose,
  onAddWidget,
  edit,
}: TableFormModalProps) {
  const dispatch = useDispatch();

  const [values, setValues] = useState(edit?.widget.tableData);
  useEffect(() => {
    reset();
    setValues(edit?.widget.tableData);
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

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateWidgetInputs>({
    values: values
      ? values
      : {
          title: "",
          thing: "",
          charactristic: "",
          columns: [],
        },
  });

  const onSubmit: SubmitHandler<ICreateWidgetInputs> = (data) => {
    // if (edit) {
    //   dispatch(
    //     editWidget({
    //       dashboardId: edit.dashboardId,
    //       widget: { ...edit.widget, tableData: data },
    //       draft: edit.draft,
    //       index: edit.index,
    //     })
    //   );
    // } else {
    //   if (table) {
    //     onAddWidget({
    //       ...table,
    //       tableData: {
    //         title: data.title,
    //         thing: data.thing,
    //         charactristic: data.charactristic,
    //         description: data.description,
    //         columns: data.columns,
    //       },
    //     });
    //   }
    // }
    // reset();
    // onClose();
    // onWidgetsClose();
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "columns",
  });

  return (
    <Modal onClose={onClose} open={open}>
      <div className=" border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className=" capitalize font-semibold">{table?.name}</span>
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
          <div className="mt-6">Columns:</div>

          {fields.map((item, i) => (
            <div
              key={i}
              className="px-4 pt-4 py-6 rounded-lg bg-black-opacity-50 dark:bg-white-opacity-100 mt-4 flex gap-4 flex-wrap items-end"
            >
              <div className="w-[calc(45%-12px)]">
                <Input
                  required
                  error={
                    errors.columns?.length &&
                    errors.columns[i]?.key?.type === "required"
                      ? "required"
                      : ""
                  }
                  label="Key"
                  register={register}
                  name={`columns.${i}.key`}
                />
              </div>
              <div className="w-[calc(45%-12px)]">
                <Input
                  required
                  error={
                    errors.columns?.length &&
                    errors.columns[i]?.name?.type === "required"
                      ? "required"
                      : ""
                  }
                  label="Name"
                  register={register}
                  name={`columns.${i}.name`}
                />
              </div>
              <button
                className="w-[calc(5%-12px)] mb-4"
                onClick={(event: React.MouseEvent<HTMLElement>) => {
                  event.preventDefault();
                  remove(i);
                  // setColumnCount((prev) => prev.filter((item) => item !== col));
                }}
              >
                <Trash />
              </button>
            </div>
          ))}

          <Button
            variant="secondary"
            className="px-3 h-[40px] mt-4 text-xs"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              append({ name: "", key: "" });
              // setColumnCount((prev) => [...prev, prev[prev.length - 1] + 1]);
            }}
          >
            <Add className="size-5" />
            Add Column
          </Button>
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
                reset({
                  title: "",
                });
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
