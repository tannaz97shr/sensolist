"use client";
import { IThingSensor } from "@/types/general";
import { ArrowLeft } from "iconsax-react";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../UI/Button";
import { FormStepOne } from "./step-one";
import { FormStepThree } from "./step-three";
import { FormStepTwo } from "./step-two";
import { FormStepper } from "./stepper";

const formSteps = [
  { description: " Choose a name and an image for your new virtual thing." },
  { description: "Use a method to set data." },
  { description: "Active or inactive sensors." },
];

export interface VirtualFormState {
  name: string;
  characteristics: IThingSensor[];
  image?: string;
}

export interface FormStepProps {
  onClose(): void;
  nextStep?(): void;
  prevStep?(): void;
  setFormState: Dispatch<SetStateAction<VirtualFormState>>;
  state: VirtualFormState;
}
export interface MyThingsCreateVirtualFormProps {
  onClose(): void;
}
export default function MyThingsCreateVirtualForm({
  onClose,
}: MyThingsCreateVirtualFormProps) {
  const [formState, setFormState] = useState<VirtualFormState>({
    characteristics: [],
    name: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="flex flex-col gap-10 h-full">
      <div className="font-bold text-lg text-center md:text-left capitalize dark:text-white">
        create virtual
      </div>
      <FormStepper steps={formSteps} current={currentStep} />
      {currentStep == 0 && (
        <FormStepOne
          nextStep={
            currentStep < formSteps.length
              ? () => setCurrentStep((prev) => prev + 1)
              : undefined
          }
          prevStep={
            currentStep > 0
              ? () => setCurrentStep((prev) => prev - 1)
              : undefined
          }
          setFormState={setFormState}
          state={formState}
          onClose={onClose}
        />
      )}
      {currentStep == 1 && (
        <FormStepTwo
          nextStep={
            currentStep < formSteps.length
              ? () => setCurrentStep((prev) => prev + 1)
              : undefined
          }
          prevStep={
            currentStep > 0
              ? () => setCurrentStep((prev) => prev - 1)
              : undefined
          }
          setFormState={setFormState}
          state={formState}
          onClose={onClose}
        />
      )}
      {currentStep == 2 && (
        <FormStepThree
          nextStep={
            currentStep < formSteps.length
              ? () => setCurrentStep((prev) => prev + 1)
              : undefined
          }
          prevStep={
            currentStep > 0
              ? () => setCurrentStep((prev) => prev - 1)
              : undefined
          }
          setFormState={setFormState}
          state={formState}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export interface FormControlsProps {
  onClose(): void;
  prevStep?(): void;
  submitLabel?: string;
}
export function FormControls(props: FormControlsProps) {
  return (
    <div className="flex justify-between mt-auto pb-10">
      <Button
        variant="text"
        className="text-neutral-6 lg:px-6"
        type="button"
        onClick={props.onClose}
      >
        Cancel
      </Button>
      <div className="flex gap-4">
        {!!props.prevStep && (
          <Button
            onClick={props.prevStep}
            className="px-6 text-neutral-6"
            variant="secondary"
            type="button"
          >
            <ArrowLeft className=" size-5 mr-2" />
            Go Back
          </Button>
        )}
        <Button className="px-6">{props.submitLabel ?? "Nexte step"}</Button>
      </div>
    </div>
  );
}
