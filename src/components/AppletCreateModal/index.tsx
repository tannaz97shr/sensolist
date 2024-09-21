import { IApplet } from "@/types/general";
import AppletCreateForm from "../AppletCreateForm";
import Modal from "../UI/Modal";

interface AppletCreateModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (a: boolean) => void;
  applets: IApplet[];
  closeEditModal: () => void;
  editApplet: (d: IApplet) => void;
  appletEdit: IApplet | null;
  refreshData: () => Promise<void>;
}

export default function AppletCreateModal({
  isCreateModalOpen,
  setIsCreateModalOpen,
  applets,
  closeEditModal,
  editApplet,
  appletEdit,
  refreshData,
}: AppletCreateModalProps) {
  return (
    <Modal
      open={isCreateModalOpen}
      onClose={() => {
        setIsCreateModalOpen(false);
        closeEditModal();
      }}
    >
      <AppletCreateForm
        initialValues={appletEdit}
        onCancel={() => {
          setIsCreateModalOpen(false);
          closeEditModal();
        }}
        open={isCreateModalOpen}
        edit={appletEdit}
        refreshData={refreshData}
      />
    </Modal>
  );
}
