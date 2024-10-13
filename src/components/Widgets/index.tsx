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
import DeleteDialog from "../UI/Dialog/DeleteDialog";
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
    (selectedDashboard?.widgets
      .map((wdg) => wdg.layout)
      .filter((lay) => lay !== undefined) as Layout[]) || []
  );
  const [isDraggable, setIsDraggable] = useState(editMode);
  const [deleteDialogIndex, setDeleteDialogIndex] = useState<number | null>(
    null
  );

  const disableDragging = () => setIsDraggable(false);
  const enableDragging = () => setIsDraggable(true);

  useEffect(() => {
    setIsDraggable(editMode);
  }, [editMode]);

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
    const widgetsWithLayout = selectedDashboard?.widgets
      ? [...selectedDashboard?.widgets, ...draftWidgets].map((wdg, i) => {
          return {
            ...wdg,
            layout: currentLayout.filter((cL) => cL.i === i.toString())[0],
          };
        })
      : draftWidgets.map((wdg, i) => {
          return {
            ...wdg,
            layout: currentLayout.filter((cL) => cL.i === i.toString())[0],
          };
        });
    const res = await storeWidgetsConfig(dashboardId, widgetsWithLayout);
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
    const widgetsWithLayout = selectedDashboard?.widgets
      ? [
          ...selectedDashboard?.widgets.filter((_wdg, i) => i !== index),
          ...draftWidgets,
        ].map((wdg, i) => {
          return {
            ...wdg,
            layout: currentLayout.filter((cL) => cL.i === i.toString())[0],
          };
        })
      : draftWidgets.map((wdg, i) => {
          return {
            ...wdg,
            layout: currentLayout.filter((cL) => cL.i === i.toString())[0],
          };
        });

    const res = await storeWidgetsConfig(dashboardId, widgetsWithLayout);

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

  const onDelete = async (i: number) => {
    console.log(" on delete index", i);
    if (selectedDashboard?.widgets) {
      if (i < selectedDashboard?.widgets.length) {
        await onDeleteSaved(i);
      } else {
        dispatch(
          removeDraftWidget({
            index: i - selectedDashboard?.widgets.length,
          })
        );
      }
    } else {
      dispatch(removeDraftWidget({ index: i }));
    }
  };
  const calcWidgetLayout = (simple: boolean, name: string, i: number) => {
    if (simple) {
      return name === "simple CO2 chart card"
        ? { x: 4 * i, y: 0, w: 4, h: 6 }
        : name === "Humidity Card"
        ? { x: 4 * i, y: 0, w: 6, h: 8 }
        : name === "Air quality index card"
        ? { x: 4 * i, y: 0, w: 6, h: 8 }
        : name === "Simple PM10 chart card"
        ? { x: 4 * i, y: 0, w: 4, h: 6 }
        : name === "Simple PM2.5 chart card"
        ? { x: 4 * i, y: 0, w: 4, h: 6 }
        : name === "Bar Chart"
        ? { x: 4 * i, y: 0, w: 8, h: 12 }
        : name === "Entities table"
        ? { x: 4 * i, y: 0, w: 8, h: 12 }
        : name === "Google Map"
        ? { x: 4 * i, y: 0, w: 6, h: 10 }
        : { x: 4 * i, y: 0, w: 8, h: 18 };
    } else {
      return name === "simple CO2 chart card"
        ? { x: 4 * i, y: 0, w: 6, h: 12 }
        : name === "Humidity Card"
        ? { x: 4 * i, y: 0, w: 6, h: 13 }
        : name === "Air quality index card"
        ? { x: 4 * i, y: 0, w: 6, h: 13 }
        : name === "Simple PM10 chart card"
        ? { x: 4 * i, y: 0, w: 6, h: 13 }
        : name === "Simple PM2.5 chart card"
        ? { x: 4 * i, y: 0, w: 6, h: 13 }
        : name === "Google Map"
        ? { x: 4 * i, y: 0, w: 6, h: 12 }
        : { x: 4 * i, y: 0, w: 8, h: 18 };
    }
  }; //"Google Map"
  return (
    <>
      <div className="flex flex-col h-full flex-1 relative overflow-hidden rounded-xl shadow shadow-neutral-5">
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
        <div className=" m-auto w-full flex-1 flex overflow-x-auto">
          {(selectedDashboard?.widgets?.length || 0) +
          (draftWidgets.length || 0) ? (
            <GridLayout
              className="layout"
              cols={24}
              rowHeight={20}
              width={1200}
              onLayoutChange={(newLayout: Layout[]) => {
                setCurrentLayout(newLayout);
              }}
              onDragStop={() => {}}
              isDraggable={isDraggable}
              isResizable={editMode}
            >
              {selectedDashboard?.widgets
                ? [...selectedDashboard?.widgets, ...draftWidgets].map(
                    (wdg, i) => {
                      return (
                        <div
                          key={i}
                          data-grid={
                            wdg.layout ||
                            calcWidgetLayout(
                              wdg.simpleWidget,
                              wdg.widgetName || "",
                              i
                            )
                          }
                          onClick={(event: React.MouseEvent<HTMLElement>) => {
                            event.stopPropagation();
                          }}
                        >
                          <Widget
                            onDelete={() => {
                              setDeleteDialogIndex(i);
                            }}
                            saved={true}
                            dashboardId={selectedDashboard.id}
                            editMode={editMode}
                            widget={wdg}
                            index={i}
                            disableDragging={disableDragging}
                            enableDragging={enableDragging}
                          />
                        </div>
                      );
                    }
                  )
                : draftWidgets?.map((wdg, i) => {
                    return (
                      <div
                        key={i}
                        data-grid={calcWidgetLayout(
                          wdg.simpleWidget,
                          wdg.widgetName || "",
                          i
                        )}
                      >
                        <Widget
                          onDelete={() => {
                            setDeleteDialogIndex(i);
                          }}
                          saved={false}
                          dashboardId={dashboardId}
                          editMode={editMode}
                          key={wdg.title}
                          widget={wdg}
                          index={i}
                          disableDragging={disableDragging}
                          enableDragging={enableDragging}
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
      <DeleteDialog
        open={!!(deleteDialogIndex !== null && deleteDialogIndex + 1)}
        onClose={() => {
          setDeleteDialogIndex(null);
        }}
        onDelete={async () => {
          if (deleteDialogIndex !== null && deleteDialogIndex + 1)
            await onDelete(deleteDialogIndex);
          setDeleteDialogIndex(null);
        }}
        description={`Are you sure you want to delete the widget?`}
      />
    </>
  );
}
