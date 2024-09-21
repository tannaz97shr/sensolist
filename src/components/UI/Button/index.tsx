import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "fill" | "stroke" | "text" | "secondary";
  className?: string;
  children: React.ReactNode;
  href?: string;
  loading?: boolean;
}

export default function Button({
  variant,
  className,
  children,
  href,
  loading,
  ...rest
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`rounded-lg py-3 capitalize flex items-center text-sm justify-center ${
          variant === "text"
            ? ""
            : variant === "stroke"
            ? ""
            : variant === "secondary"
            ? " border-2 border-neutral-6 text-neutral-6"
            : " text-white bg-secondary-main shadow-orange"
        } ${className}`}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      className={`rounded-lg py-3 capitalize flex items-center text-sm justify-center ${
        variant === "text"
          ? ""
          : variant === "stroke"
          ? ""
          : variant === "secondary"
          ? " border-2 border-neutral-6 text-neutral-6"
          : " text-white bg-secondary-main shadow-orange"
      } ${className}`}
      disabled={loading}
      {...rest}
    >
      {loading ? (
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
}
