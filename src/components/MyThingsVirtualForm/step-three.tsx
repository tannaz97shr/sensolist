"use client";

import { createThingViaForm } from "@/ApiCall/things";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";  
import { FormControls, FormStepProps, VirtualFormState } from ".";
import { CharacteristicToggle } from "./characteristics-toggle";

export function FormStepThree(props: FormStepProps) {
  const { handleSubmit } = useForm<VirtualFormState>({
    values: props.state,
  });
  const dispatch = useDispatch();
  const router = useRouter();  

  async function onSubmit(data: VirtualFormState) {
    console.log("three data", data);
    console.log("three state", props.state);
    const result = await createThingViaForm(
      data.name,
      "Virtual Thing",
      props.state.image ?? "",
      props.state.characteristics
    );
    if (result.statusCode > 299) {
      dispatch(
        createAlert({
          message:
            result.message ?? "Something went wrong while creating virtual thing",
          type: "error",
        })
      );
      return;
    } else {
      if (result.message) {
        dispatch(
          createAlert({
            message: result.message ?? "Virtual thing created successfully!",
            type: "success",
          })
        );
        router.push("/myThings"); 
      }
    }
    props.onClose?.();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex-1 flex flex-col gap-6"
    >
      {props.state.characteristics.map((characteristic) => (
        <CharacteristicToggle
          key={characteristic.character}
          sensor={characteristic}
          setSensorData={(sensor) =>
            props.setFormState((prev) => {
              const characteristics = [...prev.characteristics];
              const index = characteristics.findIndex(
                (item) => item.character === sensor.character
              );
              characteristics[index] = sensor;

              return { ...prev, characteristics };
            })
          }
        />
      ))}
      <FormControls {...props} submitLabel="Create" />
    </form>
  );
}
