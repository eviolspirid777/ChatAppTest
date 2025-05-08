import type { FC } from "react";
import type { Task } from "@/shared/types/Tasks/Tasks";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BsGripVertical } from "react-icons/bs";

import styles from "./styles.module.css";

type SortableItemProps = {
  task: Task;
  children: React.ReactNode;
  isDisabled: boolean;
};

export const SortableItem: FC<SortableItemProps> = ({
  task,
  isDisabled,
  children,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      className={`${styles["task-item"]} ${isDisabled && styles["disabled"]}`}
      ref={setNodeRef}
      style={style}
    >
      {!isDisabled && (
        <BsGripVertical
          className={styles["drag-handle"]}
          size={20}
          {...attributes}
          {...listeners}
        />
      )}
      {children}
    </li>
  );
};
