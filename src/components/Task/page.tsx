import { Checkbox, Input, Popconfirm } from "antd";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

import styles from "./styles.module.scss"
import type { Task as TaskType } from "@/shared/types/Tasks/Tasks";
import type { FC } from "react";

type TaskProps = {
  task: TaskType,
  editingId: number | null,
  editingText: string,
  onEdittingTextChange: (value: string) => void,
  handleUpdateTaskStatus: (id: number) => void,
  handleSpaceAdd: (e: React.KeyboardEvent<HTMLInputElement>) => void,
  handleSaveEdit: (id: number) => void,
  handleEditClick: (task: TaskType) => void,
  handleDeleteTask: (id: number) => void,
}

export const Task: FC<TaskProps> = ({
  task,
  editingId,
  editingText,
  onEdittingTextChange,
  handleUpdateTaskStatus,
  handleSpaceAdd,
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
          onKeyDown={handleSpaceAdd}
          onPressEnter={handleSaveEdit.bind(null, task.id)}
          onBlur={handleSaveEdit.bind(null, task.id)}
          autoFocus
          className="w-full"
        />
      ) : (
        <div className={styles["task-content"]}>
          <span className={task.status === "solved" ? styles["completed"] : ""}>
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
  );
};
