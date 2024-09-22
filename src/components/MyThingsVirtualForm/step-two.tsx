import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormControls, FormStepProps, VirtualFormState } from ".";
import FormCharacteristicsDropdown from "./FormCharacteristicsDropdown";

export function FormStepTwo(props: FormStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VirtualFormState>({
    values: props.state,
  });
  console.log(props.state);

  function onSubmit(data: VirtualFormState) {
    console.log("step two data", data);
    props.setFormState(data);
    props.nextStep?.();
  }

  const [valueType, setValueType] = useState("1");
  console.log("value type", valueType);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
      <RadioGroup value={valueType} onChange={(e, v) => setValueType(v)}>
        <FormControlLabel
          className=" dark:text-white"
          control={
            <Radio
              className="aria-checked:!text-secondary-main !text-neutral-6 aria-disabled:!text-neutral-7"
              value="1"
              title="1234"
              aria-checked={valueType == "1"}
            />
          }
          label="Default data"
        />
        <FormControlLabel
          className=" dark:text-white"
          control={
            <Radio
              className="aria-checked:!text-secondary-main !text-neutral-6 aria-disabled:!text-neutral-7"
              value="2"
              title="1234"
              aria-checked={valueType == "2"}
            />
          }
          label="Manual"
        />
        <div className="flex flex-col gap-4 w-full">
          {props.state.characteristics.map((characteristic, i) => (
            <FormCharacteristicsDropdown
              characterIndex={i}
              register={register}
              key={characteristic.character}
              title={characteristic.character}
              disable={valueType === "1"}
            />
          ))}
        </div>
        <FormControlLabel
          className="mt-6"
          disabled
          control={
            <Radio
              className="aria-checked:!text-secondary-main !text-neutral-6 aria-disabled:!text-neutral-7"
              value="3"
              title="1234"
              aria-disabled
              aria-checked={valueType == "3"}
            />
          }
          label={<div className="text-neutral-7">Use template</div>}
        />
      </RadioGroup>
      <FormControls {...props} />
    </form>
  );
}
