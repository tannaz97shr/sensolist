"use client";

import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import Backdrop from "../Backdrop";

interface SecondaryModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
}

export default function SecondaryModal({
  children,
  onClose,
  open,
}: SecondaryModalProps) {
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
      {isOpen && <Backdrop secondary onClick={closeHandler} />}
      <div
        className={` bg-white fixed flex flex-col lg:h-1/2 max-h-[calc(100%-4rem)] overflow-auto
           text-black dark:text-white dark:bg-black shadow-300 shadow-white-150
            pt-4 px-4 pb-8 top-10 bottom-20
            rounded-2xl md:py-10 md:px-6 md:top-40 left-0 right-0 mx-auto
         transition-[opacity] duration-500 ease-linear ${
           isOpen ? " opacity-100 z-40" : "opacity-0 -z-10"
         }
            w-[calc(100%-2rem)] max-w-[320px] md:w-[480px] md:max-w-[unset]
        `}
      >
        <button
          onClick={closeHandler}
          className="absolute top-6 right-6 hidden md:flex text-neutral-5"
        >
          <CloseCircle />
        </button>
        {children}
      </div>
    </>
  );
}
