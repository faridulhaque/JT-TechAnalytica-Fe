"use client";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/Services/queries/taskApi";
import { TUser, TTask } from "@/Services/types";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

type TTaskList = {
  user: TUser;
};

function TaskList({ user }: TTaskList) {
  const router = useRouter();
  const { data, isLoading: tasksLoading } = useGetTasksQuery("");
  const [updateTask, { isLoading: updatingStatus }] =
    useUpdateTaskStatusMutation();
  const [deleteTask, { isLoading: deleting }] = useDeleteTaskMutation();

  const tasks: TTask[] = (data as any)?.data || [];

  const handleStatusChange = async (taskId: string, status: string) => {
    try {
      await updateTask({ taskId, status });
      alert("Status updated");
    } catch {
      alert("Failed to update status");
    }
  };
  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );
    if (!confirmed) return;

    try {
      await deleteTask(id);
      alert("Task deleted");
    } catch {
      alert("Failed to delete task");
    }
  };

  if (tasksLoading) return <Loading></Loading>


  return (
    <div className="w-full mt-10">
      {/* TABLE (md and up) */}
      <div className="hidden md:block overflow-x-auto bg-base-100 rounded-xl border border-base-200 shadow-sm">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>Title</th>
              <th>Description</th>

              {user?.role === "admin" && (
                <>
                  <th>Assignee</th>
                  <th>Assigner</th>
                </>
              )}

              {user?.role === "employee" && <th>Assigner</th>}

              <th>Created</th>
              <th>Status</th>

              {user?.role === "admin" && (
                <th className="text-right">Actions</th>
              )}
            </tr>
          </thead>

          <tbody>
            {tasks?.map((task) => (
              <tr key={task?.id} className="hover">
                <td className="font-medium">{task?.title}</td>
                <td className="max-w-xs truncate">{task?.description}</td>

                {user?.role === "admin" && (
                  <>
                    <td>{task?.assignedUser?.username}</td>
                    <td>{task?.assignedBy?.username}</td>
                  </>
                )}

                {user?.role === "employee" && (
                  <td>{task?.assignedBy?.username}</td>
                )}

                <td className="text-sm">
                  {task?.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : ""}
                </td>

                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={task?.status}
                    disabled={user?.role === "admin" || updatingStatus}
                    onChange={(e) => {
                      if (user?.role === "employee" && task?.id) {
                        handleStatusChange(task.id, e.target.value);
                      }
                    }}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="DONE">DONE</option>
                  </select>
                </td>

                {user?.role === "admin" && (
                  <td className="text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-sm btn-outline"
                        onClick={() =>
                          task?.id && router.push(`/edit-task/${task.id}`)
                        }
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => task?.id && handleDelete(task.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {tasks?.map((task) => (
          <div
            key={task?.id}
            className="card bg-base-100 border border-base-200 shadow-sm"
          >
            <div className="card-body p-4 gap-2">
              <div className="flex justify-between items-start">
                <h2 className="font-semibold text-base">{task?.title}</h2>
                <span className="text-xs opacity-70">
                  {task?.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : ""}
                </span>
              </div>

              <p className="text-sm opacity-80">{task?.description}</p>

              {user?.role === "admin" && (
                <div className="text-sm space-y-1">
                  <p>
                    <b>Assignee:</b> {task?.assignedUser?.username}
                  </p>
                  <p>
                    <b>Assigner:</b> {task?.assignedBy?.username}
                  </p>
                </div>
              )}

              {user?.role === "employee" && (
                <p className="text-sm">
                  <b>Assigner:</b> {task?.assignedBy?.username}
                </p>
              )}

              <div className="flex items-center justify-between mt-2 gap-2">
                {user?.role === "employee" && (
                  <select
                    className="select select-bordered select-sm w-full"
                    value={task?.status}
                    disabled={updatingStatus}
                    onChange={(e) =>
                      task?.id && handleStatusChange(task.id, e.target.value)
                    }
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="DONE">DONE</option>
                  </select>
                )}

                {user?.role === "admin" && (
                  <div className="flex gap-2 w-full">
                    <button
                      className="btn btn-sm btn-outline flex-1"
                      onClick={() =>
                        task?.id && router.push(`/edit-task/${task.id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => task?.id && handleDelete(task.id)}
                      className="btn btn-sm btn-error flex-1"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
