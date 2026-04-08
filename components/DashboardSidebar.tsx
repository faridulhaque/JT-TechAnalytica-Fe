"use client";
import { useCheckAuthQuery } from "@/Services/queries/authApi";
import { TUser } from "@/Services/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type TSidebar = {
  user: TUser;
};

function DashboardSidebar({ user }: TSidebar) {
  return (
    <ul className="menu gap-1">
      <li>
        <Link
          href="/dashboard"
          className="rounded-lg px-3 py-2 hover:bg-base-200 transition"
        >
          Dashboard
        </Link>
      </li>

      {user?.role === "admin" && (
        <>
          <li>
            <Link
              href="/audit-log"
              className="rounded-lg px-3 py-2 hover:bg-base-200 transition"
            >
              Audit Logs
            </Link>
          </li>

          <li>
            <Link
              href="/add-task"
              className="rounded-lg px-3 py-2 hover:bg-base-200 transition"
            >
              Add Task
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default DashboardSidebar;
