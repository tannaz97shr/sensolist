"use client";

import { getAllApplet } from "@/ApiCall/applets";
import AppletContent from "@/components/AppletContent";
import AppletCreateButton from "@/components/AppletCreateButton";
import SearchBar from "@/components/SearchBar";
import SortBy from "@/components/SortBy";
import Loading from "@/components/UI/Loading";
import { IApplet } from "@/types/general";
import { useEffect, useState } from "react";

export default function Page() {
  const [applets, setApplets] = useState<IApplet[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const getData = async () => {
    setLoading(true);
    const res = await getAllApplet();
    setLoading(false);
    setApplets(res.list);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className=" flex flex-col">
      <div className="md:relative flex flex-row-reverse justify-end gap-4 px-4">
        <AppletCreateButton applets={applets || []} refreshData={getData} />
        <SortBy />
        <SearchBar />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <AppletContent applets={applets || []} refreshData={getData} />
      )}
    </div>
  );
}
