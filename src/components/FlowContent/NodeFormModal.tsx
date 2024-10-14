import { addNode, editNode } from "@/lib/features/applet/appletSlice";
import { AppDispatch } from "@/lib/store";
import {
  INodeConfig,
  INodeFields,
  INodeFormData,
  ISelectOption,
} from "@/types/general";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import SelectInput from "../UI/SelectInput";

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
  const dispatch = useDispatch<AppDispatch>();
  const [selectedEnums, setSelectedEnums] =
    useState<{ fieldName: string; selectedEnum: ISelectOption }[]>();
  // Form handling with default values set from edit config
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<INodeFormData>({
    defaultValues: edit?.config || {}, // Handle undefined with empty object fallback
  });

  // Form submission handler
  const onSubmit: SubmitHandler<INodeFormData> = (data) => {
    if (edit) {
      dispatch(
        editNode({ nodeIndex: edit.nodeIndex, data: { ...edit, config: data } })
      );
    } else if (node) {
      dispatch(addNode({ node: { ...node, config: data } }));
    }
    reset();
    onClose();
  };

  console.log("fields", fields);

  return (
    <Modal onClose={onClose} open={open}>
      <div className="border-b border-neutral-4 pb-3 text-neutral-7 dark:text-neutral-2">
        <span className="capitalize font-semibold">{title}</span>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field) => {
          let enumOptions: ISelectOption[] = [];
          if (field.enum) {
            for (const property in field.enum) {
              enumOptions.push({
                title: field.enum[property],
                value: field.enum[property],
              });
            }
          }
          return enumOptions.length ? (
            <SelectInput
              options={enumOptions}
              selectedValue={
                selectedEnums?.filter((val) => val.fieldName === field.name)[0]
                  ?.selectedEnum || enumOptions[0]
              }
              setSelectedValue={(option) => {
                setSelectedEnums((prev) =>
                  prev?.length
                    ? [
                        ...prev.filter((val) => val.fieldName !== field.name),
                        { fieldName: field.name, selectedEnum: option },
                      ]
                    : [{ fieldName: field.name, selectedEnum: option }]
                );
              }}
              register={register}
              name={field.name}
              label={field.title}
              className="mt-6"
            />
          ) : (
            <Input
              register={register}
              required
              label={field.title}
              type={field.type === "Number" ? "number" : "text"}
              name={field.name}
              error={
                errors[field.name]?.type === "required"
                  ? "This field is required"
                  : ""
              }
            />
          );
        })}
      </form>
    </Modal>
  );
}
