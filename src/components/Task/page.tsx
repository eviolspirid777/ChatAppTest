import { Checkbox, Input, Popconfirm } from "antd";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import type { Task as TaskType } from "@/shared/types/Tasks/Tasks";
import type { FC } from "react";

import styles from "./styles.module.css";

type TaskProps = {
  task: TaskType;
  editingId: string | null;
  editingText: string;
  onEdittingTextChange: (value: string) => void;
  handleUpdateTaskStatus: (id: string) => void;
  handleSaveEdit: (id: string) => void;
  handleEditClick: (task: TaskType) => void;
  handleDeleteTask: (id: string) => void;
};

export const Task: FC<TaskProps> = ({
  task,
  editingId,
  editingText,
  onEdittingTextChange,
  handleUpdateTaskStatus,
  handleSaveEdit,
  handleDeleteTask,
  handleEditClick,
}) => {
  return (
    <div className={styles["task-item"]}>
      <Checkbox
        checked={task.status === "solved"}
        onChange={handleUpdateTaskStatus.bind(null, task.id)}
      />
      {editingId === task.id ? (
        <Input
          value={editingText}
          onChange={(e) => onEdittingTextChange(e.target.value)}
          onPressEnter={handleSaveEdit.bind(null, task.id)}
          onBlur={handleSaveEdit.bind(null, task.id)}
          autoFocus
          className="w-full"
        />
      ) : (
        <div className={styles["task-content"]}>
          <span
            className={`${
              task.status === "solved" ? styles["completed"] : ""
            } ${styles["task-tag"]}`}
          >
            {task.title}
          </span>
          <FaPencilAlt
            className={styles["edit-icon"]}
            onClick={handleEditClick.bind(null, task)}
          />
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
  );
};
