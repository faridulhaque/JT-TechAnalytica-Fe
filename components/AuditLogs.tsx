"use client";
import { useAuditLogsQuery } from "@/Services/queries/auditLogApi";
import { TAuditLog } from "@/Services/types";
import React from "react";

function AuditLogs() {
  const { data, isLoading } = useAuditLogsQuery("");
  const logs: TAuditLog[] = (data as any)?.data || [];

  if (isLoading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4 pt-3">Audit Logs</h2>

      {/* TABLE (md and up) */}
      <div className="hidden md:block overflow-x-auto bg-base-100 rounded-xl border border-base-200 shadow-sm">
        <table className="table w-full">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>Actor </th>
              <th>Action</th>
              <th>Task</th>
              <th>Changes</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs?.map((log) => (
              <tr key={log?.id} className="hover align-top">
                <td className="font-medium">{log?.actor?.username} ({log?.actor?.role})</td>
                <td>{log?.action}</td>
                <td className="max-w-xs truncate">{log?.targetTask?.title}</td>

                <td className="text-sm space-y-1">
                  {Object.entries(log?.data || {}).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium">{key}:</span> {value}
                    </div>
                  ))}
                </td>

                <td className="text-sm">
                  {log?.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="grid gap-4 md:hidden">
        {logs?.map((log) => (
          <div
            key={log?.id}
            className="card bg-base-100 border border-base-200 shadow-sm"
          >
            <div className="card-body p-4 gap-2 text-sm">
              <div className="flex justify-between items-start">
                <span className="font-semibold">{log?.actor?.username}</span>
                <span className="opacity-70 text-xs">
                  {log?.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : ""}
                </span>
              </div>

              <p>
                <b>Action:</b> {log?.action}
              </p>

              <p>
                <b>Task:</b> {log?.targetTask?.title}
              </p>

              <div className="space-y-1">
                <b>Changes:</b>
                {Object.entries(log?.data || {}).map(([key, value]) => (
                  <div key={key}>
                    {key}: {value}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AuditLogs;
