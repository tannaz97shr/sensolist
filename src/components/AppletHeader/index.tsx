import { CloseCircle, TickCircle } from "iconsax-react";
import Button from "../UI/Button";

export default function AppletHeader({
  appletName,
  toggleEditMode,
  editMode,
  onSave,
  onCancel,
  saveDisabled,
}: {
  appletName: string;
  toggleEditMode: (a: boolean) => void;
  editMode: boolean;
  onSave: () => Promise<void>;
  onCancel: () => void;
  saveDisabled: boolean;
}) {
  return (
    <div className="w-full h-16 bg-neutral-2 shadow dark:bg-primary-tint-1 flex items-center px-6">
      <div className=" capitalize dark:text-white">{appletName}</div>
      {editMode ? (
        <>
          <Button
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              onCancel();
            }}
            className="ml-auto mx-4 text-neutral-6"
            variant="text"
          >
            <CloseCircle className="mr-1" /> cancel
          </Button>
          <Button
            onClick={async (event: React.MouseEvent<HTMLElement>) => {
              event.preventDefault();
              await onSave();
              toggleEditMode(false);
            }}
            className={`px-2 py-1 h-[40px] rounded-lg 
            ${saveDisabled && "bg-gray-300 text-gray-500 cursor-not-allowed"}
          `}
            variant="secondary"
            disabled={saveDisabled}
          >
            <TickCircle className="mr-1" /> save
          </Button>
        </>
      ) : (
        <Button
          onClick={() => {
            toggleEditMode(true);
          }}
          className="ml-auto px-2 py-1 h-[40px]"
          variant="secondary"
        >
          <TickCircle className="mr-1" /> Edit
        </Button>
      )}
    </div>
  );
}
