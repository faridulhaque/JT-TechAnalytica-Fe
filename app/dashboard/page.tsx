"use client";
import DashboardSidebar from "@/components/DashboardSidebar";
import Loading from "@/components/Loading";
import Logout from "@/components/Logout";
import TaskList from "@/components/TaskList";
import { useCheckAuthQuery } from "@/Services/queries/authApi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function dashboard() {
  const router = useRouter();
  const { data, isLoading: isChecking, isError } = useCheckAuthQuery("");
  const user = (data as any)?.data;

  useEffect(() => {
    if (isChecking) return;

    if (isError) {
      localStorage.removeItem("token");
      router.replace("/");
    }
  }, [isError, isChecking]);

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-200">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Top bar (mobile) */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <label htmlFor="my-drawer-3" className="btn btn-outline btn-sm">
            ☰
          </label>
          <h2 className="font-semibold text-lg">Tasks</h2>
          <div />
        </div>

        {/* Main content */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 pb-6">
          <TaskList user={user} />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        />

        <div className="menu bg-base-100 min-h-full w-72 p-4 flex flex-col border-r border-base-200">
          <div className="flex-1">
            <DashboardSidebar user={user} />
          </div>

          <div className="pt-4 border-t border-base-200">
            <Logout />
          </div>
        </div>
      </div>
    </div>
  );
}
