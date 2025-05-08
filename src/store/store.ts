import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./slices/tasks.slice";
import { taskLocalStorageMiddleware } from "./middlewares/tasksLocalStorageMiddleware";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(taskLocalStorageMiddleware.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
