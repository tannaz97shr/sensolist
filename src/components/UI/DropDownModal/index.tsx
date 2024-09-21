interface DropDownModalProps {
  onClick: () => void;
  visible: boolean;
}

export default function DropDownModal({
  onClick,
  visible,
}: DropDownModalProps) {
  return (
    <div
      className={` fixed w-[100vw] h-[100vh] z-30 top-0 left-0 ${
        visible ? "flex" : "hidden"
      }`}
      onClick={onClick}
    ></div>
  );
}
