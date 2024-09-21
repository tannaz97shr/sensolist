"use client";

import { getOtpToken } from "@/ApiCall/authentication";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { LoginStepsType } from "@/types/general";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FormHeader from "../FormHeader";
import DetailsForm from "./DetailsForm";
import VerificationForm from "./VerificationForm";

export default function LoginForm() {
  const [formStep, setFormStep] = useState<LoginStepsType>("details");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>();

  const dispatch = useDispatch();

  const getOtp = async (phone: string, pass: string) => {
    const response = await getOtpToken(phone, pass);
    if (response.statusCode === 200) {
      setOtpToken(response.otpToken || "");
      setFormStep("verification");
    } else if (response.message) {
      dispatch(createAlert({ message: response.message, type: "error" }));
    }
  };

  return (
    <>
      <FormHeader
        title={formStep === "details" ? "Login" : "Verification Code"}
        description={
          formStep === "details"
            ? "Please enter your details."
            : `Please enter the OTP sent to ${phoneNumber}`
        }
      />
      {formStep === "details" ? (
        <DetailsForm
          changePhoneNumber={(num: string) => setPhoneNumber(num)}
          changePassword={(num: string) => setPassword(num)}
          getOtp={async (phone: string, pass: string) =>
            await getOtp(phone, pass)
          }
        />
      ) : (
        <VerificationForm
          phoneNumber={phoneNumber}
          password={password}
          getOtp={async (phone: string, pass: string) =>
            await getOtp(phone, pass)
          }
          otpToken={otpToken || ""}
        />
      )}
    </>
  );
}
