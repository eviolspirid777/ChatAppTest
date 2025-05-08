import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Task } from "@/shared/types/Tasks/Tasks";
import type {
  ApplyTasksPayload,
  UpdateTaskStatusPayload,
  UpdateTaskTextPayload,
} from "@/shared/types/Payloads/TaskPayload";

const initialTaskState: Task[] = [
  {
    id: "1",
    status: "pending",
    title: "Вынести мусор",
  },
  {
    id: "2",
    status: "pending",
    title: "Выгулять собаку",
  },
  {
    id: "3",
    status: "solved",
    title: "Поиграть в компьютер",
  },
  {
    id: "4",
    status: "pending",
    title: "Приготовить покушать",
  },
];

export const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialTaskState,
  reducers: {
    addTask: (state, action: PayloadAction<Omit<Task, "id">>) => {
      const newId = crypto.randomUUID();
      state.push({ ...action.payload, id: newId });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const result = state.filter((task) => task.id !== action.payload);
      return result;
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
        task.title = action.payload.text;
      }
    },
    applyTasks: (previousState, action: PayloadAction<ApplyTasksPayload>) => {
      if (action.payload.filter === "all") {
        const result = action.payload.tasks;
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
