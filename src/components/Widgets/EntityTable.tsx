import { getTableWidgetData } from "@/ApiCall/widgets";
import { RootState } from "@/lib/store";
import { IWidgetEntityTableData } from "@/types/general";
import {
  MRT_ColumnDef,
  MRT_Table,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../UI/Spinner";

interface EntityTableProps {
  senderIdList?: string[];
  name: string;
  characteristics: string[];
  simple?: boolean;
}

export default function EntityTable({
  senderIdList,
  name,
  characteristics,
  simple,
}: EntityTableProps) {
  const [widgetData, setWidgetData] = useState<IWidgetEntityTableData[]>();
  const [seconds, setSeconds] = useState<number>(60);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    things,
    loading: thingsLoading,
    error,
  } = useSelector((state: RootState) => state.thingsSlice);

  useEffect(() => {
    if (seconds === 10) {
      const getData = async () => {
        if (senderIdList?.length) {
          setLoading(true);
          const response = await getTableWidgetData(
            senderIdList,
            characteristics
          );
          setLoading(false);
          setWidgetData(response.table);
        }
      };
      getData();
    } else if (seconds <= 0) {
      setSeconds(60);
      return;
    }

    const interval = setInterval(() => setSeconds(seconds - 1), 1000);

    return () => clearInterval(interval);
  }, [senderIdList, seconds, characteristics]);

  const columns = useMemo<MRT_ColumnDef<any>[]>(() => {
    const colData: { accessorKey: string; header: string; size: number }[] = [
      {
        accessorKey: "thingName",
        header: "Thing Name",
        size: 100,
      },
    ];
    widgetData?.forEach((wdgData) => {
      for (let item in wdgData.data) {
        if (!colData.filter((clData) => clData.accessorKey === item).length)
          colData.push({
            accessorKey: item,
            header: item,
            size: 100,
          });
      }
    });
    return colData;
  }, [widgetData]);

  const data = useMemo<{ [key: string]: string | null }[]>(() => {
    return widgetData?.length
      ? widgetData?.map((wdgData) => {
          const filteredThings = things.filter(
            (th) => th.senderId === wdgData.senderId
          );
          return {
            ...wdgData.data,
            thingName: filteredThings.length ? filteredThings[0].name : "",
          };
        })
      : [];
  }, [things, widgetData]);

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    // enableKeyboardShortcuts: false,
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mrtTheme: (theme) => ({
      baseBackgroundColor: theme.palette.background.default, //change default background color
    }),
    muiTableBodyRowProps: { hover: false },
    muiTableProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        caption: {
          captionSide: "top",
        },
      },
    },
    muiTableHeadCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
        fontStyle: "italic",
        fontWeight: "normal",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        border: "1px solid rgba(81, 81, 81, .5)",
      },
    },
  });

  return (
    <div
      className={` p-6 flex flex-col ${
        simple
          ? "min-h-[calc(100%-28px)] mt-6"
          : "min-h-[calc(100%-140px)] mt-10"
      }`}
    >
      {!widgetData ? (
        loading ? (
          <div className="flex h-full flex-1">
            <Spinner className="m-auto" />
          </div>
        ) : (
          <div className="flex h-full flex-1">
            <span className="m-auto">No Data available!</span>
          </div>
        )
      ) : (
        <MRT_Table table={table} />
      )}
      {!simple && (
        <div className=" text-neutral-7 dark:text-neutral-6 mx-auto w-fit mt-6 text-xs">
          Last Update {seconds} seconds ago
        </div>
      )}
    </div>
  );
}
