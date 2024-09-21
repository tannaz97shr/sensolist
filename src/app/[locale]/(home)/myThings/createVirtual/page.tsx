"use client";

import MyThingsCreateVirtualForm from "@/components/MyThingsVirtualForm";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col max-w-[30rem] mx-auto">
        <MyThingsCreateVirtualForm onClose={() => {}} />
      </div>
    </div>
  );
}
