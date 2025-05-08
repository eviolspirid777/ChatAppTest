import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/shared/types/Tasks/Tasks";
import type {
  ApplyTasksPayload,
  UpdateTaskStatusPayload,
  UpdateTaskTextPayload,
} from "@/shared/types/Payloads/TaskPayload";
import { tasksLocalStorage } from "@/shared/functions/TasksLocalStorage";

const initialTaskState: Task[] = [
  {
    id: 1,
    status: "pending",
    tag: "Вынести мусор",
  },
  {
    id: 2,
    status: "pending",
    tag: "Выгулять собаку",
  },
  {
    id: 3,
    status: "solved",
    tag: "Поиграть в компьютер",
  },
  {
    id: 4,
    status: "pending",
    tag: "Приготовить покушать",
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newId = state.length;
      state.push({ ...action.payload, id: newId });
      tasksLocalStorage.setTasks(state);
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const result = state.filter((task) => task.id !== action.payload);
      tasksLocalStorage.setTasks(result);
      return result;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<UpdateTaskStatusPayload>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = task.status === "solved" ? "pending" : "solved";
        tasksLocalStorage.setTasks(state);
      }
    },
    updateTaskText: (state, action: PayloadAction<UpdateTaskTextPayload>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.tag = action.payload.text;
        tasksLocalStorage.setTasks(state);
      }
    },
    applyTasks: (previousState, action: PayloadAction<ApplyTasksPayload>) => {
      console.log(action);
      if (action.payload.filter === "all") {
        const result = action.payload.tasks;
        tasksLocalStorage.setTasks(result);
        return result;
      }
      return previousState;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskText,
  applyTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
