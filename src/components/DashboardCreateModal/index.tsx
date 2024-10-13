import { IDashboard } from "@/types/general";
import DashboardCreateForm from "../DashboardCreateForm";
import Modal from "../UI/Modal";

interface DashboardCreateModalProps {
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (a: boolean) => void;
  dashboards: IDashboard[];
  closeEditModal: () => void;
  editDashboard: (d: IDashboard) => void;
  dashboardEdit: IDashboard | null;
  refreshData: () => void;
}

export default function DashboardCreateModal({
  isCreateModalOpen,
  setIsCreateModalOpen,
  closeEditModal,
  editDashboard,
  dashboardEdit,
  refreshData,
}: DashboardCreateModalProps) {
  return (
    <Modal
      open={isCreateModalOpen}
      onClose={() => {
        setIsCreateModalOpen(false);
        closeEditModal();
      }}
    >
      <DashboardCreateForm
        initialValues={dashboardEdit}
        onCancel={() => {
          setIsCreateModalOpen(false);
          closeEditModal();
        }}
        open={isCreateModalOpen}
        edit={dashboardEdit}
        refreshData={refreshData}
      />
    </Modal>
  );
}
