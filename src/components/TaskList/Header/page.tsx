import { Radio } from "antd";
import { type FC } from "react";
import type { FilterState } from "@/types/Tasks/Tasks";

type TaskListHeaderProps = {
  filter: FilterState;
  onFilterStateChange?: (state: FilterState) => void;
};

export const TaskListHeader: FC<TaskListHeaderProps> = ({
  onFilterStateChange,
  filter,
}) => {
  return (
    <div >
      <Radio.Group
        value={filter}
        onChange={(e) => onFilterStateChange?.(e.target.value)}
        buttonStyle="solid"
      >
        <Radio.Button value="all">Все</Radio.Button>
        <Radio.Button value="pending">Активные</Radio.Button>
        <Radio.Button value="solved">Завершенные</Radio.Button>
      </Radio.Group>
    </div>
  );
};
