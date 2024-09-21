import { Warning2 } from "iconsax-react";

interface FormErrorProps {
  error: string;
}

export default function FormError({ error }: FormErrorProps) {
  return (
    <div
      className="rounded text-xs text-error py-1 left-0 flex items-center whitespace-nowrap
absolute bottom-[-1.5rem]"
    >
      <Warning2 className=" size-4 mr-2" /> {error}
    </div>
  );
}
