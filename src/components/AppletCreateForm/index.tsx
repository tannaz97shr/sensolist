"use client";

import {
  editAppletData,
  getAppletImages,
  postAppletData,
} from "@/ApiCall/applets";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import {
  IApplet,
  ICreateAppletInputs,
  IFile,
  ISelectOption,
} from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import ImagePicker from "../DashboardCreateForm/ImagePicker";
import Button from "../UI/Button";
import Input from "../UI/Input";
import MultiSelect from "../UI/MultiSelect";
import { useFetchUsersQuery } from "@/lib/features/api/usersSlice";

export default function AppletCreateForm({
  onCancel,
  initialValues,
  edit,
  open,
  refreshData,
}: {
  onCancel: () => void;
  initialValues?: IApplet | null;
  edit?: IApplet | null;
  open: boolean;
  refreshData: () => Promise<void>;
}) {
  const [selectImages, setSelectImages] = useState<IFile[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getAppletImages();
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
      : undefined
  );

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ICreateAppletInputs>({
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
        : undefined
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, edit]);

  const dispatch = useDispatch();

  const [selectedImage, setSelectedImage] = useState(
    initialValues?.imageURL
      ? initialValues?.imageURL
      : selectImages?.length
      ? selectImages[0].fileId
      : undefined
  );

  useEffect(() => {
    setSelectedImage(
      initialValues?.imageURL
        ? initialValues?.imageURL
        : selectImages?.length
        ? selectImages[0].fileId
        : ""
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues?.imageURL, selectImages, open]);
  console.log("edit form users", edit?.assignedUsers);
  const [selectedUsers, setSelectedUsers] = useState<ISelectOption[]>(
    edit
      ? edit.assignedUsers.map((user) => {
          console.log("map", user);
          return {
            title: user,
            value: user,
          };
        })
      : []
  );

  useEffect(() => {
    setSelectedUsers(
      edit
        ? edit.assignedUsers.map((user) => {
            console.log("map", user);
            return {
              title: user,
              value: user,
            };
          })
        : []
    );
  }, [edit]);

  useEffect(() => {
    setSelectedImage(undefined);
  }, [open]);

  const onSubmit: SubmitHandler<ICreateAppletInputs> = async (data) => {
    if (edit) {
      setFormLoading(true);
      const res = await editAppletData(
        edit.id,
        data.name,
        data.description,
        selectedUsers.map((option) => option.value),
        selectedImage || ""
      );
      setFormLoading(false);
      if (res.statusCode > 199 && res.statusCode < 300) {
        dispatch(createAlert({ message: "applet edited.", type: "success" }));
      } else {
        dispatch(createAlert({ message: "applet edit failed", type: "error" }));
      }
    } else {
      setFormLoading(true);
      const res = await postAppletData(
        data.name,
        data.description,
        selectedUsers.map((option) => option.value),
        selectedImage || ""
      );
      setFormLoading(false);
      if (res.statusCode > 199 && res.statusCode < 300) {
        dispatch(createAlert({ message: "applet added.", type: "success" }));
      } else {
        dispatch(createAlert({ message: "applet save failed", type: "error" }));
      }
    }

    await refreshData();
    reset();
    onCancel();
  };
  return (
    <>
      <div className=" text-xl text-center md:text-left capitalize">
        create applet
      </div>
      <form className="flex flex-col h-auto" onSubmit={handleSubmit(onSubmit)}>
        <Input
          required
          initialValue={initialValues?.name || ""}
          error={
            errors.name?.type === "required" ? "This field is required" : ""
          }
          placeholder="Title of the applet"
          label="Applet name"
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
          placeholder="Description of the applet"
          label="Description"
          register={register}
          name="description"
          className="mt-6"
        />

        <MultiSelect
          options={usersList}
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
          >
            Cancel
          </Button>
          <Button loading={formLoading} className="w-[64%]" type="submit">
            {edit ? "edit" : "Create"}
          </Button>
        </div>
      </form>
    </>
  );
}
