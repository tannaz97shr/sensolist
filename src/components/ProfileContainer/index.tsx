"use client";

import { toggleMenu } from "@/lib/features/profile/profileSlice";
import { RootState } from "@/lib/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import ProfileMenu from "../ProfileMenu";
import ProfileMobileHeader from "../ProfileMobileHeader";

interface ProfileContainerProps {
  children: React.ReactNode;
}

export default function ProfileContainer({ children }: ProfileContainerProps) {
  const dispatch = useDispatch();
  const { menuOpen } = useSelector((state: RootState) => state.profileSlice);
  const router = useRouter();
  return (
    <div className="flex h-[calc(100vh-134px)] overflow-auto md:overflow-visible  md:h-[544px] md:mx-auto">
      <ProfileMenu
        isOpen={menuOpen}
        onClose={() => {
          dispatch(toggleMenu({ menuOpen: false }));
        }}
      />
      <div
        className="flex-1 rounded-r-2xl md:min-w-[400px] lg:w-[500px]
       md:max-w-[576px] md:mr-4 md:bg-black-opacity-50 md:dark:bg-white-opacity-50 border-l dark:border-l-neutral-7"
      >
        {!menuOpen && (
          <ProfileMobileHeader
            onGoBack={() => {
              dispatch(toggleMenu({ menuOpen: true }));
              router.push("/profile");
            }}
          />
        )}
        {children}
      </div>
    </div>
  );
}
