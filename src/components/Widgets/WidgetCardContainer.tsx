"use client";

import { IWidgetConfig } from "@/types/general";
import { Edit, Export, More, Trash } from "iconsax-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setPopupOpen(false);
      }
    };

    if (popupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupOpen]);

  return (
    <>
      <FullScreen
        handle={handle}
        key={widget.widget}
        className={`flex flex-col widget-card-container relative my-full-screen-component rounded-lg overflow-auto shadow dark:shadow-neutral-7 dark:bg-primary-Shade-2  h-full ${
          widget.simpleWidget ? "p-0 " : "p-4"
        }`}
      >
        {editMode && (
          <button
            className=" absolute right-2 dark:text-neutral-4 widget-more-icon z-20"
            onMouseDown={disableDragging}
            onMouseUp={enableDragging}
            onClick={() => {
              setPopupOpen(true);
            }}
          >
            <More />
          </button>
        )}
        {popupOpen && (
          <div
            ref={popupRef}
            className=" absolute w-fit p-2 rounded-lg bg-primary-tint-2 flex items-center justify-end right-4 dark:text-neutral-3 top-2 z-20"
          >
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              className="mr-2"
              onClick={() => {
                onEditSelect();
                setPopupOpen(false);
              }}
              // className="mr-2"
            >
              <Edit className=" size-5" />
            </button>
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={() => {
                onDelete();
                setPopupOpen(false);
              }}
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
            <button
              onMouseDown={disableDragging}
              onMouseUp={enableDragging}
              onClick={handle.enter}
            >
              <Export />
            </button>
          </div>
        )}
        {/* {editMode && (
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
        )} */}
        {children}
      </FullScreen>
    </>
  );
}
