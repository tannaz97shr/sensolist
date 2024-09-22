import { getThingSensors, getThingsImages } from "@/ApiCall/things";
import { IFile, ISelectOption } from "@/types/general";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { FormControls, FormStepProps, VirtualFormState } from ".";
import ImagePicker from "../DashboardCreateForm/ImagePicker";
import Input from "../UI/Input";
import Loading from "../UI/Loading";
import MultiSelect from "../UI/MultiSelect";

export function FormStepOne(props: FormStepProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<VirtualFormState>({
    values: props.state,
  });
  const [isSensorsLoading, setSensorsLoading] = useState(true);
  const [characteristics, setCharacteristics] = useState<ISelectOption[]>([]);
  const [selectedCharactristic, setSelectedCharactristic] = useState<
    ISelectOption[]
  >([]);
  useEffect(() => {
    async function loadSensors() {
      try {
        setSensorsLoading(true);

        const sensors = (await getThingSensors()).list;
        if (sensors) {
          setCharacteristics(
            sensors.map((sensor) => ({
              title: sensor.character,
              value: JSON.stringify(sensor),
            }))
          );
          setSelectedCharactristic(
            props.state.characteristics.map((sensor) => ({
              title: sensor.character,
              value: JSON.stringify(sensor),
            }))
          );
        }
      } finally {
        setSensorsLoading(false);
      }
    }
    void loadSensors();
  }, [props.state.characteristics]);
  useEffect(() => {
    setValue(
      "characteristics",
      selectedCharactristic.map((item) => JSON.parse(item.value))
    );
  }, [selectedCharactristic, setValue]);

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

  const [selectedImage, setSelectedImage] = useState(
    props.state.image?.split("/").at(-1) ??
      props.state.image ??
      images[0].fileId
  );
  const [selectImages, setSelectImages] = useState<IFile[]>();
  const [isLoading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getThingsImages();
      setLoading(false);
      setSelectImages(res.files?.length ? res.files : []);
    };
    getData();
  }, []);

  async function onSubmit(data: VirtualFormState) {
    console.log("step one", data);
    // props.setFormState(data);
    props.setFormState({
      ...data,
      characteristics: data.characteristics.map((char) => {
        return { ...char, active: true };
      }),
    });
    props.nextStep?.();
  }

  if (isLoading || isSensorsLoading) {
    return <Loading />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 flex-1"
    >
      <Input
        required
        error={errors.name?.type === "required" ? "This field is required" : ""}
        placeholder="Name"
        label="Thing name"
        register={register}
        name="name"
      />
      <MultiSelect
        label="Characteristics"
        options={characteristics}
        selectedValues={selectedCharactristic || []}
        setSelectedValues={setSelectedCharactristic}
      />
      <div>
        <div className="mt-6 dark:text-white">Choose an image:</div>
        {selectImages && (
          <div className="relative flex flex-wrap gap-4 mt-3">
            {selectImages.map((img) => {
              return (
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
              );
            })}
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

      <FormControls {...props} />
    </form>
  );
}
