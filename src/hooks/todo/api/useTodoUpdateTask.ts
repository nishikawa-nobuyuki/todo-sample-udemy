import { useState } from 'react';
import { mutate } from 'swr';

import { useMessageDialog } from '@/hooks/common/useMessageDialog';
import { APIError } from '@/lib/api/error';
import api from '@/lib/api/todo';
import { message } from '@/lib/data/message';

type UseTodoUpdateTask = () => {
  execute: (id: string, fields: { title?: string; completed?: boolean }) => Promise<boolean>;
  loading: boolean;
};

export const useTodoUpdateTask: UseTodoUpdateTask = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { openErrorDialog } = useMessageDialog();

  const execute = async (id: string, fields: { title?: string; completed?: boolean }) => {
    let ret = true;
    setLoading(true);
    try {
      // タスクを更新
      await api.todoUpdate(id, fields);
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
