"use client";

import { IWidgetConfig } from "@/types/general";
import { Edit, Trash } from "iconsax-react";
import { useDispatch } from "react-redux";
import { Rnd } from "react-rnd";

interface WidgetCardContainerProps {
  children: React.ReactNode;
  editMode: boolean;
  widget: IWidgetConfig;
  dashboardId: string;
  onEditSelect: () => void;
  onDelete: () => void;
}

export default function WidgetCardContainer({
  children,
  editMode,
  onDelete,
  widget,
  dashboardId,
  onEditSelect,
}: WidgetCardContainerProps) {
  const dispatch = useDispatch();
  return (
    <Rnd
      default={{
        x: widget.position.x,
        y: widget.position.y,
        width: widget.position.width,
        height: widget.position.height,
      }}
      disableDragging={!editMode}
      enableResizing={editMode ? true : false}
      className="overflow-auto w-full bg-black-opacity-100 dark:bg-white-opacity-50 rounded-lg p-4 flex flex-col"
    >
      {editMode && (
        <div className="w-full flex items-center justify-end">
          <button onClick={onEditSelect} className="mr-2">
            <Edit className=" size-5 dark:text-white" />
          </button>
          <button onClick={onDelete}>
            <Trash className=" size-5 dark:text-white" />
          </button>
        </div>
      )}
      {children}
    </Rnd>
  );
}
