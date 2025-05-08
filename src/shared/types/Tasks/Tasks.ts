type TaskStatus = "solved" | "pending";

export type Task = {
  id: number;
  title: string;
  status: TaskStatus;
};

export type FilterState = "all" | "pending" | "solved";
