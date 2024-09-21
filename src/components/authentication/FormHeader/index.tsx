interface FormHeaderProps {
  title: string;
  description: string;
}

export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div className="flex flex-col w-full">
      <div
        className="w-full border-b border-white-opacity-900 pb-2 md:pb-3 
      text-xl md:text-2xl lg:text-[28px] font-medium"
      >
        {title}
      </div>
      <div className="mt-2 text-sm md:text-base lg:text-lg md:mt-3 leading-tight">
        {description}
      </div>
    </div>
  );
}
