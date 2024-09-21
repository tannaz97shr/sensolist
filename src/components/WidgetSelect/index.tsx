"use client";

import { getWidgetGroups } from "@/ApiCall/widgets";
import { emptyWidgetEdit } from "@/lib/features/dashboard/dashboardSlice";
import { fetchThings } from "@/lib/features/things/thingsSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { IWidget, IWidgetModalData } from "@/types/general";
import { Close } from "@mui/icons-material";
import { ArrowLeft } from "iconsax-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../UI/Loading";
import WidgetFormModal from "./WidgetFormModal";

interface DashboardWidgetSelectProps {
  isOpen: boolean;
  onClose: () => void;
  dashboardId: string;
  refreshData: () => Promise<void>;
}

export default function DashboardWidgetSelect({
  isOpen,
  onClose,
  dashboardId,
  refreshData,
}: DashboardWidgetSelectProps) {
  const [widgetGroups, setWidgetGroupss] = useState<IWidget[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGroup, setSelectedGroup] = useState<IWidget | null>();
  const [widgetModalOpen, setWidgetModalOpen] =
    useState<IWidgetModalData | null>(null);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getWidgetGroups();
      setLoading(false);
      setWidgetGroupss(res.list || []);
    };
    getData();
  }, []);

  const { widgetEdit } = useSelector(
    (state: RootState) => state.dashboardSlice
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchThings());
  }, [dispatch]);

  return (
    <>
      <div
        className={` absolute w-3/4 h-full bg-neutral-2 dark:bg-primary-Shade-1 shadow right-[-1rem] bottom-0
        flex flex-col overflow-auto z-10
          transition-all duration-500 ${!isOpen && "translate-x-[120%]"}`}
      >
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className=" bg-primary-tint-3 h-16 flex items-center p-4">
              {selectedGroup ? (
                <div className=" text-white font-semibold flex items-center">
                  <button onClick={() => setSelectedGroup(null)}>
                    <ArrowLeft className="mr-2" />
                  </button>
                  <span className=" capitalize">
                    {selectedGroup.groupName}:
                  </span>
                  <span className="ml-1">Select Widget</span>
                </div>
              ) : (
                <div className=" text-white font-semibold">
                  Select Widgets Bundle
                </div>
              )}
              <button onClick={onClose} className="ml-auto">
                <Close className=" text-white mr-4" />
              </button>
            </div>
            <div className=" flex flex-wrap gap-2 pl-2 pt-4">
              {selectedGroup
                ? selectedGroup.widgets?.map((sub) => (
                    <div
                      onClick={() => {
                        setWidgetModalOpen({
                          widgetId: sub.widgetId,
                          fields: sub.fields,
                          widgetName: sub.name,
                        });
                        // if (selectedWidget.onSelect) {
                        //   selectedWidget.onSelect(sub);
                        // }
                      }}
                      className=" bg-white dark:bg-primary-Shade-2 shadow flex flex-col 
                w-[calc(100%-8px)] md:w-[calc(33%-8px)] lg:w-[calc(25%-8px)] p-4 
                hover:shadow-neutral-6 cursor-pointer"
                      key={sub.widgetId}
                    >
                      <div className=" capitalize text-sm mb-2 dark:text-white">
                        {sub.name}
                      </div>
                      <div className="relative w-full aspect-square">
                        <Image fill src={sub.imageURL} alt="widget name" />
                      </div>
                    </div>
                  ))
                : widgetGroups?.map((gp) => (
                    <div
                      onClick={() => {
                        setSelectedGroup(gp);
                      }}
                      key={gp.groupName}
                      className=" bg-white dark:bg-primary-Shade-2 shadow-lg flex flex-col w-[calc(100%-8px)] md:w-[calc(33%-8px)] lg:w-[calc(25%-8px)] p-4 hover:shadow-neutral-6 cursor-pointer"
                    >
                      <div className=" capitalize text-sm mb-2 dark:text-white">
                        {gp.groupName}
                      </div>
                      <div className={`relative aspect-square w-full `}>
                        <Image fill src={gp.groupImageURL} alt="widget name" />
                      </div>
                    </div>
                  ))}
            </div>
          </>
        )}
      </div>
      <WidgetFormModal
        open={!!widgetModalOpen}
        onClose={() => {
          setWidgetModalOpen(null);
        }}
        onWidgetsClose={onClose}
        dashboardId={dashboardId}
        widgetId={widgetModalOpen?.widgetId || ""}
        widgetName={widgetModalOpen?.widgetName || ""}
        fields={widgetModalOpen?.fields}
      />
      <WidgetFormModal
        open={!!widgetEdit}
        onClose={() => {
          dispatch(emptyWidgetEdit());
        }}
        editValues={widgetEdit?.widget}
        onWidgetsClose={onClose}
        dashboardId={dashboardId}
        widgetId={widgetEdit?.widget.widget || ""}
        widgetName={widgetEdit?.widget.widgetName || ""}
        fields={widgetEdit?.widget.fields}
        draft={widgetEdit?.draft}
        editIndex={widgetEdit?.index}
        refreshData={refreshData}
      />
    </>
  );
}
