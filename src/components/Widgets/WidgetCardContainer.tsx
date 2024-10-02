"use client";

import { IWidgetConfig } from "@/types/general";
import { Edit, Trash } from "iconsax-react";
import Image from "next/image";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

interface WidgetCardContainerProps {
  children: React.ReactNode;
  editMode: boolean;
  widget: IWidgetConfig;
  dashboardId: string;
  onEditSelect: () => void;
  onDelete: () => void;
  index: number;
  disableDragging: () => void;
  enableDragging: () => void;
}

export default function WidgetCardContainer({
  children,
  editMode,
  onDelete,
  widget,
  dashboardId,
  onEditSelect,
  index,
  disableDragging,
  enableDragging,
}: WidgetCardContainerProps) {
  const handle = useFullScreenHandle();

  return (
    <>
      <FullScreen
        handle={handle}
        key={widget.widget}
        className="my-full-screen-component overflow-auto bg-black-opacity-100 dark:bg-white-opacity-50 rounded-lg p-4 h-full"
      >
        {editMode && (
          <div className="w-full flex items-center justify-end">
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              className="mr-2"
              onClick={onEditSelect}
              // className="mr-2"
            >
              <Edit className=" size-5 dark:text-white" />
            </button>
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={onDelete}
            >
              <Trash className=" size-5 dark:text-white" />
            </button>
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={handle.enter}
            >
              <Image
                alt="fullscreen"
                src={"/assets/fullscreen.svg"}
                className=" size-5 dark:text-white"
                width={16}
                height={16}
              />
            </button>
          </div>
        )}
        {children}
      </FullScreen>
    </>
  );
}
