import { apiSlice } from "../apiSlice";
import { LoginData } from "../types";

const auditLogApi = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    auditLogs: builder.query({
      query: () => ({
        url: "/audit-log",
        method: "GET",
      }),
    }),
  }),
  // overrideExisting: true,
});

export const { useAuditLogsQuery } = auditLogApi;
