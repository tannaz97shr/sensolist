"use client";

import { toggleMenu } from "@/lib/features/profile/profileSlice";
import { useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomPhoneInput } from "../PhoneInput";
import ProfileUploadPhoto from "../ProfileUploadPhoto";
import Button from "../UI/Button";
import Input from "../UI/Input";

interface IEditProfileInputs {
  photo?: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export default function ProfileEditForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IEditProfileInputs>();
  const dispatch = useDispatch();

  const onSubmit: SubmitHandler<IEditProfileInputs> = (data) => {
    console.log(data);
  };
  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-[calc(100vh-164px)] md:min-h-full flex flex-col p-4"
    >
      <ProfileUploadPhoto register={register} name="photo" />
      <Input
        required
        register={register}
        name="firstName"
        label="First name"
        className="mt-8"
        error={
          errors.firstName?.type === "required" ? "This field is required" : ""
        }
      />
      <Input
        required
        register={register}
        name="lastName"
        label="Last name"
        className="mt-6"
        error={
          errors.firstName?.type === "required" ? "This field is required" : ""
        }
      />
      <Controller
        name="phoneNumber"
        control={control}
        rules={{ required: true }}
        render={({ field: { ref, ...field } }) => (
          <CustomPhoneInput
            ref={ref}
            label="Phone number"
            className="mt-6 mb-8"
            variant="simple"
            {...field}
            error={
              errors.phoneNumber?.type === "required"
                ? "This field is required"
                : ""
            }
          />
        )}
      />
      <div className="mt-auto flex flex-col lg:flex-row-reverse lg:gap-8">
        <Button type="submit" className="lg:flex-1">
          Submit
        </Button>
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            dispatch(toggleMenu({ menuOpen: true }));
            router.push("/profile");
          }}
          variant="secondary"
          className="mt-4 lg:mt-0 lg:w-1/3"
        >
          Discard
        </Button>
      </div>
    </form>
  );
}
