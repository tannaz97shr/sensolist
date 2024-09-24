"use client";

import { deleteDashboard, patchPinDashboard } from "@/ApiCall/dashboards";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { IDashboard } from "@/types/general";
import { Edit2, Trash } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch } from "react-redux";
import DeleteDialog from "../UI/Dialog/DeleteDialog";
import { PinIcon, PinnedIcon } from "../UI/Icons";
import Loading from "../UI/Loading";

interface DashboardCardProps {
  dashboard: IDashboard;
  editDashboard: (dash: IDashboard) => void;
  refreshData: () => Promise<void>;
}

export default function DashboardCard({
  dashboard,
  editDashboard,
  refreshData,
}: DashboardCardProps) {
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [pinLoading, setPinLoading] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const dispatch = useDispatch();

  const pinHandler = async () => {
    setPinLoading(true);
    const res = await patchPinDashboard(dashboard.id, true);
    setPinLoading(false);
    console.log("pinHandler", res);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(createAlert({ message: "dashboard pinned.", type: "success" }));
      await refreshData();
    } else {
      dispatch(createAlert({ message: "dashboard pin failed", type: "error" }));
    }
    setIsPopupOpen(false);
  };

  const unPinHandler = async () => {
    setPinLoading(true);
    const res = await patchPinDashboard(dashboard.id, false);
    setPinLoading(false);
    console.log("unPinHandler", res);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(
        createAlert({ message: "dashboard unpinned.", type: "success" })
      );
      await refreshData();
    } else {
      dispatch(
        createAlert({ message: "dashboard unpin failed", type: "error" })
      );
    }
    setIsPopupOpen(false);
  };

  const removeHandler = async () => {
    const res = await deleteDashboard(dashboard.id);
    if (res.statusCode > 199 && res.statusCode < 300) {
      dispatch(createAlert({ message: "dashboard deleted.", type: "success" }));
      await refreshData();
    } else {
      dispatch(
        createAlert({ message: "dashboard delete failed", type: "error" })
      );
    }
    await refreshData();
  };

  const editHandler = () => {
    editDashboard(dashboard);
  };

  return (
    <>
      {pinLoading ? <Loading /> : null}
      <div
        className={`flex bg-exteremly-light-blue dark:bg-primary 
        w-full md:w-[calc(50%-10px)] lg:w-[calc(33%-10px)] xl:w-[calc(25%-20px)] 2xl:w-[calc(20%-20px)]
       max-w-[320px] mx-auto md:mx-[unset]
    items-center p-4 rounded-2xl mb-4 ${
      dashboard.pinned ? "order-0" : "order-2"
    }`}
      >
        <Link
          className="flex w-[96%] items-center"
          href={`/dashboard/${dashboard.id}`}
        >
          <div className="h-[84px] w-[84px] relative">
            <Image
              alt={dashboard.name}
              src={dashboard.imageURL || "/assets/dashboard/img-1.png"}
              fill
            />
          </div>
          <div className="flex flex-col justify-between ml-2 mr-2">
            <span className=" text-black text-sm mb-4 dark:text-white capitalize truncate w-[140px]">
              {dashboard.name}
            </span>
            <span className=" text-neutral-7 dark:text-neutral-3 pb-2 text-xs truncate w-[140px]">
              {dashboard.description}
            </span>
          </div>
        </Link>
        <div className="relative w-6 mb-auto md:w-6">
          <div className="w-full flex gap-2 z-20 flex-col">
            <button
              onClick={async () => {
                if (dashboard.pinned) {
                  await unPinHandler();
                } else {
                  await pinHandler();
                }
              }}
            >
              {dashboard.pinned ? (
                <PinnedIcon className="size-4" />
              ) : (
                <PinIcon className="size-4" />
              )}
            </button>
            <button onClick={editHandler}>
              <Edit2 className=" text-neutral-5 size-4" />
            </button>
            <button
              onClick={() => {
                setDeleteDialogOpen(true);
              }}
            >
              <Trash className=" text-neutral-5 size-4" />
            </button>
          </div>
        </div>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
        }}
        onDelete={removeHandler}
        description={`Do you want to delete the dashboard named ${dashboard.name}?`}
      />
    </>
  );
}
