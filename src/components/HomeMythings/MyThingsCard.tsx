import Link from "next/link";

interface MyThingsProps {
  image?: string;
  name: string;
  id: string;
}

export default function MyThings({ image, name, id }: MyThingsProps) {
  return (
    <Link
      href={`/myThings/${id}`}
      className="w-[130px] h-full flex flex-col rounded-xl my-auto overflow-hidden bg-neutral-2 dark:bg-white-opacity-100 bg-black-opacity-100 pb-2"
    >
      <div
        className="relative w-full aspect-[4/3]"
        style={{
          backgroundImage: `url(${image || "/assets/thing.jpeg"})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="flex-grow flex items-center justify-center px-2 pt-1 capitalize dark:text-neutral-3 text-sm font-medium text-center break-words truncate-2-lines">
        {name}
      </div>
    </Link>
  );
}
