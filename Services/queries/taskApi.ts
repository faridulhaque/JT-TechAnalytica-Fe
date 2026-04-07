import { apiSlice } from "../apiSlice";

const othersApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    addTask: builder.mutation({
      query: (data: any) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    updateTask: builder.mutation({
      query: (data: any) => ({
        url: "/task",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["tasks"],
    }),

    getTasks: builder.query({
      query: () => ({
        url: `/task`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    getOneTask: builder.query({
      query: (id: string) => ({
        url: `/task/${id}`,
        method: "GET",
      }),
      providesTags: ["tasks"],
    }),

    changeStatus: builder.mutation({
      query: (id: string) => ({
        url: `/task/${id}/status`,
        method: "PATCH",
      }),
      invalidatesTags: ["tasks"],
    }),

    deleteTask: builder.mutation({
      query: (id: string) => {
        return {
          url: `/task`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["tasks"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useAddTaskMutation,
  useDeleteTaskMutation,
  useChangeStatusMutation,
} = othersApi;
