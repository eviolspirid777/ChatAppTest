import type { Task } from "../types/Tasks/Tasks";

export const tasksLocalStorage = {
  getTasks: (): Task[] | null => {
    const tasks = localStorage.getItem("tasks");
    return tasks ? JSON.parse(tasks) : null;
  },
  setTasks: (tasks: Task[]) => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  },
};
