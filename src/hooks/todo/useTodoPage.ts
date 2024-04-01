import { useMemo } from 'react';

import { useTodoGetTasks } from '@/hooks/todo/api/useTodoGetTasks';
import { Task } from '@/lib/common/Task';

type UseTodoPage = () => { notCompletedTasks: Task[]; completedTasks: Task[] };

export const useTodoPage: UseTodoPage = () => {
  // タスクを取得
  const { taskList } = useTodoGetTasks();
  const notCompletedTasks = useMemo(() => taskList.filter((task) => !task.completed), [taskList]);
  const completedTasks = useMemo(() => taskList.filter((task) => task.completed), [taskList]);

  return {
    notCompletedTasks,
    completedTasks,
  };
};
