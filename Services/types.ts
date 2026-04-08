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