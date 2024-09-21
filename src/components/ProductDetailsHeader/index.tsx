"use client";

import { ArrowLeft } from "iconsax-react";
import { useRouter } from "next/navigation";

export default function ProductDetailsHeader() {
  const router = useRouter();
  return (
    <div className="w-full rounded-b-2xl bg-primary-Shade-2 h-[80px] absolute top-[-80px] flex md:hidden z-50">
      <div className=" capitalize mx-auto text-white font-medium mt-6">
        Product’s details
      </div>
      <button
        onClick={() => {
          router.back();
        }}
        className=" absolute w-[40px] h-[40px] rounded-full bg-primary-tint-3 flex top-5 left-4"
      >
        <ArrowLeft className=" size-6 m-auto text-white" />
      </button>
    </div>
  );
}
