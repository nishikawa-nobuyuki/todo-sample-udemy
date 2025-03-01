import { useCallback } from 'react';

import { ErrorDialogState } from '@/hooks/atom/errorDialogState';
import { useGlobalErrorDialogState } from '@/hooks/atom/errorDialogState';

// hook の戻り値型
// ダイアログを open するための関数を返す
type UseErrorDialogReturn = {
  dialog: ErrorDialogState;
  // エラー表示用
  openErrorDialog: (args: { title: string; content?: string }) => Promise<void>;
};

export const useErrorDialog = (): UseErrorDialogReturn => {
  const { globalErrorDialogState, setGlobalErrorDialogState } = useGlobalErrorDialogState();

  // ダイアログを閉じる関数
  const handleClose = useCallback(() => {
    setGlobalErrorDialogState((prev: ErrorDialogState) => ({
      ...prev,
      isOpen: false,
    }));
  }, [setGlobalErrorDialogState]);

  // ダイアログを開く関数（Promise で解決する）
  const openErrorDialog = useCallback(
    (args: { title: string; content?: string }): Promise<void> => {
      const { title, content } = args;
      return new Promise((resolve) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve();
          },
        };

        const newState: ErrorDialogState = {
          title,
          content,
          isOpen: true,
          actions: [okAction],
        };

        setGlobalErrorDialogState(newState);
      });
    },
    [handleClose, setGlobalErrorDialogState],
  );

  return {
    dialog: globalErrorDialogState,
    openErrorDialog,
  };
};
