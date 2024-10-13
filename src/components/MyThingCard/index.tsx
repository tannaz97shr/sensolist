"use client";
import { IThing } from "@/types/general";
import Image from "next/image";
import Link from "next/link";
import { Edit2, Trash } from "iconsax-react";
import { useState } from "react";
import DeleteDialog from "../UI/Dialog/DeleteDialog";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { useDispatch } from "react-redux";

interface MyThingCardProps {
  thing: IThing;
}

export default function MyThingCard({ thing }: MyThingCardProps) {
  const editHandler = () => {
    // editThing(thing);
  };
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const removeHandler = async () => {
    // const res = await deleteThing(thing.id);
    // if (res.statusCode > 199 && res.statusCode < 300) {
    //   dispatch(createAlert({ message: "thing deleted.", type: "success" }));
    // await refreshData();
    // } else {
    //   dispatch(
    //     createAlert({ message: "thing delete failed", type: "error" })
    //   );
    // }
    // await refreshData();
  };

  return (
    <>
    <div
      className="w-full md:w-[calc(50%-24px)] mx-auto md:mx-[unset] md:mr-4 lg:w-[calc(33%-24px)] xl:w-[calc(25%-24px)] 2xl:w-[calc(20%-24px)] 
      max-w-[280px] md:max-w-[unset]
       dark:shadow-white-opacity-200 shadow dark:bg-primary-Shade-2 rounded-2xl 
      overflow-hidden flex flex-col mb-4
      border-2 border-transparent transition hover:border-secondary-main hover:animate-pulse relative"
    >
      <div className="relative">
        <div className="w-full aspect-[3/2] relative">
          <Link href={`/myThings/${thing.id}`}>
            <Image src={thing.imageURL || ""} layout="fill" alt={thing.name} />
          </Link>
          <div className="absolute flex flex-col right-1.5 top-1.5 z-20 ">
            <button onClick={editHandler} className="p-1 mb-1 bg-white-opacity-200 hover:bg-secondary-main rounded-full ">
              <Edit2 className="text-neutral size-4  " />
            </button>
            <button
              className="p-1 bg-white-opacity-200 rounded-full hover:bg-secondary-main"
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
              
            >
              <Trash className=" text-neutral size-4  " />
            </button>
          </div>
        </div>
      </div>
      <Link href={`/myThings/${thing.id}`}>
      <div className="flex flex-col p-5">
        <div className=" text-neutral-8 text-sm capitalize text-start font-medium dark:text-neutral-3">
          {thing.name}
        </div>
        <div
          className="mt-[18px] text-neutral-7 text-xs dark:text-neutral-5 data-[virtual=true]:mr-12"
          data-virtual={thing.thingType === "Virtual"}
        >
          {thing.model}
        </div>
        {thing.thingType.startsWith("Virtual") && (
          <div className="mt-1 text-white absolute text-xs dark:text-primary px-1 w-fit rounded-sm bg-secondary-main right-0 bottom-0 mb-4 mr-4">
            Virtual
          </div>
        )}
      </div>
      </Link>
    </div>
  <DeleteDialog
    open={deleteDialogOpen}
    onClose={() => {
      setDeleteDialogOpen(false);
    }}
    onDelete={removeHandler}
    description={`Do you want to delete the thing named ${thing.name}?`}
  />
  </>
  );
}
