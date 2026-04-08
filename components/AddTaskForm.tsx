"use client";
import {
  useAddTaskMutation,
  useGetEmployeesQuery,
} from "@/Services/queries/taskApi";
import { TUser, TCreateTask } from "@/Services/types";
import React, { useState } from "react";

type AddTaskFormProps = {
  user: TUser;
};

function AddTaskForm({ user }: AddTaskFormProps) {
  const [addTask, { isLoading: addingTask }] = useAddTaskMutation();
  const { data, isLoading: employeeLoading } = useGetEmployeesQuery("");

  const employees: TUser[] = (data as any)?.data || [];
  console.log("employees", employees);

  const [form, setForm] = useState<TCreateTask>({
    title: "",
    description: "",
    employeeId: "",
  });

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

    try {
      const res: any = await addTask(form);
      if (res?.data) {
        alert("Task created");
        setForm({ title: "", description: "", employeeId: "" });
      }
    } catch {
      alert("Failed to create task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 w-full max-w-md shadow-xl"
    >
      <div className="card-body">
        <h2 className="text-xl font-bold">Add Task</h2>

        <label className="label">Title</label>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          type="text"
          className="input"
          placeholder="Task title"
        />

        <label className="label">Description</label>
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          type="text"
          className="input"
          placeholder="Task description"
        />

        <label className="label">Assign Employee</label>
        <select
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          className="select"
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
          disabled={addingTask}
        >
          {addingTask ? "Adding..." : "Add Task"}
        </button>
      </div>
    </form>
  );
}

export default AddTaskForm;
