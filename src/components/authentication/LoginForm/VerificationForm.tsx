import Button from "@/components/UI/Button";
import FormError from "@/components/UI/FormError";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import VerificationInput from "react-verification-input";
import TimerCountDown from "../TimerCountdown/index.tsx";

interface VerificationFormProps {
  otpToken: string;
  getOtp: (phone: string, pass: string) => Promise<void>;
  phoneNumber: string;
  password: string;
}

export default function VerificationForm({
  otpToken,
  getOtp,
  phoneNumber,
  password,
}: VerificationFormProps) {
  const [error, setError] = useState<string>();
  const [verificationValue, setVerificationValue] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const resault = await signIn("credentials", {
      redirect: false,
      otpToken: otpToken,
      code: verificationValue,
    });
    setLoading(false);
    if (resault?.ok) {
      router.push("/");
    } else if (resault?.error) {
      dispatch(createAlert({ message: resault.error, type: "error" }));
    }
  };
  return (
    <>
      <form
        onSubmit={submitHandler}
        className=" flex flex-col items-center justify-center mt-20 h-full"
      >
        <div className="relative">
          <VerificationInput
            length={5}
            placeholder=""
            onComplete={(val) => {
              setError("");
              setVerificationValue(val);
            }}
            classNames={{
              container: "justify-between max-w-[280px] lg:max-w-[340px]",
            }}
            inputProps={{
              className: "bg-error",
            }}
          />
          {error && <FormError error="error" />}
        </div>
        <TimerCountDown
          getOtp={async () => await getOtp(phoneNumber, password)}
        />
        <Button type="submit" loading={loading} className="mt-auto w-full">
          Login
        </Button>
      </form>
    </>
  );
}
