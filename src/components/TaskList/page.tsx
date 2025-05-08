import { useState } from "react";
import type { FC } from "react";
import type { FilterState, Task } from "@/types/Tasks/Tasks";

import { TaskList } from "@/components/TaskList";

type TaskListPageProps = {
  tasks: Task[];
  handleUpdateTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleUpdateTaskText: (id: number, text: string) => void;
  handleReorder: (tasks: Task[]) => void;
};

export const TaskListPage: FC<TaskListPageProps> = ({
  tasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleUpdateTaskText,
  handleReorder,
}) => {
  const [currentFilter, setCurrentFilter] = useState<FilterState>("all");

  const filteredTasks = tasks.filter((task) => {
    switch (currentFilter) {
      case "all":
        return true;
      case "pending":
        return task.status === "pending";
      case "solved":
        return task.status === "solved";
    }
  });

  return (
    <>
      <TaskList.Header
        filter={currentFilter}
        onFilterStateChange={(state) => setCurrentFilter(state)}
      />
      <TaskList.List
        tasks={filteredTasks}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTaskText={handleUpdateTaskText}
        handleReorder={handleReorder}
      />
    </>
  );
};
