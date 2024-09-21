interface BackdropProps {
  onClick?: () => void;
  secondary?: boolean;
}
export default function Backdrop({ onClick, secondary }: BackdropProps) {
  return (
    <div
      onClick={onClick}
      className={` fixed bg-black-opacity-400 top-0 left-0 w-[100vw] h-[100vh]  ${
        secondary ? "z-40" : "z-20"
      }`}
    ></div>
  );
}
