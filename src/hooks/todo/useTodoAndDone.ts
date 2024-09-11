import { useMemo } from 'react';

import { useTodoGetTasks } from '@/hooks/todo/api/useTodoGetTasks';
import { Task } from '@/lib/common/Task';

type UseTodoAndDone = () => { notStartTasks: Task[]; doingTasks: Task[]; completedTasks: Task[] };

export const useTodoAndDone: UseTodoAndDone = () => {
  // タスクを取得
  const { taskList } = useTodoGetTasks();

  // まだ開始されていない（ToDo 状態）タスク
  const notStartTasks = useMemo(
    () => taskList.filter((task) => !task.completed && !task.isStart),
    [taskList],
  );

  // 取り組んでいる(Doing 状態)タスク
  const doingTasks = useMemo(
    () => taskList.filter((task) => !task.completed && task.isStart),
    [taskList],
  );

  // 達成された（Done 状態）タスク
  const completedTasks = useMemo(() => taskList.filter((task) => task.completed), [taskList]);

  return {
    notStartTasks,
    doingTasks,
    completedTasks,
  };
};
