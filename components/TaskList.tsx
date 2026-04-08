"use client";
import {
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskStatusMutation,
} from "@/Services/queries/taskApi";
import { TUser, TTask } from "@/Services/types";
import { useRouter } from "next/navigation";

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

  if (tasksLoading) return <p className="text-center py-10">Loading...</p>;

  console.log("taks", tasks)

  return (
    <div className="p-4">
      {/* TABLE (md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
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
              <th>Created At</th>
              <th>Status</th>
              {user?.role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {tasks?.map((task) => (
              <tr key={task?.id}>
                <td>{task?.title}</td>
                <td>{task?.description}</td>

                {user?.role === "admin" && (
                  <>
                    <td>{task?.assignedUser?.username}</td>
                    <td>{task?.assignedBy?.username}</td>
                  </>
                )}

                {user?.role === "employee" && (
                  <td>{task?.assignedBy?.username}</td>
                )}

                <td>
                  {task?.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : ""}
                </td>

                <td>
                  <select
                    className="select select-sm"
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
                  <td className="flex gap-2">
                    <button
                      className="btn btn-sm"
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
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (mobile) */}
      <div className="grid gap-4 md:hidden">
        {tasks?.map((task) => (
          <div key={task?.id} className="card bg-base-100 shadow-md p-4">
            <h2 className="font-bold text-lg">{task?.title}</h2>
            <p>{task?.description}</p>

            <p className="text-sm">
              <span className="font-semibold">Created:</span>{" "}
              {task?.createdAt
                ? new Date(task.createdAt).toLocaleDateString()
                : ""}
            </p>

            {user?.role === "admin" && (
              <>
                <p>
                  <b>Assignee:</b> {task?.assignedUser?.username}
                </p>
                <p>
                  <b>Assigner:</b> {task?.assignedBy?.username}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    className="btn btn-sm"
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
              </>
            )}

            {user?.role === "employee" && (
              <>
                <p>
                  <b>Assigner:</b> {task?.assignedBy?.username}
                </p>

                <select
                  className="select select-sm mt-2"
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskList;
