import { addNode, editNode } from "@/lib/features/applet/appletSlice";
import {
  INodeConfig,
  INodeFields,
  INodeFormData,
  ISelectOption,
} from "@/types/general";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import SelectInput from "../UI/SelectInput";
import { AppDispatch, RootState } from "@/lib/store";

interface NodeFormModalProps {
  fields: INodeFields[];
  onClose: () => void;
  appletId: string;
  open: boolean;
  title: string;
  edit?: INodeConfig;
  node?: INodeConfig | null;
}

export default function NodeFormModal({
  fields,
  onClose,
  appletId,
  open,
  title,
  edit,
  node,
}: NodeFormModalProps) {
  const dispatch = useDispatch();
  const [selectedEnums, setSelectedEnums] = useState<
    { fieldName: string; selectedEnum: ISelectOption }[]
  >([]);
  const { nodes } = useSelector((state: RootState) => state.appletSlice);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue, // Add setValue to manually set form values
  } = useForm<INodeFormData>({
    defaultValues: edit?.config,
  });

  useEffect(() => {
    reset(edit?.config || {}); // Reset the form when opening or editing
    console.log("hhhhh", edit, fields);
    setSelectedEnums(
      fields
        .filter((field) => field.enum)
        .map((field) => ({
          fieldName: field.name,
          selectedEnum: {
            title: edit?.config?.[field["name"]] || null,
            value: edit?.config?.[field["name"]] || null,
          },
        }))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, edit, fields]);
  console.log("ssssss", selectedEnums);
  const onSubmit: SubmitHandler<INodeFormData> = async (data) => {
    console.log("Submitted data:", data);
    if (edit) {
      dispatch(
        editNode({ nodeIndex: edit.nodeIndex, data: { ...edit, config: data } })
      );
    } else {
      if (node) {
        dispatch(addNode({ node: { ...node, config: data } }));
      }
    }
    reset();
    onClose();
  };

  const handleEnumChange = (fieldName: string, option: ISelectOption) => {
    setSelectedEnums((prev) =>
      prev.map((val) =>
        val.fieldName === fieldName ? { ...val, selectedEnum: option } : val
      )
    );
    setValue(fieldName, option.value); // Update form value manually
  };

  return (
    <Modal onClose={onClose} open={open}>
      <div className="border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className="capitalize font-semibold">{title}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Iterate over the fields */}
        {fields.map((field) => {
          let enumOptions: ISelectOption[] = [];

          if (field.enum) {
            // Create options from the enum values
            for (const property in field.enum) {
              enumOptions.push({
                title: field.enum[property],
                value: field.enum[property],
              });
            }
          }

          // If the field has enum options, render the SelectInput
          return field.enum ? (
            <SelectInput
              className="mt-6"
              key={field.name}
              register={register}
              name={field.name}
              label={field.title}
              options={enumOptions}
              selectedValue={
                selectedEnums?.find((val) => val.fieldName === field.name)
                  ?.selectedEnum || enumOptions[0]
              }
              setSelectedValue={(option) =>
                handleEnumChange(field.name, option)
              }
            />
          ) : (
            // If it's a normal input field, render an Input component
            <Input
              className="mt-6"
              key={field.name}
              register={register}
              value={field.name}
              required
              label={field.title}
              name={field.name}
              error={
                errors[field.name]?.type === "required"
                  ? "This field is required"
                  : ""
              }
              type={field.type === "Number" ? "number" : "text"}
            />
          );
        })}

        {/* Form buttons */}
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
            {edit ? "Edit" : "Create"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
