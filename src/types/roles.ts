interface Permission {
  permissionType: "Create" | "Read" | "Update" | "Delete"; // Define other permission types as needed
  targetEntity: string;
  entityId: string;
}

interface Role {
  name: string;
  description: string;
  permissions: Permission[];
  roleId: string;
}

interface RoleApiResponse {
  statusCode: number;
  page: number;
  pageCount: number;
  list: Role[];
}
