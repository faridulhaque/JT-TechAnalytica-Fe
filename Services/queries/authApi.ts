import { apiSlice } from "../apiSlice";

const authApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (data: any) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
  // overrideExisting: true,
});

export const { useLoginMutation } = authApi;
