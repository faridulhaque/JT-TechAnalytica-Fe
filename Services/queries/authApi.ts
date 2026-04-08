import { apiSlice } from "../apiSlice";
import { LoginData } from "../types";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (data: LoginData) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),

    checkAuth: builder.query({
      query: () => ({
        url: "/auth/check",
        method: "GET",
      }),
    }),
  }),
  // overrideExisting: true,
});

export const { useLoginMutation, useCheckAuthQuery } = authApi;
