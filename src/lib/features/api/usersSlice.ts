import { RootState } from "@/lib/store";
import { CreateUserPayload, User, UserResponse } from "@/types/users";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

// Create a slice specifically for user-related API calls
export const usersApiSlice = createApi({
  reducerPath: "usersApi", // Optional, but useful to distinguish slices
  baseQuery: fetchBaseQuery({
    baseUrl: "https://sensolist-backend.vercel.app/api/v3/",
    prepareHeaders: async (headers, { getState }) => {
      const session = await getSession();
      console.log("Session:", session); // Debugging session

      if (session?.accessToken) {
        headers.set("Authorization", `Bearer ${session.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    fetchUsers: builder.query<UserResponse, void>({
      query: () => "user/all",
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<void, CreateUserPayload>({
      query: (payload) => ({
        url: "user", // POST to /user
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

// Export hooks for usage in functional components
export const { useFetchUsersQuery, useCreateUserMutation } = usersApiSlice;
