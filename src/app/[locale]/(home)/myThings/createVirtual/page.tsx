"use client";

import MyThingsCreateVirtualForm from "@/components/MyThingsVirtualForm";

export default function Page() {
  return (
    <div className="flex flex-col w-full lg:w-[40rem] mx-auto px-6 shadow rounded-lg pt-6 dark:shadow-neutral-5">
      <MyThingsCreateVirtualForm onClose={() => {}} />
    </div>
  );
}
