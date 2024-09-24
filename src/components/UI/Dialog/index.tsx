import { useState } from "react";
import Backdrop from "../Backdrop";

interface DialogProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export default function Dialog({ children, onClose, open }: DialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  setTimeout(() => {
    setIsOpen(open ? true : false);
  }, 100);

  const closeHandler = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  return (
    <>
      {isOpen && <Backdrop onClick={closeHandler} />}
      <div
        className={`bg-exteremly-light-blue dark:bg-primary fixed py-8 px-14 rounded-lg flex flex-col items-center
        transition-[opacity] duration-500 ease-linear 
        left-0 right-0 bottom-0 top-0 m-auto h-fit w-fit max-w-[480px]
        ${isOpen ? " opacity-100 z-40" : "opacity-0 -z-10"}`}
      >
        {children}
      </div>
    </>
  );
}
