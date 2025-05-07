import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "../../types/Tasks/Tasks";

type UpdateTaskStatusPayload = {
  id: number;
};

type UpdateTaskTextPayload = {
  id: number;
  text: string;
};

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
      const newId = Math.max(...state.map((task) => task.id)) + 1;
      state.push({ ...action.payload, id: newId });
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<UpdateTaskStatusPayload>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = task.status === "solved" ? "pending" : "solved";
      }
    },
    updateTaskText: (state, action: PayloadAction<UpdateTaskTextPayload>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.tag = action.payload.text;
      }
    },
    reorderTasks: (_, action: PayloadAction<Task[]>) => {
      return action.payload;
    },
  },
});

export const {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskText,
  reorderTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
