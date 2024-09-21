"use client";

import { getThing } from "@/ApiCall/things";
import ProductDetailsContent from "@/components/ProductDetailsContent";
import ProductDetailsHeader from "@/components/ProductDetailsHeader";
import ProductDetailsGallery from "@/components/ProductDtailsGallery";
import Loading from "@/components/UI/Loading";
import { IThingDetails } from "@/types/general";
import { useEffect, useState } from "react";

export default function ProducDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const staticImages = [
    "/assets/things/1.jpg",
    "/assets/things/2.jpg",
    "/assets/things/3.jpg",
    "/assets/things/4.jpg",
  ];
  const [thing, setThing] = useState<IThingDetails>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await getThing(params.slug);
      setLoading(false);
      setThing(res.thing);
    };
    getData();
  }, [params.slug]);
  // await getData(params.slug);
  const activeDate = new Date(thing?.activition || "");
  const activeDateString = `${activeDate.getDate()}/${activeDate.getMonth()}/${activeDate.getFullYear()}`;
  return (
    <div className=" h-full overflow-auto md:overflow-visible ">
      <ProductDetailsHeader />
      {loading ? (
        <Loading />
      ) : (
        <div
          className="flex flex-col px-4 lg:flex-row md:w-fit md:mx-auto
       shadow lg:p-8 md:rounded-2xl bg-neutral-2 dark:bg-transparent md:dark:bg-primary-tint-1"
        >
          <div className=" text-lg lg:hidden mt-4 capitalize dark:text-white">
            {thing?.name}
          </div>
          <div className="lg:hidden text-xs text-neutral-7 dark:text-neutral-4 flex mt-2">
            <span className="mr-2">Activated in:</span>
            <span>{activeDateString}</span>
          </div>
          <ProductDetailsGallery images={thing?.images || []} />
          <ProductDetailsContent
            name={thing?.name || ""}
            brand={thing?.brand || ""}
            model={thing?.model || ""}
            type={thing?.type || ""}
            actions={thing?.actions.map((act) => `${act} `).toString() || ""}
            characteristics={thing?.characteristics.toString() || ""}
            activitionDate={activeDateString}
            description={thing?.description || ""}
          />
        </div>
      )}
    </div>
  );
}
