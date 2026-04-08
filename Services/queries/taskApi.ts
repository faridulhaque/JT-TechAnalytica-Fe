import { apiSlice } from "../apiSlice";
import { TUpdateTask } from "../types";

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
      query: (data: TUpdateTask) => ({
        url: `/task/${data?.taskId}`,
        method: "PUT",
        body: {
          title: data?.title,
          description: data?.description,
          employeeId: data?.employeeId
        },
      }),
      invalidatesTags: ["tasks"],
    }),

    updateTaskStatus: builder.mutation({
      query: (data: {
        taskId: string;
        status: 'PENDING' | "PROCESSING" | "DONE"
      }) => ({
        url: `/task/${data?.taskId}/status`,
        method: "PATCH",
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
    getEmployees: builder.query({
      query: () => ({
        url: `/task/employees`,
        method: "GET",
      }),
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
          url: `/task/${id}`,
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
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useChangeStatusMutation,
  useGetEmployeesQuery,
  useGetTasksQuery,
  useUpdateTaskStatusMutation
} = othersApi;
