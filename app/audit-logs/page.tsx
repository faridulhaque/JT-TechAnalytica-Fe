"use client";
import AuditList from "@/components/AuditList";
import DashboardSidebar from "@/components/DashboardSidebar";
import Logout from "@/components/Logout";
import TaskList from "@/components/TaskList";
import { useCheckAuthQuery } from "@/Services/queries/authApi";
import { useRouter } from "next/navigation";

export default function dashboard() {
  const router = useRouter();
  const { data, isLoading: isChecking, isError } = useCheckAuthQuery("");
  const user = (data as any)?.data;

  if (isError) {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <label
          htmlFor="my-drawer-3"
          className="btn drawer-button lg:hidden mt-5"
        >
          Open Sidebar
        </label>

        <div className="min-h-screen p-4">
          <AuditList />
        </div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col">
          {/* Top items */}
          <DashboardSidebar user={user}></DashboardSidebar>

          <Logout></Logout>
        </div>
      </div>
    </div>
  );
}
