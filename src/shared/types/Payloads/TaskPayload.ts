import type { Task, FilterState } from "@/shared/types/Tasks/Tasks";

export type ApplyTasksPayload = {
  tasks: Task[];
  filter: FilterState;
};

export type AddTaskPayload = Omit<Task, "id">;
export type UpdateTaskStatusPayload = {
  id: number;
};
export type UpdateTaskTextPayload = {
  id: number;
  text: string;
};
