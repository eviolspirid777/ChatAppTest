import { createListenerMiddleware, isAnyOf, type AnyAction } from "@reduxjs/toolkit";
import { deleteTask, addTask, updateTaskStatus, updateTaskText, applyTasks } from "../slices/tasks.slice";
import { tasksLocalStorage } from "@/shared/functions/TasksLocalStorage";
import type { Task } from "@/shared/types/Tasks/Tasks";
import type { ApplyTasksPayload } from "@/shared/types/Payloads/TaskPayload";

export const taskLocalStorageMiddleware = createListenerMiddleware();

const isApplyTasks = (action: AnyAction) => action.type === applyTasks.type;

taskLocalStorageMiddleware.startListening({
    matcher: isAnyOf(addTask, deleteTask, updateTaskStatus, updateTaskText, applyTasks),
    effect: async (action, listenerApi) => {
        if(isApplyTasks(action) && (action.payload as ApplyTasksPayload).filter === "all") {
            const state = listenerApi.getState() as {tasks: Task[]};
            tasksLocalStorage.setTasks(state.tasks);
        } else {
            const state = listenerApi.getState() as {tasks: Task[]};
            tasksLocalStorage.setTasks(state.tasks);
        }
    }   
})