import { Tooltip } from "antd";
import { useState } from "react";
import type { FC } from "react";
import type { Task } from "../../../types/Tasks/Tasks";
import {
  FaSort,
  FaSortUp,
  FaSortDown,
} from "react-icons/fa";

import { TaskListHeader } from "./Header";
import { TaskList } from "./List/page";

type TaskListContainerProps = {
  tasks: Task[];
  handleUpdateTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleUpdateTaskText: (id: number, text: string) => void;
  handleReorder: (tasks: Task[]) => void;
};

export const TaskListContainer: FC<TaskListContainerProps> = ({
  tasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleUpdateTaskText,
  handleReorder,
}) => {
  const [sortDirection, setSortDirection] = useState<
    "asc" | "desc" | undefined
  >(undefined);

  const sortedTasks = tasks.toSorted((a) => {
    switch (sortDirection) {
      case "asc":
        return a.status === "solved" ? 1 : -1;
      case "desc":
        return a.status === "solved" ? -1 : 1;
      default:
        return 0;
    }
  });

  const computeSortIcon = () => {
    switch (sortDirection) {
      case "asc":
        return (
          <Tooltip title="Сортировка по убыванию">
            <FaSortDown />
          </Tooltip>
        );
      case "desc":
        return (
          <Tooltip title="Сортировка по возрастанию">
            <FaSortUp />
          </Tooltip>
        );
      case undefined:
        return (
          <Tooltip title="Сортировка">
            <FaSort />
          </Tooltip>
        );
    }
  };

  const handleSort = () => {
    setSortDirection((prev) => {
      switch (prev) {
        case "asc":
          return "desc";
        case "desc":
          return undefined;
        default:
          return "asc";
      }
    });
  };

  //TODO: Можно разбить на вложенные компоненты через точку. Нужно реализовать LocalStorage для сохранения задач
  return (
    <>
      <TaskListHeader
        handleSort={handleSort}
        computeSortIcon={computeSortIcon}
      />
      <TaskList
        tasks={sortedTasks}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTaskText={handleUpdateTaskText}
        handleReorder={handleReorder}
      />
    </>
  );
};
