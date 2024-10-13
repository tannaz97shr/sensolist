"use client";

import { getLastTenThings } from "@/ApiCall/things";
import { IHomeThing } from "@/types/general";
import { ArrowCircleRight2, Cpu } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../UI/Loading";
import MyThings from "./MyThingsCard";

export default function HomeMyThings() {
  // const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(false);
  const [things, setThings] = useState<IHomeThing[]>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getLastTenThings();
      setLoading(false);
      setThings(res.list?.length ? res.list : []);
    };
    getData();
  }, []);

  // const { things, loading, error } = useSelector(
  //   (state: RootState) => state.thingsSlice
  // );
  return (
    <div
      className="flex flex-col w-full rounded-2xl bg-black-opacity-50 dark:bg-primary-Shade-2
   p-4 overflow-x-auto h-[16rem]"
    >
      <div className="flex items-center">
        <Cpu className=" text-secondary-main size-6 mr-2" />
        <span className=" text-neutral-8 capitalize dark:text-neutral-2 lg:text-lg">
          My things
        </span>
      </div>
      <div className="flex mt-2 gap-4 w-fit m-auto h-3/4 min-w-full text-neutral-7 dark:text-neutral-4">
        {loading ? (
          <Loading />
        ) : things?.length ? (
          <>
            {things.slice(0, 6).map((thing) => (
              <MyThings
                id={thing.id}
                key={thing.id}
                name={thing.name}
                image={thing.imageURL}
              />
            ))}
            <Link
              href="/myThings"
              className=" flex flex-col justify-center items-center ml-auto"
            >
              <ArrowCircleRight2 />
              <span className=" capitalize whitespace-nowrap text-sm">
                view all
              </span>
            </Link>
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
