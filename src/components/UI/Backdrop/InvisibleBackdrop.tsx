interface BackdropProps {
  onClick?: () => void;
  secondary?: boolean;
}
export default function InvisibleBackdrop({
  onClick,
  secondary,
}: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className={` fixed bg-error top-0 left-0 w-[100vw] h-[100vh] z-50`}
    ></div>
  );
}
