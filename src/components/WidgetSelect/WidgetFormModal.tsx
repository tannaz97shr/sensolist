import { getSingleDashboard } from "@/ApiCall/dashboards";
import { storeWidgetsConfig } from "@/ApiCall/widgets";
import {
  addDraftWidget,
  editDraftWidget,
} from "@/lib/features/dashboard/dashboardSlice";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { RootState } from "@/lib/store";
import {
  ISelectOption,
  IThing,
  IWidgetConfig,
  IWidgetFields,
  IWidgetFormData,
} from "@/types/general";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Datepicker from "../UI/Datepicker";
import Input from "../UI/Input";
import Loading from "../UI/Loading";
import Modal from "../UI/Modal";
import MultiSelect from "../UI/MultiSelect";
import SelectInput from "../UI/SelectInput";

interface WidgetFormModalProps {
  open: boolean;
  onClose: () => void;
  onWidgetsClose: () => void;
  dashboardId: string;
  widgetId: string;
  widgetName: string;
  fields?: IWidgetFields[];
  editValues?: IWidgetConfig;
  draft?: boolean;
  editIndex?: number;
  refreshData?: () => Promise<void>;
}

export default function WidgetFormModal({
  open,
  onClose,
  onWidgetsClose,
  dashboardId,
  widgetId,
  widgetName,
  fields,
  editValues,
  draft,
  editIndex,
  refreshData,
}: WidgetFormModalProps) {
  const [selectedEnums, setSelectedEnums] = useState<
    { group: string; fieldName: string; selectedEnum: ISelectOption }[]
  >([]);

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
  >(
    editValues?.characteristics
      ? editValues.characteristics.map((char) => {
          return {
            value: char,
            title: char,
          };
        })
      : []
  );

  const [characteristicsError, setcharacteristicsError] = useState<
    string | null
  >(null);

  useEffect(() => {
    setSelectedcharacteristics(
      editValues?.characteristics
        ? editValues.characteristics.map((char) => {
            return {
              value: char,
              title: char,
            };
          })
        : []
    );
    setcharacteristicsError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    setSelectedcharacteristics([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedThingOption, things]);

  let groupLabels: string[] = [];
  if (fields?.length) {
    fields.forEach((field) => {
      if (!groupLabels.includes(field.groupLabel))
        groupLabels.push(field.groupLabel);
    });
  }
  const groupInputs = groupLabels.map((label) => {
    return {
      label: label,
      inputs: fields?.filter((field) => field.groupLabel === label),
    };
  });
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IWidgetFormData>({
    values: editValues
      ? editValues
      : {
          title: "",
          thing: thingsList[0]?.value || "",
          characteristics: [],
          description: "",
        },
  });

  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IWidgetFormData> = async (data) => {
    console.log("on submit");
    if (!selectedcharacteristics.length) {
      setcharacteristicsError("Select at least one charactristic");
    } else {
      if (editValues) {
        if (draft && editIndex !== undefined) {
          editIndex;
          dispatch(
            editDraftWidget({
              widget: {
                ...data,
                characteristics: selectedcharacteristics.map(
                  (char) => char.value
                ),
                widget: widgetId,
                widgetName: widgetName,
                thingName: selectedThing.name,
                senderId: selectedThing.senderId,
                fields: fields,
                // inja bayad positione akharin widget mohasebe beshe
                position: {
                  x: 0,
                  y: 0,
                  width: 320,
                  height: 280,
                },
              },
              index: editIndex,
            })
          );
        } else {
          const dashboard = await getSingleDashboard(dashboardId);
          const savedWidgets = dashboard.dashboard?.widgets;
          const newWidgets =
            editIndex !== undefined
              ? savedWidgets?.map((wdg, i) =>
                  i === editIndex
                    ? {
                        ...data,
                        characteristics: selectedcharacteristics.map(
                          (char) => char.value
                        ),
                        widget: widgetId,
                        widgetName: widgetName,
                        thingName: selectedThing.name,
                        senderId: selectedThing.senderId,
                        fields: fields,
                        // inja bayad positione akharin widget mohasebe beshe
                        position: {
                          x: 0,
                          y: 0,
                          width: 320,
                          height: 280,
                        },
                      }
                    : wdg
                )
              : savedWidgets;
          console.log("on submit new widgets", newWidgets);
          const res = await storeWidgetsConfig(
            dashboardId,
            newWidgets?.length ? newWidgets : []
          );
          if (res.statusCode > 199 && res.statusCode < 300) {
            if (refreshData) await refreshData();
            dispatch(
              createAlert({ message: "Widget edited.", type: "success" })
            );
          } else {
            dispatch(
              createAlert({ message: "Widget edit failed", type: "error" })
            );
          }
        }
      } else {
        console.log("on submit data", data);
        dispatch(
          addDraftWidget({
            widget: {
              ...data,
              characteristics: selectedcharacteristics.map(
                (char) => char.value
              ),
              widget: widgetId,
              widgetName: widgetName,
              thingName: selectedThing.name,
              senderId: selectedThing.senderId,
              fields: fields,
              // inja bayad positione akharin widget mohasebe beshe
              position: {
                x: 0,
                y: 0,
                width: 320,
                height: 280,
              },
            },
          })
        );
      }
      reset();
      onClose();
      onWidgetsClose();
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Modal onClose={onClose} open={open}>
      <div className=" border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className=" capitalize font-semibold">{widgetName}</span>
      </div>
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

        {groupInputs.length
          ? groupInputs.map((input) => (
              <>
                <div className="mt-6">{input.label}</div>
                <div className="px-4 pt-4 py-6 rounded-lg bg-black-opacity-50 dark:bg-white-opacity-100 mt-4 flex gap-4 flex-wrap items-center">
                  {input.inputs?.map((field, i) => {
                    let enumOptions: ISelectOption[] = [];
                    if (field.enum) {
                      for (const property in field.enum) {
                        enumOptions.push({
                          title: field.enum[property],
                          value: field.enum[property],
                        });
                      }
                    }
                    if (field.type === "Date") {
                      return (
                        <div key={field.name} className="w-full">
                          <Datepicker
                            name={field.name}
                            label={field.name}
                            register={register}
                          />
                        </div>
                      );
                    }
                    let selectedEnum = enumOptions[0];
                    const errorGroup = errors[input.label];
                    return (
                      <div
                        className="w-full md:w-[calc(50%-12px)]"
                        key={field.name}
                      >
                        {field.type ? (
                          <Input
                            register={register}
                            required
                            label={field.name}
                            name={`${input.label}.${field.name}`}
                            error={
                              errorGroup &&
                              (errorGroup as any)[field.name]?.type ===
                                "required"
                                ? "This field is required"
                                : ""
                            }
                            // error={errors[input.label][field.name]}
                            type={field.type === "Number" ? "number" : "text"}
                          />
                        ) : field.enum ? (
                          <SelectInput
                            options={enumOptions}
                            selectedValue={
                              selectedEnums?.length
                                ? [
                                    ...selectedEnums?.filter(
                                      (val) =>
                                        val.group === field.groupLabel &&
                                        val.fieldName === field.name
                                    ),
                                  ][0]?.selectedEnum
                                : enumOptions[0]
                            }
                            setSelectedValue={(option) => {
                              setSelectedEnums((prev) =>
                                prev?.length
                                  ? [
                                      ...prev?.filter(
                                        (val) =>
                                          val.fieldName !== field.name &&
                                          val.group !== field.groupLabel
                                      ),
                                      {
                                        fieldName: field.name,
                                        group: field.groupLabel,
                                        selectedEnum: option,
                                      },
                                    ]
                                  : [
                                      {
                                        fieldName: field.name,
                                        group: field.groupLabel,
                                        selectedEnum: option,
                                      },
                                    ]
                              );
                            }}
                            register={register}
                            name={`${input.label}.${field.name}`}
                            label={field.name}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </>
            ))
          : null}
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
            {editValues ? "edit" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
