interface ProductDetailsContentProps {
  name: string;
  brand: string;
  model: string;
  type: string;
  actions: string;
  characteristics: string;
  activitionDate: string;
  description: string;
}

export default function ProductDetailsContent({
  name,
  brand,
  model,
  type,
  actions,
  characteristics,
  activitionDate,
  description,
}: ProductDetailsContentProps) {
  return (
    <div className=" flex flex-col gap-6 lg:pl-10 text-sm flex-1 max-w-[500px] mr-auto w-full">
      <div className="text-lg text-black font-medium capitalize dark:text-neutral-3 hidden lg:flex">
        {name}
      </div>
      <div className="flex items-baseline w-full">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          brand:
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3">
          {brand}
        </div>
      </div>

      <div className="flex items-baseline w-full">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          model:
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3">
          {model}
        </div>
      </div>

      <div className="flex items-baseline w-full">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          type:
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3">
          {type}
        </div>
      </div>

      <div className="flex items-baseline w-full">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          actions
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3">
          {actions}
        </div>
      </div>

      <div className="flex items-baseline w-full">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          characteristics:
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3 break-words">
          {characteristics}
        </div>
      </div>

      <div className="items-baseline w-full hidden lg:flex">
        <div className="w-1/2 whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          activation date:
        </div>
        <div className="w-1/2 capitalize text-neutral-8 dark:text-neutral-3">
          {activitionDate}
        </div>
      </div>

      <div className="flex items-baseline w-full flex-col">
        <div className=" w-full whitespace-nowrap pr-2 font-bold text-black capitalize dark:text-neutral-3">
          description:
        </div>
        <div className="w-full mt-2 mb-4 capitalize text-neutral-8 dark:text-neutral-3">
          {description}
        </div>
      </div>
    </div>
  );
}
