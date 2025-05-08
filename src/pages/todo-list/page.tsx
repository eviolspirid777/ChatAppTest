import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import {
  addTask,
  updateTaskStatus,
  deleteTask,
  updateTaskText,
  applyTasks,
} from "@/store/slices/tasks.slice";
import { TaskListPage } from "@/components/TaskList";
import { AddNewTask } from "@/components/AddNewTask";
import { useCallback, useEffect } from "react";
import type { Task } from "@/types/Tasks/Tasks";

export const TodoListPage = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const _tasks = localStorage.getItem("tasks");
    if (_tasks) {
      dispatch(applyTasks(JSON.parse(_tasks) satisfies Task[]));
    }
  }, []);

  const handleAddTask = useCallback((tag: string) => {
    dispatch(addTask({ tag, status: "pending" }));
  }, []);

  const handleUpdateTaskStatus = (id: number) => {
    dispatch(updateTaskStatus({ id }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleUpdateTaskText = (id: number, text: string) => {
    dispatch(updateTaskText({ id, text }));
  };

  const handleReorder = (tasks: Task[]) => {
    dispatch(applyTasks(tasks));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-2xl font-bold underline mb-4">Todo List</h2>
      <AddNewTask onAddTask={handleAddTask} />
      <TaskListPage
        tasks={tasks}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
        handleUpdateTaskText={handleUpdateTaskText}
        handleReorder={handleReorder}
      />
    </div>
  );
};
