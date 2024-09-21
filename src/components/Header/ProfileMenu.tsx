"use client";

import { toggleMenu } from "@/lib/features/profile/profileSlice";
import { Close } from "@mui/icons-material";
import { HambergerMenu } from "iconsax-react";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function ProfileMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => {
        router.push(pathname.includes("profile") ? "/" : "/profile");
        dispatch(toggleMenu({ menuOpen: true }));
      }}
      className="md:hidden mr-2"
    >
      {pathname.includes("profile") ? <Close /> : <HambergerMenu />}
    </button>
  );
}
