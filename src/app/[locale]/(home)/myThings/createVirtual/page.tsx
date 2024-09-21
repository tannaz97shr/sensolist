"use client";

import MyThingsCreateVirtualForm from "@/components/MyThingsVirtualForm";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col max-w-[50rem] mx-auto px-6">
        <MyThingsCreateVirtualForm onClose={() => {}} />
      </div>
    </div>
  );
}
