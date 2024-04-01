import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import * as z from 'zod';

import { useTodoDeleteTask } from '@/hooks/todo/api/useTodoDeleteTask';
import { useTodoUpdateTask } from '@/hooks/todo/api/useTodoUpdateTask';
import { Task } from '@/lib/common/Task';

const schema = z.object({
  title: z.string().min(1, 'タスク名を入力してください').max(50, '50文字以内で入力してください'),
  completed: z.boolean(),
});

type TaskInput = z.infer<typeof schema>;

const DEFAULT_TASK_INPUT = {
  title: '',
  completed: false,
};

type UseTodoEdit = (args: { task: Task }) => {
  isOpen: boolean;
  control: Control<TaskInput>;
  handleOpen: () => void;
  handleClose: () => void;
  handleClickUpdate: () => Promise<void>;
  handleTaskDelete: () => Promise<void>;
  loadingTodoUpdate: boolean;
};

export const useTodoEdit: UseTodoEdit = (props) => {
  const { task } = props;
  const [isOpen, setIsOpen] = useState(false);
  const { control, handleSubmit, setValue, reset } = useForm<TaskInput>({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_TASK_INPUT,
  });
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleOpen = () => {
    setValue('title', task.title);
    setValue('completed', task.completed);
    setIsOpen(true);
  };

  // タスクを更新
  const apiTodoUpdate = useTodoUpdateTask();
  const onSubmit = async (data: TaskInput) => {
    const { title, completed } = data;
    const isSuccess = await apiTodoUpdate.execute(task.id, { title, completed });
    if (!isSuccess) {
      return; // 何もしない
    }
    reset();
    handleClose();
  };

  // タスクを削除
  const apiTodoDelete = useTodoDeleteTask();
  const handleTaskDelete = async () => {
    await apiTodoDelete.execute(task.id);
  };

  return {
    isOpen,
    control,
    handleOpen,
    handleClose,
    handleClickUpdate: handleSubmit(onSubmit),
    handleTaskDelete,
    loadingTodoUpdate: apiTodoUpdate.loading,
  };
};
