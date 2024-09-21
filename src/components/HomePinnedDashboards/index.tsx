"use client";

import { getPinnedDashboards } from "@/ApiCall/dashboards";
import { IDashboard } from "@/types/general";
import { ArrowCircleRight2, Element3 } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import EmptyState from "./EmptyState";
import PinnedDashboardCard from "./PinnedDashboardCard";

export default function HomePinnedDashboardes() {
  const [pinnedDashboards, setPinnedDashboards] = useState<IDashboard[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getPinnedDashboards();
      setLoading(false);
      setPinnedDashboards(res.list || []);
    };
    getData();
  }, []);

  return (
    <div
      className="flex flex-col w-full rounded-2xl bg-black-opacity-50 dark:bg-white-opacity-50
     p-4 overflow-x-auto h-[16rem]"
    >
      <div className="flex items-center">
        <Element3 className=" text-secondary-main size-6 mr-2" />
        <span className=" text-neutral-8 capitalize dark:text-neutral-2 lg:text-lg">
          Pinned Dashboards
        </span>
      </div>
      <div className="flex mt-2 gap-4 w-fit m-auto h-3/4 min-w-full">
        {loading ? (
          <Loading />
        ) : pinnedDashboards.length ? (
          <>
            {pinnedDashboards.map((dashboard: IDashboard, i) => (
              <PinnedDashboardCard
                image={dashboard.imageURL}
                name={dashboard.name}
                id={dashboard.id}
                key={i}
              />
            ))}

            <Link
              href="/dashboards"
              className=" flex flex-col justify-center items-center ml-auto text-neutral-7 dark:text-neutral-4"
            >
              <ArrowCircleRight2 />
              <span className=" capitalize whitespace-nowrap text-sm">
                view all
              </span>
            </Link>
          </>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
