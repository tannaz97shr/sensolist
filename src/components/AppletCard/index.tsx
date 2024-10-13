"use client";

import { deleteApplet, patchPinApplet } from "@/ApiCall/applets";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { IApplet } from "@/types/general";
import { Edit2, Trash } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { PinIcon, PinnedIcon } from "../UI/Icons";
import Loading from "../UI/Loading";

interface AppletCardProps {
  applet: IApplet;
  editApplet: (d: IApplet) => void;
  refreshData: () => Promise<void>;
}

export default function AppletCard({
  applet,
  editApplet,
  refreshData,
}: AppletCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [pinLoading, setPinLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const pinHandler = async () => {
    setPinLoading(true);
    const res = await patchPinApplet(applet.id, true);
    setPinLoading(false);
    console.log("pinHandler", res);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(createAlert({ message: "applet pinned.", type: "success" }));
      await refreshData();
    } else {
      dispatch(createAlert({ message: "applet pin failed", type: "error" }));
    }
    setIsPopupOpen(false);
  };

  const unPinHandler = async () => {
    setPinLoading(true);
    const res = await patchPinApplet(applet.id, false);
    setPinLoading(false);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(createAlert({ message: "applet unpinned.", type: "success" }));
      await refreshData();
    } else {
      dispatch(createAlert({ message: "applet unpin failed", type: "error" }));
    }
    setIsPopupOpen(false);
  };

  const removeHandler = async () => {
    const res = await deleteApplet(applet.id);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(createAlert({ message: "applet deleted.", type: "success" }));
      await refreshData();
    } else {
      dispatch(createAlert({ message: "applet delete failed", type: "error" }));
    }
    await refreshData();
  };
  const editHandler = () => {
    editApplet(applet);
  };
  return (
    <>
      {/* <Loading /> */}
      {pinLoading ? <Loading /> : null}
      <div
        className={`flex bg-exteremly-light-blue dark:bg-primary 
        w-full md:w-[calc(50%-10px)] lg:w-[calc(33%-10px)] xl:w-[calc(25%-20px)] 2xl:w-[calc(20%-20px)]
        max-w-[320px] mx-auto md:mx-[unset]
    items-center p-4 rounded-2xl mb-4 ${applet.pinned ? "order-0" : "order-2"}`}
      >
        <Link
          className="flex w-[96%] items-center"
          href={`/applets/${applet.id}`}
        >
          <div className="h-[84px] w-[84px] relative">
            <Image
              alt={applet.name}
              src={applet.imageURL || "/assets/dashboard/img-1.png"}
              fill
            />
          </div>
          <div className="flex flex-col justify-between ml-2 mr-2">
            <span className=" text-black text-sm mb-4 dark:text-white capitalize truncate w-[140px]">
              {applet.name}
            </span>
            <span className=" text-neutral-7 dark:text-neutral-3 pb-2 text-xs truncate w-[140px]">
              {applet.description}
            </span>
          </div>
        </Link>
        <div className="relative w-6 mb-auto md:w-6">
          <div className="w-full flex flex-col gap-2">
            <button onClick={applet.pinned ? unPinHandler : pinHandler}>
              {applet.pinned ? (
                <PinnedIcon className="size-4" />
              ) : (
                <PinIcon className="size-4" />
              )}
            </button>
            <button onClick={editHandler}>
              <Edit2 className=" text-neutral-5 size-4" />
            </button>
            <button onClick={removeHandler}>
              <Trash className=" text-neutral-5 size-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
