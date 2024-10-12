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
  console.log("widget container", widget);
  return (
    <>
      <FullScreen
        handle={handle}
        key={widget.widget}
        className={`relative my-full-screen-component overflow-auto shadow dark:shadow-neutral-7  h-full ${
          widget.simpleWidget ? "p-0" : "p-4"
        }`}
      >
        {editMode && (
          <div className=" absolute w-full flex items-center justify-end right-4 dark:text-neutral-3 top-2">
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              className="mr-2"
              onClick={onEditSelect}
              // className="mr-2"
            >
              <Edit className=" size-5" />
            </button>
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={onDelete}
            >
              <Trash className=" size-5" />
            </button>
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={handle.enter}
            >
              <Image
                alt="fullscreen"
                src={"/assets/fullscreen.svg"}
                className=" size-5"
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
