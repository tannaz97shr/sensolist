"use client";

import { IUser } from "@/types/general";
import { createTheme, Skeleton, ThemeProvider } from "@mui/material";
import { ProfileDelete, UserAdd, UserEdit } from "iconsax-react";
import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import UserManagerAddUserForm from "../UserManagerAddUserForm";
import UserManagerEditPermissions from "../UserManagerEditPemissions";
import { useCreateUserMutation } from "@/lib/features/api/usersSlice";
import { useDispatch } from "react-redux";
import { createAlert } from "@/lib/features/notification/notificatioSlice";
import { User } from "@/types/users";

interface UserManagerTableProps {
  tableData: User[];
}

export default function UserManagerTable({ tableData }: UserManagerTableProps) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [data, setData] = useState<User[]>(tableData);
  const [userEdit, setUserEdit] = useState<IUser | null>(null);
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const [createUser, { isLoading, isSuccess, isError, error }] =
    useCreateUserMutation();
  const { resolvedTheme } = useTheme();

  const darkTheme = createTheme({
    palette: {
      mode: resolvedTheme === "dark" ? "dark" : "light",
    },
  });

  const columns = useMemo<MRT_ColumnDef<User | any>[]>(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 150,
      },
      {
        accessorKey: "firstname",
        header: "First Name",
        size: 150,
      },
      {
        accessorKey: "lastname",
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
  const createUserHandeler = async (
    firstName: string,
    lastName: string,
    userRoles: string[],
    password: string,
    phonenumber: string
  ) => {
    try {
      const payload = {
        firstname: firstName,
        lastname: lastName,
        phonenumber: phonenumber,
        password: password,
        userRoles, // Ensure this matches the expected format
      };

      await createUser(payload).unwrap(); // Trigger the API call
    } catch (err: any) {
      console.error("Error creating user:", err); // Log the error
      dispatch(
        createAlert({
          message: err.data.message || "An error occurred",
          type: "error",
        })
      );
    }
  };

  const skeletonData = Array(5).fill({
    id: <Skeleton variant="text" width={150} />,
    firstName: <Skeleton variant="text" width={150} />,
    lastName: <Skeleton variant="text" width={150} />,
    role: <Skeleton variant="text" width={150} />,
  });

  const table = useMaterialReactTable({
    columns,
    data: isLoading ? skeletonData : data,
    enableRowPinning: true,
    enableRowActions: true,
    positionActionsColumn: "last",

    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        className="w-[180px] whitespace-nowrap"
        onClick={() => {
          setAddUserOpen(true);
        }}
      >
        <UserAdd className="mr-2" />
        Create new user
      </Button>
    ),
    renderRowActions: ({ row }) => {
      return (
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              setUserEdit(row.original);
            }}
          >
            <UserEdit />
          </button>
          <button
            onClick={() => {
              setData((prev) =>
                prev.filter((item) => item.id !== row.original.id)
              );
            }}
          >
            <ProfileDelete />
          </button>
        </div>
      );
    },
  });

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <div className="w-[112px] h-[40px]"></div>;
  }
  return (
    <>
      <div className=" p-8">
        <ThemeProvider theme={darkTheme}>
          <MaterialReactTable table={table} />
        </ThemeProvider>
      </div>
      <Modal
        open={userEdit ? true : false}
        onClose={() => {
          setUserEdit(null);
        }}
      >
        {userEdit && (
          <UserManagerAddUserForm
            closeModal={() => setAddUserOpen(false)}
            user={userEdit}
          />
        )}
      </Modal>
      <Modal
        open={addUserOpen}
        onClose={() => {
          setAddUserOpen(false);
        }}
      >
        <UserManagerAddUserForm
          closeModal={() => {
            setAddUserOpen(false);
          }}
           user={userEdit}
          // addUser={(data) => console.log(data)}
        />
      </Modal>
    </>
  );
}
