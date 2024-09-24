import { Danger } from "iconsax-react";
import Dialog from ".";
import Button from "../Button";

interface DeleteDialogProps {
  open: boolean;
  onClose: () => void;
  description: string;
  onDelete: () => void;
}

export default function DeleteDialog({
  open,
  onClose,
  description,
  onDelete,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <Danger className=" text-error mb-4 size-8" />
      <div className=" text-lg font-medium mb-2 dark:text-white">
        Are you sure?
      </div>
      <div className=" mb-8 text-neutral-7 dark:text-neutral-4 text-center">
        {description}
      </div>
      <div className=" flex gap-4 h-10 w-full">
        <Button className="w-1/2" onClick={onClose} variant="secondary">
          Cancel
        </Button>
        <Button className="w-1/2" onClick={onDelete} variant="delete">
          Delete
        </Button>
      </div>
    </Dialog>
  );
}
