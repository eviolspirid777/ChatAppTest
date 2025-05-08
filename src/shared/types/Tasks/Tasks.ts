type TaskStatus = "solved" | "pending";

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
};

export type FilterState = "all" | "pending" | "solved";
