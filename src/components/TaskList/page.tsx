import { useState } from "react";
import type { FC } from "react";
import type { FilterState, Task } from "@/shared/types/Tasks/Tasks";

import { TaskList } from "@/components/TaskList";

type TaskListPageProps = {
  tasks: Task[];
  handleUpdateTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleUpdateTaskText: (id: number, text: string) => void;
  handleReorder: ({tasks, filter}: {tasks: Task[], filter: FilterState}) => void;
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
  
  const handleReorderMiddleware = (tasks: Task[]) => {
    handleReorder({tasks, filter: currentFilter});
  }

  return (
    <>
      <TaskList.Header
        filter={currentFilter}
        onFilterStateChange={setCurrentFilter}
      />
      <TaskList.List
        tasks={filteredTasks}
        filter={currentFilter}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTaskText={handleUpdateTaskText}
        handleReorder={handleReorderMiddleware}
      />
    </>
  );
};
