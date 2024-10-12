import { getAllThingsServerSide } from "@/ApiCall/things";
import FilterComponent from "@/components/Filter";
import MyThingCard from "@/components/MyThingCard";
import MyThingsCreateVirtualButton from "@/components/MyThingsVirtualButton";
import SearchBar from "@/components/SearchBar";
import SortBy from "@/components/SortBy";
import Button from "@/components/UI/Button";

const backendUrl = process.env.BACKEND_URL;

async function getData() {
  const res = await getAllThingsServerSide();
  console.log("fetch things", res);
  if (res.list) return res.list;
  return [];
}

export default async function Page() {
  const data = await getData();
  console.log("data things", data);
  return (
    <div className=" flex flex-col">
      <div className="md:relative flex lg:flex-row-reverse justify-end items-center lg:items-baseline md:pr-8 px-4 md:pl-0">
        <MyThingsCreateVirtualButton className="px-2" />
        <SearchBar />
        <div className="lg:hidden">
          <FilterComponent />
        </div>
        <SortBy />
      </div>
      <div className="flex pt-4">
        <div className="flex flex-col md:flex-row flex-wrap flex-1 h-fit">
          {data.map((thing) => (
            <MyThingCard key={thing.id} thing={thing} />
          ))}
        </div>
        <div className="hidden lg:flex">
          <FilterComponent />
        </div>
      </div>
    </div>
  );
}
