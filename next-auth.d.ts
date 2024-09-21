import "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User {
    id: string;
    statusCode: number;
    accessToken?: string;
    expiresOn?: string;
    message?: string;
    error?: string;
  }
  interface Session {
    statusCode: number;
    accessToken?: string;
    expiresOn?: string;
    message?: string;
    error?: string;
  }
}
