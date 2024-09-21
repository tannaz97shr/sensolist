"use client";

import { Add, CloseCircle, Edit2, TickCircle } from "iconsax-react";
import Button from "../UI/Button";

interface DashboardHeaderProps {
  onWidgetAdd: () => void;
  isSelectOpen: boolean;
  onSave: () => Promise<void>;
  editMode: boolean;
  goToEditMode: () => void;
  onCancel: () => void;
  dashboardName?: string;
  dashboardDescription?: string;
  hasMadeChange?: boolean;
}

export default function WidgetsHeader({
  onWidgetAdd,
  isSelectOpen,
  editMode,
  onSave,
  goToEditMode,
  onCancel,
  dashboardName,
  dashboardDescription,
  hasMadeChange,
}: DashboardHeaderProps) {
  return (
    <div
      className={`w-full h-16 bg-neutral-2 shadow dark:bg-primary-tint-1 flex items-center px-6 transition-all gap-4`}
    >
      <div className="flex flex-col flex-1 min-w-0">
        <div className=" capitalize dark:text-white mr-2">{dashboardName}</div>
        <div className=" text-neutral-7 dark:text-neutral-4 mr-2 text-xs text-ellipsis w-full whitespace-nowrap overflow-hidden">
          {dashboardDescription}
        </div>
      </div>
      {editMode ? (
        <>
          <Button className="ml-auto px-4 flex-shrink-0" onClick={onWidgetAdd}>
            <Add className="md:mr-1" />
            <span className="hidden md:flex">Add widget</span>
          </Button>
          <Button
            onClick={() => {
              onCancel();
            }}
            type="button"
            className="mx-4 text-neutral-6"
            variant="text"
          >
            <CloseCircle className="mr-1" /> cancel
          </Button>
          <Button
            onClick={async (event: React.MouseEvent<HTMLElement>) => {
              await onSave();
            }}
            type="button"
            className="px-2 py-1 h-[40px]"
            variant="secondary"
            disabled={!hasMadeChange}
          >
            <TickCircle className="mr-1" /> save
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            goToEditMode();
          }}
          className="px-2 py-1 h-[40px] ml-auto flex-shrink-0"
          variant="secondary"
        >
          <Edit2 className="mr-1" /> edit
        </Button>
      )}
    </div>
  );
}
