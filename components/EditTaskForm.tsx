"use client";
import {
  useUpdateTaskMutation,
  useGetEmployeesQuery,
  useGetTasksQuery,
} from "@/Services/queries/taskApi";
import { TCreateTask, TUser, TTask, TUpdateTask } from "@/Services/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function EditTaskForm() {
  const { id } = useParams();
  const router = useRouter();

  const [updateTask, { isLoading: updating }] = useUpdateTaskMutation();

  const { data: taskData } = useGetTasksQuery("");
  const { data: empData, isLoading: employeeLoading } =
    useGetEmployeesQuery("");

  const employees: TUser[] = (empData as any)?.data || [];
  const tasks: TTask[] = (taskData as any)?.data || [];

  const existingTask = tasks?.find((t) => t?.id === id);

  const [form, setForm] = useState<TCreateTask>({
    title: "",
    description: "",
    employeeId: "",
  });

  // prefill
  useEffect(() => {
    if (existingTask) {
      setForm({
        title: existingTask?.title || "",
        description: existingTask?.description || "",
        employeeId: existingTask?.assignedUser?.id || "",
      });
    }
  }, [existingTask]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.employeeId) {
      alert("Title and Employee are required");
      return;
    }

    const updateTaskData: TUpdateTask = {
      taskId: id as string,
      ...form,
    };

    try {
      await updateTask(updateTaskData);

      alert("Task updated");
      router.push("/dashboard");
    } catch {
      alert("Failed to update task");
    }
  };

  if (!existingTask) return <Loading></Loading>;

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 w-full shadow-xl border border-base-200 pt-10"
    >
      <div className="card-body p-6 sm:p-8 gap-4">
        <h2 className="text-xl font-semibold text-center">Edit Task</h2>

        {/* Title */}
        <div className="flex flex-col gap-1">
          <label className="label-text">Title</label>
          <input
            name="title"
            value={form?.title}
            onChange={handleChange}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter task title"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-1">
          <label className="label-text">Description</label>
          <input
            name="description"
            value={form?.description}
            onChange={handleChange}
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter task description"
          />
        </div>

        {/* Employee */}
        <div className="flex flex-col gap-1">
          <label className="label-text">Assign Employee</label>
          <select
            name="employeeId"
            value={form?.employeeId}
            onChange={handleChange}
            className="select select-bordered w-full"
          >
            <option value="">Select employee</option>

            {employeeLoading ? (
              <option disabled>Loading...</option>
            ) : (
              employees?.map((emp) => (
                <option key={emp?.id} value={emp?.id}>
                  {emp?.username}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-neutral w-full mt-2"
          disabled={updating}
        >
          {updating ? "Updating..." : "Update Task"}
        </button>
      </div>
    </form>
  );
}

export default EditTaskForm;
