"use client";

import { getSingleDashboard } from "@/ApiCall/dashboards";
import { storeWidgetsConfig } from "@/ApiCall/widgets";
import {
  editDraftWidgetPosition,
  emptyDraftWidget,
  removeDraftWidget,
} from "@/lib/features/dashboard/dashboardSlice";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { RootState } from "@/lib/store";
import { IDashboardDetails, IWidgetPosition } from "@/types/general";
import { Add } from "iconsax-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import DashboardWidgetSelect from "../WidgetSelect";
import WidgetsHeader from "../WidgetsHeader";
import Widget from "./Widget";

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
    // dispatch(saveDraftWidgets({ dashboardId: selectedDashboard.id }));
    const res = selectedDashboard?.widgets.length
      ? await storeWidgetsConfig(dashboardId, [
          ...selectedDashboard?.widgets,
          ...draftWidgets,
        ])
      : await storeWidgetsConfig(dashboardId, draftWidgets);
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

  const allWidgets = selectedDashboard?.widgets
    ? [...selectedDashboard?.widgets, ...draftWidgets]
    : [...draftWidgets];

  const allWidgetsSortedByY = allWidgets.sort(
    (a, b) => a.position.y - b.position.y
  );

  console.log("allWidgetsSortedByY", allWidgetsSortedByY);

  //deleting saved widgets
  const onDeleteSaved = async (index: number) => {
    // dispatch(saveDraftWidgets({ dashboardId: selectedDashboard.id }));
    const res = selectedDashboard?.widgets.length
      ? await storeWidgetsConfig(dashboardId, [
          ...selectedDashboard?.widgets.filter((wdg, i) => i !== index),
          ...draftWidgets,
        ])
      : await storeWidgetsConfig(dashboardId, draftWidgets);

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
    <div className="flex flex-col h-full flex-1 relative md:pl-5 overflow-hidden">
      <DashboardWidgetSelect
        refreshData={getData}
        dashboardId={dashboardId}
        onClose={() => {
          setIsSelectOpen(false);
        }}
        isOpen={isSelectOpen}
        lastPositionY={
          allWidgetsSortedByY[allWidgetsSortedByY.length - 1]?.position.y +
          Number(
            allWidgetsSortedByY[allWidgetsSortedByY.length - 1]?.position.height
          )
        }
      />
      <WidgetsHeader
        dashboardName={selectedDashboard?.name}
        dashboardDescription={selectedDashboard?.description}
        hasMadeChange={!!draftWidgets.length || hasChanged}
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
      <div className=" m-auto w-full flex-1 p-4">
        {(selectedDashboard?.widgets?.length || 0) +
        (draftWidgets.length || 0) ? (
          <div className="w-full flex flex-wrap gap-4 overflow-auto">
            {selectedDashboard?.widgets &&
              selectedDashboard?.widgets.map((wdg, i) => (
                <Widget
                  onDelete={async () => {
                    await onDeleteSaved(i);
                  }}
                  onPositionChange={(pos: IWidgetPosition) => {
                    setHasChanged(true);
                    setSelectedDashboard({
                      ...selectedDashboard,
                      widgets: selectedDashboard.widgets.map((widget) =>
                        widget.widget === wdg.widget
                          ? { ...widget, position: pos }
                          : widget
                      ),
                    });
                  }}
                  saved={true}
                  dashboardId={selectedDashboard.id}
                  editMode={editMode}
                  key={wdg.title}
                  widget={wdg}
                  index={i}
                />
              ))}
            {draftWidgets?.map((wdg, i) => (
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
                onPositionChange={(pos: IWidgetPosition) => {
                  setHasChanged(true);
                  dispatch(
                    editDraftWidgetPosition({
                      widget: wdg.widget,
                      position: pos,
                    })
                  );
                }}
              />
            ))}
            {/* {selectedDashboard?.widgets &&
              selectedDashboard?.widgets.map((wdg, i) => (
                <Widget
                  saved={true}
                  dashboardId={selectedDashboard.id}
                  editMode={editMode}
                  key={wdg.title}
                  widget={wdg}
                  index={i}
                />
              ))} */}
          </div>
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
