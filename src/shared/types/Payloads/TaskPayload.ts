import type { Task, FilterState } from "@/shared/types/Tasks/Tasks";

export type ApplyTasksPayload = {
  tasks: Task[];
  filter: FilterState;
};

export type AddTaskPayload = Omit<Task, "id">;
export type UpdateTaskStatusPayload = {
  id: string;
};
export type UpdateTaskTextPayload = {
  id: string;
  text: string;
};
