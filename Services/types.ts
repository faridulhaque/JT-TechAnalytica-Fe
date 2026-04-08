export type LoginData = {
  username: string;
  password: string;
};

export type TUser = {
  username: string;
  password: string;
  id: string;
  role: "admin" | "employee";
};

export type TCreateTask = {
  title: string;
  description: string;
  employeeId: string;
};

export type TUpdateTask = {
  taskId: string;
  title: string;
  description?: string;
  employeeId: string;
};

export type TTask = {
  id: string;
  title: string;
  description: string;
  status: "DONE" | "PENDING" | "PROCESSING";
  assignedUser: TUser;
  assignedBy: TUser;
  createdAt: string;
  updatedAt: string;
};

export type TAuditLog = {
  id: string;
  actor: TUser & { createdAt: string };
  action: "CREATE" | "UPDATE" | "DELETE";
  targetTask: TTask & { isDeleted: boolean };
  data: Partial<{
    title: string;
    description: string;
    employeeId: string;
  }>;
  createdAt: string;
};
