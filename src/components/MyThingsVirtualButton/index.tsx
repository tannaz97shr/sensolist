"use client";
import { useState } from "react";
import MyThingsCreateVirtualForm from "../MyThingsVirtualForm";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

interface MythingsCrateVirtualButtonProps {
  className?: string;
}
export default function MyThingsCreateVirtualButton({
  className,
}: MythingsCrateVirtualButtonProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button
        href="/myThings/createVirtual"
        className="w-10 h-10 md:w-fit ml-2 px-5"
        onClick={() => setOpen(true)}
      >
        Create Virtual
      </Button>
      <Modal open={isOpen} onClose={() => setOpen(false)}>
        <MyThingsCreateVirtualForm onClose={() => {}} />
      </Modal>
    </>
  );
}
