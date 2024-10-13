"use client";

import DashboardContent from "@/components/DashboardContent";
import DashboardCreateButton from "@/components/DashboardCreateButton";
import SearchBar from "@/components/SearchBar";
import SortBy from "@/components/SortBy";
import Loading from "@/components/UI/Loading";
import {
  fetchDashboards,
  searchDashboards,
} from "@/lib/features/dashboard/dashboardSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>(); // if using custom hook, otherwise use useDispatch
  const { dashboards, loading } = useSelector(
    (state: RootState) => state.dashboardSlice
  );

  const params = useSearchParams();

  const getData = useCallback(() => {
    const search = params.get("search");
    const sort = params.get("sort");
    if (search || sort) {
      dispatch(searchDashboards({ search, sort })); // Dispatch the searchDashboards thunk
    } else {
      dispatch(fetchDashboards()); // Dispatch the fetchDashboards thunk
    }
  }, [params, dispatch]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className=" flex flex-col">
      <div className="md:relative flex flex-row-reverse justify-end gap-4 px-4">
        <DashboardCreateButton
          dashboards={dashboards || []}
          refreshData={getData}
        />
        <SortBy />
        <SearchBar />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <DashboardContent dashboards={dashboards || []} refreshData={getData} />
      )}
    </div>
  );
}
