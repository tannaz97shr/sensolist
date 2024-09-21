"useClient";

import Button from "@/components/UI/Button";
import { LoginInputs } from "@/types/general";
import { ArrowRight } from "iconsax-react";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { CustomPhoneInput } from "../../PhoneInput";
import { PasswordInput } from "../../UI/PasswordInput";
import TermsAgreement from "../TermsAgreement";

interface DetailsFormProps {
  changePhoneNumber: (num: string) => void;
  changePassword: (pass: string) => void;
  getOtp: (phone: string, pass: string) => Promise<void>;
}

export default function DetailsForm({
  // goToVerification,
  changePhoneNumber,
  // setOtpToken,
  changePassword,
  getOtp,
}: DetailsFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginInputs>();

  const [termsChecked, setTermsChecked] = useState<boolean>(false);
  const [termsError, setTermsError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    if (termsChecked) {
      changePhoneNumber(data.phoneNumber);
      changePassword(data.password);
      setLoading(true);
      await getOtp(data.phoneNumber, data.password);
      setLoading(false);
    } else {
      setTermsError("Please agree with terms and policies.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mt-6 md:mt-8 lg:mt-10 h-full flex flex-col"
    >
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: true }}
        render={({ field: { ref, ...field } }) => (
          <CustomPhoneInput
            ref={ref}
            label="Phone number"
            {...field}
            error={
              errors.phoneNumber?.type === "required"
                ? "This field is required"
                : ""
            }
          />
        )}
      />
      <PasswordInput
        register={register}
        name="password"
        label="Password"
        className="mt-8"
        placeholder="Enter your password"
        error={
          errors.password?.type === "required" ? "This field is required" : ""
        }
      />
      <TermsAgreement
        error={termsError}
        setIsChecked={setTermsChecked}
        isChecked={termsChecked}
      />
      <Button loading={loading} type="submit" className="mt-auto">
        Continue
        <ArrowRight className="ml-2" />
      </Button>
    </form>
  );
}
