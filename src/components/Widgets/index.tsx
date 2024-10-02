"use client";

import { getSingleDashboard } from "@/ApiCall/dashboards";
import { storeWidgetsConfig } from "@/ApiCall/widgets";
import {
  emptyDraftWidget,
  removeDraftWidget,
} from "@/lib/features/dashboard/dashboardSlice";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { RootState } from "@/lib/store";
import { IDashboardDetails } from "@/types/general";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import GridLayout, {
  Layout,
  Responsive,
  WidthProvider,
} from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import { useDispatch, useSelector } from "react-redux";
import "react-resizable/css/styles.css";
import Button from "../UI/Button";
import DashboardWidgetSelect from "../WidgetSelect";
import WidgetsHeader from "../WidgetsHeader";
import Widget from "./Widget";

const ResponsiveReactGridLayout = WidthProvider(Responsive);
interface DashboardWidgetsProps {
  dashboardId: string;
}

export default function DashboardWidgets({
  dashboardId,
}: DashboardWidgetsProps) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedDashboard, setSelectedDashboard] =
    useState<IDashboardDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  const [hasChanged, setHasChanged] = useState<boolean>(false);
  const [currentLayout, setCurrentLayout] = useState<Layout[]>(
    selectedDashboard?.widgets
      .map((wdg) => wdg.layout)
      .filter((lay) => lay !== undefined) || []
  );

  const getData = async () => {
    setLoading(true);
    const res = await getSingleDashboard(dashboardId);
    setLoading(false);
    setSelectedDashboard(res.dashboard);
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardId]);

  const dispatch = useDispatch();

  const { draftWidgets } = useSelector(
    (state: RootState) => state.dashboardSlice
  );

  const onSave = async () => {
    console.log("on save", selectedDashboard, draftWidgets);
    //  inja state layout ro ezafe konam
    const res = selectedDashboard?.widgets.length
      ? await storeWidgetsConfig(
          dashboardId,
          [...selectedDashboard?.widgets, ...draftWidgets],
          currentLayout
        )
      : await storeWidgetsConfig(dashboardId, draftWidgets, currentLayout);
    if (res.statusCode < 300 && res.statusCode > 199) {
      dispatch(emptyDraftWidget());
      dispatch(createAlert({ message: "widgets saved.", type: "success" }));
      await getData();
    } else {
      dispatch(
        createAlert({
          message: res.message || "widget save error",
          type: "error",
        })
      );
    }
    setEditMode(false);
  };

  //deleting saved widgets
  const onDeleteSaved = async (index: number) => {
    // dispatch(saveDraftWidgets({ dashboardId: selectedDashboard.id }));
    const res = selectedDashboard?.widgets.length
      ? await storeWidgetsConfig(
          dashboardId,
          [
            ...selectedDashboard?.widgets.filter((_wdg, i) => i !== index),
            ...draftWidgets,
          ],
          currentLayout
        )
      : await storeWidgetsConfig(dashboardId, draftWidgets, currentLayout);

    console.log("delete saved widgets", res);
    if (res.statusCode < 300 && res.statusCode > 199) {
      dispatch(emptyDraftWidget());
      dispatch(createAlert({ message: "widgets deleted.", type: "success" }));
      await getData();
    } else {
      dispatch(
        createAlert({
          message: res.message || "widget delete error",
          type: "error",
        })
      );
    }
    setEditMode(false);
  };
  const onCancel = () => {
    dispatch(emptyDraftWidget());
    setEditMode(false);
  };
  return (
    <div className="flex flex-col h-full flex-1 relative overflow-hidden rounded-xl shadow shadow-neutral-5 bg-with-dots">
      <DashboardWidgetSelect
        refreshData={getData}
        dashboardId={dashboardId}
        onClose={() => {
          setIsSelectOpen(false);
        }}
        isOpen={isSelectOpen}
        layout={currentLayout}
      />
      <WidgetsHeader
        dashboardName={selectedDashboard?.name}
        dashboardDescription={selectedDashboard?.description}
        hasMadeChange={true}
        editMode={editMode}
        goToEditMode={() => {
          setEditMode(true);
        }}
        onSave={async () => {
          console.log("onsave");
          await onSave();
        }}
        onCancel={() => {
          onCancel();
        }}
        isSelectOpen={isSelectOpen}
        onWidgetAdd={() => {
          setIsSelectOpen(true);
        }}
      />
      <div className=" m-auto w-full flex-1 flex">
        {(selectedDashboard?.widgets?.length || 0) +
        (draftWidgets.length || 0) ? (
          <GridLayout
            className="layout bg-error"
            cols={12}
            rowHeight={20}
            width={1200}
            onLayoutChange={(newLayout: Layout[]) => {
              setCurrentLayout(newLayout);
            }}
          >
            {selectedDashboard?.widgets &&
              selectedDashboard?.widgets.map((wdg, i) => {
                // const filteredLayout = selectedDashboard.layout?.filter(
                //   (lay) => lay.i === wdg.widget
                // );
                // const widgetLayout = filteredLayout?.length
                //   ? filteredLayout[0]
                //   : { x: 4 * i, y: 0, w: 4, h: 16 };
                return (
                  <div
                    key={wdg.widget}
                    data-grid={wdg.layout || { x: 4 * i, y: 0, w: 4, h: 16 }}
                  >
                    <Widget
                      onDelete={async () => {
                        await onDeleteSaved(i);
                      }}
                      saved={true}
                      dashboardId={selectedDashboard.id}
                      editMode={editMode}
                      widget={wdg}
                      index={i}
                    />
                  </div>
                );
              })}
            {draftWidgets?.map((wdg, i) => {
              return (
                <div
                  key={wdg.widget}
                  data-grid={{ x: 4 * i, y: 0, w: 4, h: 16 }}
                >
                  <Widget
                    onDelete={() => {
                      dispatch(removeDraftWidget({ index: i }));
                    }}
                    saved={false}
                    dashboardId={dashboardId}
                    editMode={editMode}
                    key={wdg.title}
                    widget={wdg}
                    index={i}
                  />
                </div>
              );
            })}
          </GridLayout>
        ) : (
          editMode && (
            <Button
              onClick={() => {
                setIsSelectOpen(true);
              }}
              className="px-4 m-auto mt-32"
            >
              <Add className="mr-2" /> Add widget
            </Button>
          )
        )}
      </div>
    </div>
  );
}
