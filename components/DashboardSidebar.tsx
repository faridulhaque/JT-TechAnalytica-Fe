"use client";
import { useCheckAuthQuery } from "@/Services/queries/authApi";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function DashboardSidebar() {
  const { data, isLoading: isChecking } = useCheckAuthQuery("");
  const user = (data as any)?.data;

  return (
    <ul>
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>
      {user?.role === "admin" && (
        <>
          <li>
            <Link href="/audit-logs">Audit Logs</Link>
          </li>
          <li>
            <Link href="/add-task">Add Task</Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default DashboardSidebar;
