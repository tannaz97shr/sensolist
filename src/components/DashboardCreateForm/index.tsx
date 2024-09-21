"use client";

import {
  editDashboardData,
  getDashboardImages,
  postDashboardData,
} from "@/ApiCall/dashboards";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import {
  ICreateDashboardInputs,
  IDashboard,
  IFile,
  ISelectOption,
} from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Loading from "../UI/Loading";
import MultiSelect from "../UI/MultiSelect";
import ImagePicker from "./ImagePicker";
import { useFetchUsersQuery } from "@/lib/features/api/usersSlice";

export default function DashboardCreateForm({
  onCancel,
  initialValues,
  edit,
  open,
  refreshData,
}: {
  onCancel: () => void;
  initialValues?: IDashboard | null;
  edit: IDashboard | null;
  open: boolean;
  refreshData: () => Promise<void>;
}) {
  const [selectImages, setSelectImages] = useState<IFile[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getDashboardImages();
      setLoading(false);
      setSelectImages(res.files?.length ? res.files : []);
    };
    getData();
  }, []);

  const { data } = useFetchUsersQuery();
  const usersList = data?.list.map((user) => ({
    title: user.username ?? `${user.firstname} ${user.lastname}` ?? user.id,
    value: user.id,
  }));

  const [values, setValues] = useState(
    edit
      ? {
          name: edit.name,
          description: edit.description,
          image: edit.imageURL || "",
        }
      : undefined,
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateDashboardInputs>({
    values: values
      ? values
      : {
          name: "",
          description: "",
          image: "",
        },
  });

  useEffect(() => {
    reset();
    setSelectedUsers([]);
    setValues(
      edit
        ? {
            name: edit.name,
            description: edit.description,
            image: edit.imageURL || "",
          }
        : undefined,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, edit]);

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(
    initialValues?.imageURL
      ? (initialValues?.imageURL.split("/").at(-1) ?? initialValues?.imageURL)
      : selectImages?.length
        ? selectImages[0].fileId
        : undefined,
  );
  useEffect(() => {
    setSelectedImage(
      initialValues?.imageURL
        ? (initialValues?.imageURL.split("/").at(-1) ?? initialValues?.imageURL)
        : selectImages?.length
          ? selectImages[0].fileId
          : "",
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.imageURL, selectImages, open]);

  const [selectedUsers, setSelectedUsers] = useState<ISelectOption[]>([]);
  useEffect(() => {
    if (initialValues?.assignedUsers?.length) {
      console.log("initialValues", initialValues);
      setSelectedUsers(
        initialValues?.assignedUsers.map((user) => ({
          value: user.id,
          title:
            `${user.firstname} ${user.lastname}` ?? user.username ?? user.id,
        })),
      );
    } else {
      console.log("initialValues", initialValues);
    }
  }, [initialValues]);

  const onSubmit: SubmitHandler<ICreateDashboardInputs> = async (data) => {
    if (edit) {
      setFormLoading(true);
      const res = await editDashboardData(
        edit.id,
        data.name,
        data.description,
        selectedUsers.map((option) => option.value),
        selectedImage || "",
      );
      setFormLoading(false);

      if (res.statusCode > 199 && res.statusCode < 300) {
        dispatch(
          createAlert({ message: "dashboard edited.", type: "success" }),
        );
      } else {
        dispatch(
          createAlert({ message: "dashboard edit failed", type: "error" }),
        );
      }
    } else {
      setFormLoading(true);
      const res = await postDashboardData(
        data.name,
        data.description,
        selectedUsers.map((option) => option.value),
        selectedImage || "",
      );
      setFormLoading(false);
      if (res.statusCode > 199 && res.statusCode < 300) {
        dispatch(createAlert({ message: "dashboard added.", type: "success" }));
      } else {
        dispatch(
          createAlert({ message: "dashboard save failed", type: "error" }),
        );
      }
    }

    await refreshData();
    reset();
    onCancel();
  };
  return (
    <>
      <div className=" text-xl text-center md:text-left capitalize">
        create dashboard
      </div>
      {loading ? (
        <Loading />
      ) : (
        <form
          className="flex flex-col h-auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            required
            initialValue={initialValues?.name}
            error={
              errors.name?.type === "required" ? "This field is required" : ""
            }
            placeholder="Title of the dashboard"
            label="Dashboard name"
            register={register}
            name="name"
            className="mt-6"
          />
          <Input
            required
            initialValue={initialValues?.description}
            error={
              errors.description?.type === "required"
                ? "This field is required"
                : ""
            }
            placeholder="Description of the dashboard"
            label="Description"
            register={register}
            name="description"
            className="mt-6"
          />
          <MultiSelect
            options={usersList ?? []}
            selectedValues={selectedUsers}
            setSelectedValues={setSelectedUsers}
            label="Assign User"
            className="mt-6"
          />
          <div className="mt-6">Choose an image:</div>
          {selectImages && (
            <div className="relative flex flex-wrap gap-4 mt-3">
              {selectImages.map((img) => (
                <div
                  onClick={() => {
                    setSelectedImage(img.fileId);
                  }}
                  className={`relative w-[57px] h-[57px] cursor-pointer 
              bg-neutral-2 rounded-md ${
                selectedImage === img.fileId && "border-2 border-secondary-main"
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

          <div className="flex items-center gap-4 mt-6">
            <Button
              onClick={(event: React.MouseEvent<HTMLElement>) => {
                event.preventDefault();
                reset();
                onCancel();
              }}
              className="w-[36%]"
              variant="secondary"
              loading={formLoading}
            >
              Cancel
            </Button>
            <Button className="w-[64%]" type="submit">
              {edit ? "edit" : "Create"}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
