"use client";

import { IFile, ISelectOption } from "@/types/general";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import ImagePicker from "../DashboardCreateForm/ImagePicker";
import Button from "../UI/Button";
import Input from "../UI/Input";
import MultiSelect from "../UI/MultiSelect";

interface ICreateThingForm {
  name: string;
  charactristic: string;
  min: number;
  max: number;
  time: number;
  delay: number;
}

export default function MyThingCreateVirtual() {
  const charactristicList: ISelectOption[] = [
    {
      title: "pm1",
      value: "pm1",
    },
    {
      title: "pm2.5",
      value: "pm2.5",
    },
    {
      title: "pm4",
      value: "pm4",
    },
    {
      title: "pm10",
      value: "pm10",
    },
    {
      title: "temperature",
      value: "temperature",
    },
    {
      title: "humidity",
      value: "humidity",
    },
    {
      title: "pressure",
      value: "pressure",
    },
    {
      title: "co2",
      value: "co2",
    },
    {
      title: "vnc",
      value: "vnc",
    },
  ];
  const [selectedCharactristic, setSelectedCharactristic] = useState<
    ISelectOption[]
  >([]);

  const images: IFile[] = [
    {
      fileId: "66bbb7af6437e422855d8dc9",
      url: "https://sensolist-backend.vercel.app/api/v3/files/66bbb7af6437e422855d8dc9",
      mime: "",
    },
    {
      fileId: "66bbb7b16437e422855d8dcc",
      url: "https://sensolist-backend.vercel.app/api/v3/files/66bbb7b16437e422855d8dcc",
      mime: "",
    },
    {
      fileId: "66bbb7b26437e422855d8dcf",
      url: "https://sensolist-backend.vercel.app/api/v3/files/66bbb7b26437e422855d8dcf",
      mime: "",
    },
    {
      fileId: "66bbb7b26437e422855d8dd3",
      url: "https://sensolist-backend.vercel.app/api/v3/files/66bbb7b26437e422855d8dd3",
      mime: "",
    },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0].fileId);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateThingForm>();

  const onSubmit: SubmitHandler<ICreateThingForm> = async (data) => {
    console.log("on submit data");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="font-bold mb-4 dark:text-white">Thing information</div>
      <div className=" rounded-lg bg-black-opacity-100 dark:bg-white-opacity-200 p-2">
        <Input
          required
          error={
            errors.name?.type === "required" ? "This field is required" : ""
          }
          placeholder="Name"
          label="Thing name"
          register={register}
          name="name"
        />
        <MultiSelect
          className="mt-6"
          //   register={register}
          //   name="charactristic"
          label="charactristic"
          options={charactristicList}
          selectedValues={selectedCharactristic || []}
          setSelectedValues={setSelectedCharactristic}
        />
      </div>
      <div className="font-bold mb-4 mt-6 dark:text-white">Sensor Data</div>
      <div className=" rounded-lg bg-black-opacity-100 dark:bg-white-opacity-200 p-2">
        <Input
          required
          error={errors.min?.type === "required" ? "required" : ""}
          label="min"
          register={register}
          name="min"
          type="number"
        />
        <Input
          className="mt-6"
          required
          error={errors.max?.type === "required" ? "required" : ""}
          label="max"
          register={register}
          name="min"
          type="number"
        />
        <Input
          className="mt-6"
          required
          error={errors.time?.type === "required" ? "required" : ""}
          label="time"
          register={register}
          name="time"
          type="number"
        />
        <Input
          className="mt-6"
          required
          error={errors.delay?.type === "required" ? "required" : ""}
          label="delay"
          register={register}
          name="delay"
          type="number"
        />
      </div>
      <div className="font-bold mb-4 dark:text-white mt-6">Images</div>
      <div className=" rounded-lg bg-black-opacity-100 dark:bg-white-opacity-200 p-2">
        {images && (
          <div className="relative flex flex-wrap gap-4 mt-3">
            {images.map((img) => (
              <div
                onClick={() => {
                  setSelectedImage(img.fileId);
                }}
                className={`relative w-[57px] h-[57px] cursor-pointer 
                    bg-neutral-2 rounded-md ${
                      selectedImage === img.fileId &&
                      "border-2 border-secondary-main"
                    }`}
                key={img.fileId}
              >
                <Image alt="image" fill src={img.url} />
              </div>
            ))}
            <ImagePicker
              selectedImage={selectedImage}
              register={register}
              name="image"
              label="Image"
              setImage={(img: string) => {
                setSelectedImage(img);
              }}
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={(event: React.MouseEvent<HTMLElement>) => {
            event.preventDefault();
            reset();
          }}
          className="w-[36%]"
          variant="secondary"
        >
          Cancel
        </Button>
        <Button className="w-[64%]" type="submit">
          create
        </Button>
      </div>
    </form>
  );
}
