"use client";
import { useCheckAuthQuery } from "@/Services/queries/authApi";
import { TUser } from "@/Services/types";
import Link from "next/link";
import React, { useEffect, useState } from "react";
type TSidebar = {
  user: TUser,
}

function DashboardSidebar({user}: TSidebar) {
 

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
