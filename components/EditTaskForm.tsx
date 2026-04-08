"use client";
import {
  useUpdateTaskMutation,
  useGetEmployeesQuery,
  useGetTasksQuery,
} from "@/Services/queries/taskApi";
import { TCreateTask, TUser, TTask, TUpdateTask } from "@/Services/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

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

  if (!existingTask) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-base-100 w-full max-w-md shadow-xl"
      >
        <div className="card-body">
          <h2 className="text-xl font-bold">Edit Task</h2>

          <label className="label">Title</label>
          <input
            name="title"
            value={form?.title}
            onChange={handleChange}
            type="text"
            className="input w-full"
          />

          <label className="label">Description</label>
          <input
            name="description"
            value={form?.description}
            onChange={handleChange}
            type="text"
            className="input w-full"
          />

          <label className="label">Assign Employee</label>
          <select
            name="employeeId"
            value={form?.employeeId}
            onChange={handleChange}
            className="select w-full"
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

          <button
            type="submit"
            className="btn btn-neutral mt-4"
            disabled={updating}
          >
            {updating ? "Updating..." : "Update Task"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTaskForm;
