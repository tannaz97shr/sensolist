"use client";

import { IPermission, IUser } from "@/types/general";
import { Checkbox, Table } from "flowbite-react";
import { ArrowDown2 } from "iconsax-react";
import { useState } from "react";

export default function UserManagerEditPermissions({ user }: { user: IUser }) {
  const [openTable, setOpenTable] = useState<string[]>([]);
  const [thingsCheckAll, setThingsCheckAll] = useState<string[]>([]);
  const [appletsCheckAll, setAppletsCheckAll] = useState<string[]>([]);
  const [dashboardsCheckAll, setDashboardsCheckAll] = useState<string[]>([]);
  const thingsPermissions: IPermission[] = [
    {
      name: "thing 1",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "thing 2",
      view: false,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "thing 3",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
  ];
  const appletsPermissions: IPermission[] = [
    {
      name: "applet 1",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "applet 2",
      view: false,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "applet 3",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
  ];
  const dashboardsPermissions: IPermission[] = [
    {
      name: "dashboard 1",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "dashboard 2",
      view: false,
      add: false,
      edit: true,
      delete: true,
    },
    {
      name: "dashboard 3",
      view: true,
      add: false,
      edit: true,
      delete: true,
    },
  ];
  return (
    <div className="overflow-x-auto">
      <div className="mb-4">
        {user.firstName} {user.lastName} Permissions
      </div>
      <Table>
        <Table.Head
          onClick={() => {
            setOpenTable((prev) =>
              prev.includes("things")
                ? prev.filter((item) => item !== "things")
                : [...prev, "things"]
            );
          }}
        >
          <Table.HeadCell className="w-[280px]">things</Table.HeadCell>
          <Table.HeadCell>View</Table.HeadCell>
          <Table.HeadCell>Add</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <ArrowDown2
              className={`ml-auto transition-all duration-500 ${
                openTable.includes("things") && "rotate-180"
              }`}
            />
          </Table.HeadCell>
        </Table.Head>
        {openTable.includes("things") && (
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className=" capitalize">all things</Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setThingsCheckAll((prev) =>
                      e.target.checked
                        ? [...prev, "view"]
                        : prev.filter((item) => item !== "view")
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setThingsCheckAll((prev) =>
                      e.target.checked
                        ? [...prev, "add"]
                        : prev.filter((item) => item !== "add")
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setThingsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "edit")
                        : [...prev, "edit"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setThingsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "delete")
                        : [...prev, "delete"]
                    );
                  }}
                />
              </Table.Cell>
            </Table.Row>
            {thingsPermissions.map((permission) => (
              <Table.Row key={permission.name}>
                <Table.Cell className=" capitalize">
                  {permission.name}
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={thingsCheckAll.includes("view") ? true : undefined}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={thingsCheckAll.includes("add") ? true : undefined}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={thingsCheckAll.includes("edit") ? true : undefined}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      thingsCheckAll.includes("delete") ? true : undefined
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>

      <Table className="mt-4">
        <Table.Head
          onClick={() => {
            setOpenTable((prev) =>
              prev.includes("applets")
                ? prev.filter((item) => item !== "applets")
                : [...prev, "applets"]
            );
          }}
        >
          <Table.HeadCell className="w-[280px]">applets</Table.HeadCell>
          <Table.HeadCell>View</Table.HeadCell>
          <Table.HeadCell>Add</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <ArrowDown2
              className={`ml-auto transition-all duration-500 ${
                openTable.includes("applets") && "rotate-180"
              }`}
            />
          </Table.HeadCell>
        </Table.Head>
        {openTable.includes("applets") && (
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className=" capitalize">all things</Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAppletsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "view")
                        : [...prev, "view"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAppletsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "add")
                        : [...prev, "add"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAppletsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "edit")
                        : [...prev, "edit"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setAppletsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "delete")
                        : [...prev, "delete"]
                    );
                  }}
                />
              </Table.Cell>
            </Table.Row>
            {appletsPermissions.map((permission) => (
              <Table.Row key={permission.name}>
                <Table.Cell className=" capitalize">
                  {permission.name}
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      appletsCheckAll.includes("view") ? true : undefined
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={appletsCheckAll.includes("add") ? true : undefined}
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      appletsCheckAll.includes("edit") ? true : undefined
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      thingsCheckAll.includes("delete") ? true : undefined
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
      <Table className="mt-4">
        <Table.Head
          onClick={() => {
            setOpenTable((prev) =>
              prev.includes("dashboards")
                ? prev.filter((item) => item !== "dashboards")
                : [...prev, "dashboards"]
            );
          }}
        >
          <Table.HeadCell className="w-[280px]">dashboards</Table.HeadCell>
          <Table.HeadCell>View</Table.HeadCell>
          <Table.HeadCell>Add</Table.HeadCell>
          <Table.HeadCell>Edit</Table.HeadCell>
          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <ArrowDown2
              className={`ml-auto transition-all duration-500 ${
                openTable.includes("dashboards") && "rotate-180"
              }`}
            />
          </Table.HeadCell>
        </Table.Head>
        {openTable.includes("dashboards") && (
          <Table.Body className="divide-y">
            <Table.Row>
              <Table.Cell className=" capitalize">all things</Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDashboardsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "view")
                        : [...prev, "view"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDashboardsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "add")
                        : [...prev, "add"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDashboardsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "edit")
                        : [...prev, "edit"]
                    );
                  }}
                />
              </Table.Cell>
              <Table.Cell>
                <Checkbox
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setDashboardsCheckAll((prev) =>
                      !e.target.checked
                        ? prev.filter((item) => item !== "delete")
                        : [...prev, "delete"]
                    );
                  }}
                />
              </Table.Cell>
            </Table.Row>
            {dashboardsPermissions.map((permission) => (
              <Table.Row key={permission.name}>
                <Table.Cell className=" capitalize">
                  {permission.name}
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      dashboardsCheckAll.includes("view") ? true : undefined
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      dashboardsCheckAll.includes("add") ? true : undefined
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      dashboardsCheckAll.includes("edit") ? true : undefined
                    }
                  />
                </Table.Cell>
                <Table.Cell>
                  <Checkbox
                    checked={
                      dashboardsCheckAll.includes("delete") ? true : undefined
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        )}
      </Table>
    </div>
  );
}
