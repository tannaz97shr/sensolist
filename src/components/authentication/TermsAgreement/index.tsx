import FormError from "@/components/UI/FormError";
import { Dispatch, SetStateAction } from "react";

interface TermsAgreementProps {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
  error?: string;
}

export default function TermsAgreement({
  isChecked,
  setIsChecked,
  error,
}: TermsAgreementProps) {
  return (
    <label
      className="relative checkbox-container flex items-center 
    mt-10 text-xs"
    >
      <input
        className={isChecked ? "checked" : ""}
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev: boolean) => !prev)}
      />
      <span className="checkmark"></span>I agree to{" "}
      <span className=" underline ml-2"> terms and policies.</span>
      {error && <FormError error={error} />}
    </label>
  );
}
