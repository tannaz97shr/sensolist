"use client";

import { IApplet } from "@/types/general";
import { useState } from "react";
import AppletCard from "../AppletCard";
import AppletCreateModal from "../AppletCreateModal";
import AppletEmptyState from "../AppletEmptyState";

interface AppletContentProps {
  applets: IApplet[];
  refreshData: () => Promise<void>;
}

export default function AppletContent({
  applets,
  refreshData,
}: AppletContentProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [appletEdit, setAppletEdit] = useState<IApplet | null>(null);
  console.log("applets", applets);
  return (
    <>
      {applets.length ? (
        <div className="w-full pt-4 gap-4 flex flex-wrap px-4">
          {applets.map((applet: IApplet) => (
            <AppletCard
              refreshData={refreshData}
              key={applet.name}
              applet={applet}
              editApplet={(app: IApplet) => {
                console.log("edit app", app);
                setAppletEdit(app);
              }}
            />
          ))}
        </div>
      ) : (
        <AppletEmptyState
          setCreateOpen={() => {
            setIsCreateModalOpen(true);
          }}
        />
      )}
      <AppletCreateModal
        refreshData={refreshData}
        applets={applets}
        isCreateModalOpen={isCreateModalOpen || !!appletEdit}
        setIsCreateModalOpen={(a: boolean) => setIsCreateModalOpen(a)}
        closeEditModal={() => {
          setAppletEdit(null);
        }}
        editApplet={(d: IApplet) => {
          console.log("edit applet");
        }}
        appletEdit={appletEdit}
      />
    </>
  );
}
