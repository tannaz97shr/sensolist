"use client";

import { getPinnedApplets } from "@/ApiCall/applets";
import { IApplet } from "@/types/general";
import { ArrowCircleRight2, Setting4 } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import PinnedAppletCard from "./PinnedAppletCard";

export default function HomePinnedAppletes() {
  const [pinnedApplets, setPinnedApplets] = useState<IApplet[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getPinnedApplets();
      setLoading(false);
      setPinnedApplets(res.list || []);
    };
    getData();
  }, []);
  return (
    <div
      className="flex flex-col w-full rounded-2xl bg-black-opacity-50 dark:bg-white-opacity-50
     p-4 overflow-x-auto h-[16rem]"
    >
      <div className="flex items-center">
        <Setting4 className=" text-secondary-main size-6 mr-2" />
        <span className=" text-neutral-8 capitalize dark:text-neutral-2 lg:text-lg">
          Pinned Applets
        </span>
      </div>
      <div className="flex mt-2 gap-4 w-fit m-auto h-3/4 min-w-full text-neutral-7 dark:text-neutral-4">
        {pinnedApplets.length ? (
          <>
            {pinnedApplets.map((applet: IApplet, i) => (
              <PinnedAppletCard
                image={applet.imageURL}
                name={applet.name}
                id={applet.id}
                key={i}
              />
            ))}
            <Link
              href="/applets"
              className=" flex flex-col justify-center items-center ml-auto"
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
