"use client";

import { IWidgetConfig } from "@/types/general";
import { Edit, Trash } from "iconsax-react";
import { useDispatch } from "react-redux";

interface WidgetCardContainerProps {
  children: React.ReactNode;
  editMode: boolean;
  widget: IWidgetConfig;
  dashboardId: string;
  onEditSelect: () => void;
  onDelete: () => void;
  index: number;
}

export default function WidgetCardContainer({
  children,
  editMode,
  onDelete,
  widget,
  dashboardId,
  onEditSelect,
  index,
}: WidgetCardContainerProps) {
  const dispatch = useDispatch();

  return (
    <div
      key={widget.widget}
      className="overflow-auto bg-black-opacity-100 dark:bg-white-opacity-50 rounded-lg p-4 h-full"
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
    </div>
  );
}
