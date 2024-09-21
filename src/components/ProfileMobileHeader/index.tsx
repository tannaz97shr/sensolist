"use client";

import { ArrowLeft } from "iconsax-react";
import { usePathname } from "next/navigation";

export default function ProfileMobileHeader({
  onGoBack,
}: {
  onGoBack: () => void;
}) {
  const pathname = usePathname();
  return (
    <div className="w-full rounded-b-2xl bg-primary-tint-1 h-[80px] absolute top-[-80px] flex md:hidden z-20">
      <div className=" capitalize mx-auto text-white font-medium mt-6">
        {pathname === "/profile"
          ? "edit profile"
          : pathname === "/profile/changePassword"
          ? "change password"
          : "notifications"}
      </div>
      <button
        onClick={onGoBack}
        className=" absolute w-[40px] h-[40px] rounded-full bg-primary-tint-3 flex top-5 left-4"
      >
        <ArrowLeft className=" size-6 m-auto text-white" />
      </button>
    </div>
  );
}
