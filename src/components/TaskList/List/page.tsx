import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Task as TaskType } from "@/types/Tasks/Tasks";
import { useState, type FC } from "react";

import { SortableItem } from "@/shared/components/SortableItem";
import { Task } from "@/components/Task";

type TaskListProps = {
  tasks: TaskType[];
  handleUpdateTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleUpdateTaskText: (id: number, text: string) => void;
  handleReorder: (tasks: TaskType[]) => void;
};

export const TaskList: FC<TaskListProps> = ({
  tasks,
  handleUpdateTaskStatus,
  handleDeleteTask,
  handleUpdateTaskText,
  handleReorder,
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const handleSpaceAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Space") {
      setEditingText((prev) => prev + " ");
    }
  };

  const handleEditClick = (task: TaskType) => {
    setEditingId(task.id);
    setEditingText(task.tag);
  };

  const handleSaveEdit = (id: number) => {
    handleUpdateTaskText(id, editingText);
    setEditingId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(tasks, oldIndex, newIndex);
      handleReorder(newTasks);
    }
  };

  //TODO: перестает работать DnD после редактирования записи
  //TODO: посмотри как можно эллегантнее зафиксить баг с тем, чтобы пробел можно было добавлять
  return (
    <ul className="relative flex flex-col gap-2 mt-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToParentElement]}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableItem key={task.id} task={task}>
              <Task
                task={task}
                editingId={editingId}
                editingText={editingText}
                handleDeleteTask={handleDeleteTask}
                handleEditClick={handleEditClick}
                handleSaveEdit={handleSaveEdit}
                handleSpaceAdd={handleSpaceAdd}
                handleUpdateTaskStatus={handleUpdateTaskStatus}
                onEdittingTextChange={setEditingText}
              />
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};
