import { Edit, Trash } from "iconsax-react";

interface ContextMenuProps {
  onEditSelect: () => void;
  onDelete: () => void;
}

export default function ContextMenu({
  onEditSelect,
  onDelete,
}: ContextMenuProps) {
  return (
    <div className="absolute bg-neutral-4 rounded-lg flex flex-col !z-[2000] tabindex-1">
      <button
        onClick={onEditSelect}
        className="p-4 border-b border-neutral-6 flex text-neutral-8 text-sm items-center"
      >
        <Edit className="mr-4 size-4" /> Edit
      </button>
      {/* <div className="p-4 border-b border-neutral-6 flex text-neutral-8 text-sm items-center">
        <Copy className="mr-4 size-4" /> Copy
      </div> */}
      <div
        onClick={onDelete}
        className="p-4 flex text-neutral-8 text-sm items-center"
      >
        <Trash className="mr-4 size-4" /> Delete
      </div>
    </div>
  );
}
