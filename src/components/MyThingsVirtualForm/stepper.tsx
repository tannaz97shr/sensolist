export interface FormStepperProps {
  steps: {
    description: string;
    name?: string;
  }[];
  current: number;
}
export function FormStepper({ steps, current }: FormStepperProps) {
  const currentStep = steps[current];

  return (
    <div className="flex flex-col gap-10">
      <div className="text-sm dark:text-white">
        Step {current + 1}/{steps.length}:{" "}
        <span className="text-xs text-neutral-5">
          {currentStep.description}
        </span>
      </div>
      <div className="w-full flex gap-6 pt-2">
        {steps.map((_step, index) => (
          <div
            className="bg-secondary-main h-1 flex-1 rounded-sm data-[inactive=true]:bg-opacity-30"
            data-inactive={index > current}
            key={index}
          ></div>
        ))}
      </div>
    </div>
  );
}
