"use client";
import { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import MyThingsCreateVirtualForm from "../MyThingsVirtualForm";

interface MythingsCrateVirtualButtonProps {
  className?: string;
}
export default function MyThingsCreateVirtualButton({
  className,
}: MythingsCrateVirtualButtonProps) {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <Button className={className} onClick={() => setOpen(true)}>
        Create Virtual
      </Button>
      <Modal open={isOpen} onClose={() => setOpen(false)}>
        <MyThingsCreateVirtualForm onClose={() => {}} />
      </Modal>
    </>
  );
}
