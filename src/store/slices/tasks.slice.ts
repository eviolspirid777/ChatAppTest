import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/shared/types/Tasks/Tasks";

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
      localStorage.setItem("tasks", JSON.stringify(state));
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const result = state.filter((task) => task.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state));
      return result;
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<UpdateTaskStatusPayload>
    ) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.status = task.status === "solved" ? "pending" : "solved";
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
    updateTaskText: (state, action: PayloadAction<UpdateTaskTextPayload>) => {
      const task = state.find((task) => task.id === action.payload.id);
      if (task) {
        task.tag = action.payload.text;
        localStorage.setItem("tasks", JSON.stringify(state));
      }
    },
    applyTasks: (_, action: PayloadAction<Task[]>) => {
      const result = action.payload;
      localStorage.setItem("tasks", JSON.stringify(result));
      return result;
    },
  },
});

//TODO: тут можно рассмотреть вариант с добавлением withTypes(посмотри в своих проектах)
export const {
  addTask,
  deleteTask,
  updateTaskStatus,
  updateTaskText,
  applyTasks,
} = tasksSlice.actions;
export default tasksSlice.reducer;
