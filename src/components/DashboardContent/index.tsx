"use client";

// import { editDashboard } from "@/lib/features/dashboard/dashboardSlice";
import { IDashboard } from "@/types/general";
import { useState } from "react";
import DashboardCard from "../DashboardCard";
import DashboardCreateModal from "../DashboardCreateModal";
import DashboardEmptyState from "../DashboardEmptyState";

interface DashboardContentProps {
  dashboards: IDashboard[];
  refreshData: () => Promise<void>;
}

export default function DashboardContent({
  dashboards,
  refreshData,
}: DashboardContentProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [dashboardEdit, setDashboardEdit] = useState<IDashboard | null>(null);
  return (
    <>
      {dashboards.length ? (
        <div className="w-full pt-4 gap-4 flex flex-wrap px-4">
          {dashboards.map((dashboard: IDashboard) => (
            <DashboardCard
              refreshData={refreshData}
              key={dashboard.name}
              dashboard={dashboard}
              editDashboard={(dash: IDashboard) => {
                setDashboardEdit(dash);
              }}
            />
          ))}
        </div>
      ) : (
        <DashboardEmptyState
          setCreateOpen={() => {
            setIsCreateModalOpen(true);
          }}
        />
      )}
      <DashboardCreateModal
        refreshData={refreshData}
        dashboards={dashboards}
        isCreateModalOpen={isCreateModalOpen || !!dashboardEdit}
        setIsCreateModalOpen={(a: boolean) => setIsCreateModalOpen(a)}
        closeEditModal={() => {
          setDashboardEdit(null);
        }}
        editDashboard={(d: IDashboard) => {
          console.log("edit dashboard");
          // dispatch(editDashboard(d));
        }}
        dashboardEdit={dashboardEdit}
      />
    </>
  );
}
