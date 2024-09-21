"use client";

import { CloseCircle } from "iconsax-react";
import { useState } from "react";
import Backdrop from "../Backdrop";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
  open: boolean;
  large?: boolean;
}

export default function Modal({ children, onClose, open, large }: ModalProps) {
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
        className={` bg-white fixed flex flex-col lg:h-3/4 max-h-[calc(100%-4rem)] overflow-auto
           text-black dark:text-white dark:bg-black shadow-300 shadow-white-150
            pt-4 px-4 pb-8 top-10 bottom-20
            rounded-2xl md:py-10 md:px-6 md:top-20 left-0 right-0 mx-auto
         transition-[opacity] duration-500 ease-linear ${
           isOpen ? " opacity-100 z-40" : "opacity-0 -z-10"
         }
            w-[calc(100%-2rem)]
        ${
          large
            ? " max-w-[920px]"
            : " max-w-[340px] md:w-[480px] md:max-w-[unset]"
        }`}
      >
        {!large && (
          <button
            onClick={closeHandler}
            className="absolute top-6 right-6 hidden md:flex text-neutral-5"
          >
            <CloseCircle />
          </button>
        )}
        {children}
      </div>
    </>
  );
}
