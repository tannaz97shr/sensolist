export interface User {
  id: any;
  username: string;
  phonenumber: string;
  firstname: string;
  lastname: string;
  customRole: string;
}
export interface UserResponse {
  statusCode: number;
  page: number;
  pageCount: number;
  list: User[];
}
export interface CreateUserPayload {
  phonenumber: string;
  firstname: string;
  lastname: string;
  password: string;
  systemRole?: string;
  userRoles: string[];
}
