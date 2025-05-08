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
import { useEffect } from "react";
import type { Task } from "@/shared/types/Tasks/Tasks";
import type { ApplyTasksPayload } from "@/shared/types/Payloads/TaskPayload";
import { tasksLocalStorage } from "@/shared/functions/TasksLocalStorage";

export const TodoListPage = () => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const _tasks = tasksLocalStorage.getTasks();
    if (_tasks) {
      dispatch(applyTasks({ tasks: _tasks satisfies Task[], filter: "all" }));
    }
  }, []);

  const handleAddTask = (title: string) => {
    dispatch(addTask({ title, status: "pending" }));
  };

  const handleUpdateTaskStatus = (id: string) => {
    dispatch(updateTaskStatus({ id }));
  };

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleUpdateTaskText = (id: string, text: string) => {
    dispatch(updateTaskText({ id, text }));
  };

  const handleReorder = (data: ApplyTasksPayload) => {
    dispatch(applyTasks(data));
  };

  return (
    <div className="flex flex-col items-center justify-center gap-5 mt-10">
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
