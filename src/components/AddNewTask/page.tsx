import { Button, Input } from "antd";
import { type FC, useState } from "react";

type AddNewTaskProps = {
  onAddTask: (tag: string) => void;
};

export const AddNewTask: FC<AddNewTaskProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");

  const addTask = () => {
    const tag = inputValue;
    if (tag) {
      onAddTask(tag);
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-row gap-2">
      <Input
        placeholder="Введите задачу"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="primary" onClick={addTask}>
        Добавить
      </Button>
    </div>
  );
};
