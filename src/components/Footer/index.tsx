export default function Footer() {
  return (
    <div
      className="hidden md:flex flex-col w-full h-[70px] mt-auto 
    dark:text-neutral-5 text-neutral-8 bg-white dark:bg-primary-Shade-2 z-10"
    >
      <div
        className="w-full h-[4px] bg-gradient-to-r to-[#C2CBD4] from-[#3F76AA]
        dark:to-[#192F44] dark:from-[#11406C]
      "
      ></div>
      <div className="m-auto text-sm">
        {" "}
        © 2024 sensolist.com ,all rights reserved
      </div>
    </div>
  );
}
