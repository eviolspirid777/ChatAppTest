import { closestCenter, DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Checkbox, Input, Popconfirm } from "antd";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import type { Task } from "../../../../types/Tasks/Tasks";
import { useState, type FC } from "react";
import { CSS } from "@dnd-kit/utilities";

import styles from "./styles.module.scss";

type TaskListProps = {
  tasks: Task[];
  handleUpdateTaskStatus: (id: number) => void;
  handleDeleteTask: (id: number) => void;
  handleUpdateTaskText: (id: number, text: string) => void;
  handleReorder: (tasks: Task[]) => void;
};

const SortableItem: FC<{ task: Task; children: React.ReactNode }> = ({
  task,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </li>
  );
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
  
  const handleEditClick = (task: Task) => {
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

  return (
    <ul className="flex flex-col gap-2 mt-2">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <SortableItem key={task.id} task={task}>
              <div className={styles["task-item"]}>
                <Checkbox
                  checked={task.status === "solved"}
                  onChange={handleUpdateTaskStatus.bind(null, task.id)}
                />
                {editingId === task.id ? (
                  <Input
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onPressEnter={handleSaveEdit.bind(null, task.id)}
                    onBlur={handleSaveEdit.bind(null, task.id)}
                    autoFocus
                    className="w-full"
                  />
                ) : (
                  <div className={styles["task-content"]}>
                    <span
                      className={
                        task.status === "solved" ? styles["completed"] : ""
                      }
                    >
                      {task.tag}
                    </span>
                    <div onClick={(e) => e.stopPropagation()}>
                      <FaPencilAlt
                        className={styles["edit-icon"]}
                        onClick={handleEditClick.bind(null, task)}
                      />
                    </div>
                  </div>
                )}
                <Popconfirm
                  title="Вы уверены, что хотите удалить задачу?"
                  onConfirm={handleDeleteTask.bind(null, task.id)}
                  okText="Да"
                  cancelText="Нет"
                >
                  <FaTrash className={styles["delete-icon"]} />
                </Popconfirm>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </ul>
  );
};
