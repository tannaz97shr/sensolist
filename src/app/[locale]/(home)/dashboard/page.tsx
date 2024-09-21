"use client";

import { getAllDashboard, searchDashboard } from "@/ApiCall/dashboards";
import DashboardContent from "@/components/DashboardContent";
import DashboardCreateButton from "@/components/DashboardCreateButton";
import SearchBar from "@/components/SearchBar";
import SortBy from "@/components/SortBy";
import Loading from "@/components/UI/Loading";
import { IDashboard } from "@/types/general";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Page() {
  const [dashboards, setDashboards] = useState<IDashboard[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useSearchParams();
  const getData = useCallback(async () => {
    const search = params.get("search");
    const sort = params.get("sort");

    setLoading(true);
    let fetchFn: typeof getAllDashboard;
    if (sort || search) {
      fetchFn = () => searchDashboard(search, sort);
    } else {
      fetchFn = getAllDashboard;
    }
    const res = await fetchFn();
    setLoading(false);
    setDashboards(res.list);
  }, [params]);
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
