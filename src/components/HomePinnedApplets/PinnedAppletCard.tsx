import Link from "next/link";

interface PinnedAppletCardProps {
  image?: string;
  name: string;
  id: string;
}

export default function PinnedAppletCard({
  image,
  name,
  id,
}: PinnedAppletCardProps) {
  return (
    <Link
      href={`/applets/${id}`}
      className="w-[130px] h-full flex flex-col rounded-xl my-auto overflow-hidden bg-neutral-2 dark:bg-primary-Shade-3 bg-black-opacity-100 pb-2"
    >
      <div
        className=" relative w-full aspect-[4/3]"
        style={{
          backgroundImage: `url(${image || "/assets/thing.jpeg"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className=" px-2 pt-1 capitalize dark:text-neutral-3 text-sm font-medium text-center truncate">
        {name}
      </div>
    </Link>
  );
}
