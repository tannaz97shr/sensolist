import { Profile } from "iconsax-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";

interface ProfileUploadPhotoProps {
  name: string;
  register: UseFormRegister<any>;
}

export default function ProfileUploadPhoto({
  name,
  register,
}: ProfileUploadPhotoProps) {
  const [pickedImage, setPickedImage] = useState<any>();
  const imageInput = useRef<HTMLInputElement>(null);

  const handlePickClick = () => {
    imageInput.current?.click();
  };

  const handleImageChange = (e: { target: HTMLInputElement }) => {
    const file = e.target.files?.length && e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center">
      <input
        type="file"
        id={name}
        name={name}
        accept="image/png, image/jpeg"
        className="hidden"
        ref={imageInput}
        onChange={handleImageChange}
        {...register}
      />
      <div className="relative w-[56px] h-[56px] lg:w-[64px] lg:h-[64px] rounded-full overflow-hidden">
        {pickedImage ? (
          <Image alt={"photo"} src={pickedImage} fill />
        ) : (
          <div className="w-full h-full bg-neutral-3 dark:bg-neutral-7 flex">
            <Profile className=" size-10 text-neutral-7 dark:text-neutral-2 m-auto" />
          </div>
        )}
      </div>
      <button
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.preventDefault();
          handlePickClick();
        }}
        className="ml-4 bg-primary-tint-2 px-5 py-2.5 rounded-lg text-white text-sm"
      >
        Upload photo
      </button>
      {pickedImage && (
        <button
          onClick={() => setPickedImage(null)}
          className="ml-8 text-sm text-neutral-7 dark:text-neutral-3"
        >
          Remove photo
        </button>
      )}
    </div>
  );
}
