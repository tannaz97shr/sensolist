import { RootState } from "@/lib/store";
import { CreateUserPayload, User, UserResponse } from "@/types/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// Create a slice specifically for user-related API calls
export const rolesApiSlice = createApi({
  reducerPath: "rolesApi", // Optional, but useful to distinguish slices
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sensolist-backend.vercel.app/api/v3/",
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();

      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }

      return headers;
    },
  }),

  endpoints: (builder) => ({
    fetchRoles: builder.query<RoleApiResponse, void>({
      query: () => "user-role/list/all",
    }),
    // createUser: builder.mutation<void, CreateUserPayload>({
    //   query: (payload) => ({
    //     url: "user", // POST to /user
    //     method: "POST",
    //     body: payload,
    //   }),
    //   invalidatesTags: ["Users"],
    // }),
  }),
});

// Export the auto-generated hook
export const { useFetchRolesQuery } = rolesApiSlice;
