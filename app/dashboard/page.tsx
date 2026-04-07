import LoginForm from "@/components/LoginForm";
import Logout from "@/components/Logout";
import Image from "next/image";
import Link from "next/link";

export default function dashboard() {
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

        <div className="h-full w-full bg-green-500"></div>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="menu bg-base-200 min-h-full w-80 p-4 flex flex-col">
          {/* Top items */}
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/audit-logs">Audit Logs</Link>
            </li>
          </ul>

          <Logout></Logout>
        </div>
      </div>
    </div>
  );
}
