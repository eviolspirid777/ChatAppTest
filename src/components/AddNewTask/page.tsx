import { Button, Input, type InputRef } from "antd";
import { memo, useRef, type FC } from "react";

type AddNewTaskProps = {
  onAddTask: (tag: string) => void;
};

export const AddNewTask: FC<AddNewTaskProps> = memo(
  ({ onAddTask }) => {
    const inputRef = useRef<InputRef>(null);

    const addTask = () => {
      const tag = inputRef.current?.input?.value;
      if (tag) {
        onAddTask(tag);
        if (inputRef.current?.input) {
          inputRef.current.input.value = "";
        }
      }
    };

    return (
      <div className="flex flex-row gap-2">
        <Input placeholder="Введите задачу" ref={inputRef} />
        <Button type="primary" onClick={addTask}>
          Добавить
        </Button>
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.onAddTask === nextProps.onAddTask;
  }
);
