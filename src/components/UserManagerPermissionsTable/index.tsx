import { IUser } from "@/types/general";
import { createTheme, ThemeProvider } from "@mui/material";
import {  Edit2} from "iconsax-react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import Modal from "../UI/Modal";
import UserManagerEditPermissions from "../UserManagerEditPemissions";

interface UserManagerTableProps {
  tableData: IUser[];
}

export default function UserManagerPermissionsTable({
  tableData,
}: UserManagerTableProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [data, setData] = useState<IUser[]>(tableData);
  const [editPermissionsOpen, setEditPermissionsOpen] =
    useState<boolean>(false);

  const { resolvedTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: resolvedTheme === "dark" ? "dark" : "light",
    },
  });

  const columns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
        size: 150,
      },
      {
        accessorKey: "role",
        header: "Role",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActions: ({ row }) => (
      <div className="flex items-center gap-4">
        <button
          onClick={() => setEditPermissionsOpen(true)}
        >
          <Edit2 />
        </button>
      </div>
    ),
  });

  const handleUserAdded = () => {
    // Refetch data or optimistically update the table with the new user
    setEditPermissionsOpen(false);
    // Optionally, refetch or update local state based on the new user added
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-[112px] h-[40px]"></div>;
  }
const user= {
  id: "1",
  firstName: "Zahra",
  lastName: "Yazdani",
  role: "Admin"
}
  return (
    <>
      <div className="p-8">
        <ThemeProvider theme={darkTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </div>
      <Modal
        large
        open={editPermissionsOpen ? true : false}
        onClose={() => {
          setEditPermissionsOpen(false);
        }}
      >
        {editPermissionsOpen && <UserManagerEditPermissions user={user} />}
      </Modal>

      {/* <Modal
        open={addUserOpen}
        onClose={() => {
          setAddUserOpen(false);
        }}
      >
        <UserManagerAddUserForm
          closeModal={() => setAddUserOpen(false)}
          user=
          // onUserAdded={handleUserAdded} // Pass down the handler
        />
      </Modal> */}
    </>
  );
}
