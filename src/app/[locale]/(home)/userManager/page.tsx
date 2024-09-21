"use client";
import UserManagerContainer from "@/components/UserManagerContainer";
import { useFetchUsersQuery } from "@/lib/features/api/usersSlice";
import { IRole, IUser } from "@/types/general";
import { Skeleton } from "@mui/material";

const permissionsTableData: IUser[] = [
  {
    id: "hjpo32a",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32b",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32c",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32d",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32e",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32f",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
  {
    id: "hjpo32g",
    firstName: "John",
    lastName: "Doe",
    role: "Administrator",
  },
];

const rolesTableData: IRole[] = [
  {
    name: "developer",
    description: "same random description for developer role",
  },
  {
    name: "administrator",
    description: "same random description for administrator role",
  },
];

export default function Page() {
  const { data: users, error, isLoading } = useFetchUsersQuery();

  const skeletonData = Array(5).fill({
    firstName: <Skeleton variant="text" width={150} />,
    lastName: <Skeleton variant="text" width={150} />,
    systemRole: <Skeleton variant="text" width={150} />,
  });

  if (error) return <div>Error: {error.toString()}</div>;
  return (
    <div className="flex flex-col bg-neutral-3 dark:bg-primary-Shade-2 h-fit m-4 md:m-8 p-2 md:p-8">
      <UserManagerContainer
        rolesTableData={rolesTableData}
        permissionsTableData={permissionsTableData}
        usersTableData={isLoading ? skeletonData : users?.list ?? []}
      />
    </div>
  );
}
