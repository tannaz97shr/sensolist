import { getSingleDashboard } from "@/ApiCall/dashboards";
import { getThingsByCharacter } from "@/ApiCall/things";
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
import { ToggleSwitch } from "flowbite-react";
import { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import "react-datetime-picker/dist/DateTimePicker.css";
import { Layout } from "react-grid-layout";
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
  layout: Layout[];
  widgetImage?: string;
  defaultCharacters: string[];
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
  layout,
  widgetImage,
  defaultCharacters,
}: WidgetFormModalProps) {
  const isMultiThing = widgetName === "Entities table";
  const [selectedEnums, setSelectedEnums] = useState<
    { group: string; fieldName: string; selectedEnum: ISelectOption }[]
  >([]);

  const [thingsByCharacter, setThingsByCharacter] = useState<IThing[]>([]);
  const [thingsByCharacterLoading, setThingsByCharacterLoading] =
    useState<boolean>(false);
  const [simpleWidget, setSimpleWidget] = useState<boolean>(false);

  useEffect(() => {
    if (defaultCharacters.length) {
      const getData = async () => {
        setThingsByCharacterLoading(true);
        const res = await getThingsByCharacter(defaultCharacters);
        setThingsByCharacterLoading(false);
        setThingsByCharacter(res.list || []);
      };
      getData();
    }
  }, [defaultCharacters]);

  const { things, loading, error } = useSelector(
    (state: RootState) => state.thingsSlice
  );
  const thingsList: ISelectOption[] = defaultCharacters.length
    ? thingsByCharacter.map((thing) => {
        return {
          title: thing.name.charAt(0).toUpperCase() + thing.name.slice(1),
          value: thing.id,
        };
      })
    : things.length
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

  const charactristicList: ISelectOption[] = defaultCharacters.length
    ? defaultCharacters.map((char) => {
        return {
          title: char,
          value: char,
        };
      })
    : selectedThing?.characteristics.length
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

  const [selectedThingList, setSelectedThingList] = useState<ISelectOption[]>(
    editValues?.thingList
      ? editValues.thingList.map((thing: any) => {
          return {
            value: thing,
            title: thing,
          };
        })
      : []
  );

  const [characteristicsError, setcharacteristicsError] = useState<
    string | null
  >(null);

  const [thingListError, setThingListError] = useState<string | null>(null);

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
    setThingListError(null);
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
    if (!selectedThingList.length) {
      setThingListError(
        selectedThingList.length ? null : "Select at least one thing"
      );
    }

    if (!selectedcharacteristics.length) {
      setcharacteristicsError(
        selectedcharacteristics.length
          ? null
          : "Select at least one charactristic"
      );
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
                // thingList: selectedThingList.map((thing) => thing.value),
                thingList: things
                  .map(
                    (thing) =>
                      selectedThingList.filter(
                        (selected) => selected.value === thing.id
                      ).length && thing.senderId
                  )
                  .filter((sId) => sId !== 0),
                widget: widgetId,
                widgetName: widgetName,
                thingName: selectedThing.name,
                senderId: selectedThing.senderId,
                fields: fields,
                widgetImage: widgetImage,
                defaultCharacters: defaultCharacters,
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
                        // thingList: selectedThingList.map(
                        //   (thing) => thing.value
                        // ),
                        thingList: things
                          .map(
                            (thing) =>
                              selectedThingList.filter(
                                (selected) => selected.value === thing.id
                              ).length && thing.senderId
                          )
                          .filter((sId) => sId !== 0),
                        widget: widgetId,
                        widgetName: widgetName,
                        thingName: selectedThing.name,
                        senderId: selectedThing.senderId,
                        fields: fields,
                        widgetImage: widgetImage,
                        defaultCharacters: defaultCharacters,
                      }
                    : wdg
                )
              : savedWidgets;
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
              // thingList: selectedThingList.map((thing) => thing.value),
              thingList: things
                .map(
                  (thing) =>
                    selectedThingList.filter(
                      (selected) => selected.value === thing.id
                    ).length && thing.senderId
                )
                .filter((sId) => sId !== 0),
              widget: widgetId,
              widgetName: widgetName,
              thingName: selectedThing.name,
              senderId: selectedThing.senderId,
              fields: fields,
              widgetImage: widgetImage,
              defaultCharacters: defaultCharacters,
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

  const customTheme = {
    root: {
      base: "group flex rounded-lg focus:outline-none",
      active: {
        on: "cursor-pointer",
        off: "cursor-not-allowed opacity-50",
      },
      label:
        "ms-3 mt-0.5 text-start text-sm font-medium text-gray-900 dark:text-gray-300",
    },
    toggle: {
      base: "relative rounded-full border after:absolute after:rounded-full after:bg-white after:transition-all group-focus:ring-4 group-focus:ring-cyan-500/25",
      checked: {
        on: "after:translate-x-full after:border-white rtl:after:-translate-x-full",
        off: "border-gray-200 bg-gray-200 dark:border-gray-600 dark:bg-gray-700",
        color: {
          blue: "border-secondary-main bg-secondary-main",
        },
      },
    },
  };

  return (
    <Modal onClose={onClose} open={open}>
      <div className=" border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className=" capitalize font-semibold">{widgetName}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-6">
          <ToggleSwitch
            theme={customTheme}
            checked={simpleWidget}
            label="Simple Widget"
            onChange={setSimpleWidget}
            className="custom-switch"
          />
        </div>
        {!simpleWidget && (
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
        )}

        {!isMultiThing && selectedThingOption && (
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
        {isMultiThing && selectedThingOption && (
          <MultiSelect
            options={thingsList}
            selectedValues={selectedThingList}
            setSelectedValues={setSelectedThingList}
            label="Things"
            className="mt-6"
            error={thingListError || undefined}
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
        {!simpleWidget && (
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
        )}

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
