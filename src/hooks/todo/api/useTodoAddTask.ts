import { useState } from 'react';
import { mutate } from 'swr';

import { useMessageDialog } from '@/hooks/common/useMessageDialog';
import { APIError } from '@/lib/api/error';
import api from '@/lib/api/todo';
import { message } from '@/lib/data/message';

type UseTodoAddTask = () => {
  execute: (title: string) => Promise<boolean>;
  loading: boolean;
};

export const useTodoAddTask: UseTodoAddTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openErrorDialog } = useMessageDialog();

  const execute = async (title: string) => {
    let ret = true;
    setLoading(true);
    try {
      // タスクを追加
      await api.todoAdd(title);
    } catch (e) {
      if (APIError.isBadRequest(e)) {
        await openErrorDialog(message.form.form01Error);
      }
      ret = false;
    }
    // キャッシュ削除・再フェッチ
    void mutate(api.url());
    setLoading(false);
    return ret;
  };

  return {
    execute,
    loading,
  };
};
