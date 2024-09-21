interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  className,
  children,
  disabled,
}: SubmitButtonProps) {
  return (
    <button
      disabled={disabled}
      type="submit"
      className={`bg-secondary-main w-full rounded-lg py-2.5 text-sm md:text-base 
      font-medium flex items-center justify-center ${className}`}
    >
      {children}
    </button>
  );
}
