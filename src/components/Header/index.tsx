import LanguageSwitch from "../LanguageSwitch";
import Notifications from "../Notifications";
import ThemeSwitch from "../ThemeSwitch";
import Logo from "./Logo";
import ProfileButton from "./ProfileButton";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <div
      className="flex items-center w-full rounded-b-2xl
    p-4 md:pt-6 md:pb-6 md:fixed z-20 md:bg-white shadow-md
    bg-primary-Shade-2 dark:md:bg-primary-Shade-2 md:bg-transparent"
    >
      <ProfileMenu />
      <Logo />
      <div className="ml-auto flex">
        <ThemeSwitch />
        <LanguageSwitch />
        <Notifications />
        <ProfileButton />
      </div>
    </div>
  );
}
