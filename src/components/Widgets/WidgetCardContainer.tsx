"use client";

import { IWidgetConfig, IWidgetPosition } from "@/types/general";
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
  positionChange: (pos: IWidgetPosition) => void;
}

export default function WidgetCardContainer({
  children,
  editMode,
  onDelete,
  widget,
  dashboardId,
  onEditSelect,
  positionChange,
}: WidgetCardContainerProps) {
  const dispatch = useDispatch();
  return (
    <Rnd
      style={{ position: "static" }}
      default={{
        x: widget.position.x,
        y: widget.position.y,
        width: widget.position.width,
        height: widget.position.height,
      }}
      onDragStop={(_e, d) => {
        positionChange({
          x: d.x,
          y: d.y,
          height: widget.position.height,
          width: widget.position.width,
        });
      }}
      onResizeStop={(_e, _direction, ref, _delta, position) => {
        positionChange({
          x: position.x,
          y: position.y,
          height: ref.style.height,
          width: ref.style.width,
        });
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
