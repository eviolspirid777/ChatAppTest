import type { Task, FilterState } from "@/shared/types/Tasks/Tasks";

export type ApplyTasksPayload = {
  tasks: Task[];
  filter: FilterState;
};