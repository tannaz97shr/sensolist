import { Profile } from "iconsax-react";
import Link from "next/link";

export default function ProfileButton() {
  return (
    <Link
      href={"/profile"}
      className="relative hidden md:flex w-[32px] h-[32px] rounded-full
    dark:bg-white-opacity-100 shadow bg-neutral-3"
    >
      <Profile className="m-auto size-5 dark:text-white text-primary-tint-3" />
    </Link>
  );
}
