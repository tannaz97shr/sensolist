"use client";

import { IRole, IUser } from "@/types/general";
import { useState } from "react";
import Tabs from "../UI/Tabs";
import UserManagerPermissionsTable from "../UserManagerPermissionsTable";
import UserManagerRolesTable from "../UserManagerRolesTable";
import UserManagerTable from "../UserManegrTable";
import { User } from "@/types/users";

interface UserManagerContainerProps {
  permissionsTableData: IUser[];
  rolesTableData: IRole[];
  usersTableData: User[];
}

export default function UserManagerContainer({
  permissionsTableData,
  rolesTableData,
  usersTableData,
}: UserManagerContainerProps) {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  return (
    <>
      <Tabs
        className="mt-8 md:mt-2"
        items={["users", "roles", "permissions"]}
        currentIndex={currentTabIndex}
        onTabChange={(i: number) => {
          setCurrentTabIndex(i);
        }}
      />
      {currentTabIndex === 0 ? (
        <UserManagerTable tableData={usersTableData} />
      ) : currentTabIndex === 1 ? (
        <UserManagerRolesTable tableData={rolesTableData} />
      ) : (
        <UserManagerPermissionsTable tableData={permissionsTableData} />
      )}
    </>
  );
}
