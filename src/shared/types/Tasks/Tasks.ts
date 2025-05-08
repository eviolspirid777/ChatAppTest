type TaskStatus = "solved" | "pending";

export type Task = {
  id: number;
  tag: string;
  status: TaskStatus;
};

export type FilterState = "all" | "pending" | "solved";
