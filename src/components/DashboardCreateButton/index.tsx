"use client";

import { IDashboard } from "@/types/general";
import { Add, AddSquare } from "iconsax-react";
import { useState } from "react";
import DashboardCreateModal from "../DashboardCreateModal";
import Button from "../UI/Button";

interface DashboardCreateButtonProps {
  dashboards: IDashboard[];
  refreshData: () => void;
}

export default function DashboardCreateButton({
  dashboards,
  refreshData,
}: DashboardCreateButtonProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  if (!dashboards.length) return;
  return (
    <>
      <Button
        onClick={() => {
          setIsCreateModalOpen(true);
        }}
        className="w-10 h-10 md:w-fit ml-2 px-5"
      >
        <span className="flex md:hidden">
          <Add />
        </span>
        <div className="hidden md:flex items-center">
          <AddSquare className=" text-white mr-2" />
          <span className=" capitalize">Create Dashboard</span>
        </div>
      </Button>
      <DashboardCreateModal
        refreshData={refreshData}
        dashboards={dashboards}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={(a: boolean) => setIsCreateModalOpen(a)}
        closeEditModal={() => {}}
        editDashboard={() => {}}
        dashboardEdit={null}
      />
    </>
  );
}
