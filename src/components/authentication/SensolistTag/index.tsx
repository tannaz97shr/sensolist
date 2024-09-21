import Image from "next/image";

export default function SensolistTag() {
  return (
    <div
      className=" bg-gradient-opacity rounded-2xl p-4 
  border border-white-opacity-900 items-center
  top-[502px] left-[120px] backdrop-blur-xl z-10
  flex mt-6 w-full max-w-[380px] lg:w-[300px] mx-auto
  lg:absolute"
    >
      <Image
        width={32}
        height={32}
        src="/assets/sensolist-logo.png"
        alt="sensolist-logo"
      />
      <div className="flex flex-col ml-4">
        <span className=" uppercase text-sm font-medium text-white">
          Sensolist
        </span>
        <span className=" whitespace-nowrap text-xs">
          Your IOT AI-boosted R&D Sandbox
        </span>
      </div>
    </div>
  );
}
