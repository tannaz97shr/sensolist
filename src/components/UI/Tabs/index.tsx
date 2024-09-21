interface TabsProps {
  items: string[];
  currentIndex: number;
  onTabChange: (index: number) => void;
  className?: string;
}

export default function Tabs({
  items,
  currentIndex,
  onTabChange,
  className,
}: TabsProps) {
  return (
    <div
      className={`relative flex items-center border-b-2 border-neutral-3 dark:border-neutral-8 w-full ${className}`}
    >
      {items.map((item, i) => (
        <button
          onClick={() => {
            onTabChange(i);
          }}
          key={item}
          style={{
            width: `calc(100% / ${items.length})`,
          }}
          className={`text-center capitalize pb-2 text-lg ${
            i === currentIndex
              ? " font-[600] text-primary-tint-3 dark:text-white"
              : " text-neutral-7 dark:text-neutral-6"
          }`}
        >
          {item}
        </button>
      ))}
      <div
        className="h-[2px] bg-primary-tint-3 dark:bg-white absolute bottom-[-2px] transition-all duration-500"
        style={{
          width: `calc(100% / ${items.length})`,
          marginLeft: `calc((100% / ${items.length}) * ${currentIndex})`,
        }}
      ></div>
    </div>
  );
}
