import { Button } from "antd";
import type { FC } from "react";

type TaskListHeaderProps = {
  handleSort: () => void;
  computeSortIcon: () => React.ReactNode;
};

export const TaskListHeader: FC<TaskListHeaderProps> = ({ handleSort, computeSortIcon }) => {
  return (
    <div className="flex flex-row gap-2 items-center">
      <h3 className="text-xl font-bold">Перечень</h3>
      <Button type="link" color="default" onClick={handleSort}>
        {computeSortIcon()}
      </Button>
    </div>
  );
};
