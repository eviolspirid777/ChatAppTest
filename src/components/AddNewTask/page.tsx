import { Button, Form, Input } from "antd";
import { type FC, useState } from "react";

type AddNewTaskProps = {
  onAddTask: (title: string) => void;
};

export const AddNewTask: FC<AddNewTaskProps> = ({ onAddTask }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addTask = () => {
    const title = inputValue.trim();
    if (!title) {
      setError("Поле не может быть пустым!");
      return;
    }
    onAddTask(title);
    setInputValue("");
    setError(null);
  };

  return (
    <div className="flex flex-row gap-2">
      <Form.Item
        style={{ marginBottom: 0 }}
        validateStatus={error ? "error" : ""}
        help={error}
      >
        <Input
          placeholder="Введите задачу"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError(null);
          }}
        />
      </Form.Item>
      <Button type="primary" onClick={addTask}>
        Добавить
      </Button>
    </div>
  );
};
