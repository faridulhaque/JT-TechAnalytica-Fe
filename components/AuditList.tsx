"use client";
import { useAuditLogsQuery } from "@/Services/queries/auditLogsApi";
import { TAuditLog } from "@/Services/types";
import React from "react";

function AuditList() {
  const { data, isLoading } = useAuditLogsQuery("");
  const logs: TAuditLog[] = (data as any)?.data || [];
  console.log("data", logs);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-4 w-full">
      <h2 className="text-xl font-bold mb-4">Audit Logs</h2>

      {/* TABLE (md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Actor</th>
              <th>Action</th>
              <th>Task</th>
              <th>Changes</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs?.map((log) => (
              <tr key={log?.id}>
                <td>{log?.actor?.username}</td>
                <td>{log?.action}</td>
                <td>{log?.targetTask?.title}</td>

                <td>
                  {Object.entries(log?.data || {}).map(([key, value]) => (
                    <div key={key}>
                      <b>{key}:</b> {value}
                    </div>
                  ))}
                </td>

                <td>
                  {log?.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CARD VIEW (sm and below) */}
      <div className="grid gap-4 md:hidden">
        {logs?.map((log) => (
          <div key={log?.id} className="card bg-base-100 shadow-md p-4">
            <p>
              <b>Actor:</b> {log?.actor?.username}
            </p>
            <p>
              <b>Action:</b> {log?.action}
            </p>
            <p>
              <b>Task:</b> {log?.targetTask?.title}
            </p>

            <div>
              <b>Changes:</b>
              {Object.entries(log?.data || {}).map(([key, value]) => (
                <div key={key}>
                  {key}: {value}
                </div>
              ))}
            </div>

            <p className="text-sm">
              <b>Date:</b>{" "}
              {log?.createdAt ? new Date(log.createdAt).toLocaleString() : ""}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditList;
