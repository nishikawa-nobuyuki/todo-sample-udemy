import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { DialogTypes, MessageDialogState, messageDialogState } from '@/hooks/atom/messageDialog';

// hook の戻り値
// 各種ダイアログを open するための関数を返す
type UseMessageDialog = () => {
  dialog: MessageDialogState;
  // 確認メッセージ表示用
  openConfirmDialog: (openConfirmDialogArgs: {
    title: string;
    content?: string;
    okLabel?: string;
    ngLabel?: string;
  }) => Promise<boolean>;
  //メッセージ表示用
  openMessageDialog: (openMessageDialogArgs: { title: string; content?: string }) => Promise<void>;
  //エラー表示用
  openErrorDialog: (openMessageDialogArgs: { title: string; content?: string }) => Promise<void>;
};

export const useMessageDialog: UseMessageDialog = () => {
  const [dialog, setMessageDialog] = useRecoilState(messageDialogState);

  const handleClose = useCallback(() => {
    setMessageDialog({
      ...dialog,
      isOpen: false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openConfirmDialog = useCallback(
    (openConfirmDialogArgs: {
      title: string;
      content?: string;
      okLabel?: string;
      ngLabel?: string;
    }): Promise<boolean> => {
      const { title, content, okLabel, ngLabel } = openConfirmDialogArgs;

      return new Promise((resolve: (ret: boolean) => void) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve(true);
          },
        };
        const ngAction = {
          handleClick: () => {
            handleClose();
            resolve(false);
          },
        };
        const state: MessageDialogState = {
          title: title,
          content: content,
          dialogType: DialogTypes.Confirm,
          isOpen: true,
          actions: [okAction, ngAction],
          labels: [okLabel, ngLabel],
        };
        setMessageDialog(state);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const openMessageDialog = useCallback(
    (openMessageDialogArgs: { title: string; content?: string }): Promise<void> => {
      const { title, content } = openMessageDialogArgs;
      return new Promise((resolve: () => void) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve();
          },
        };
        const state: MessageDialogState = {
          title: title,
          content: content,
          dialogType: DialogTypes.Message,
          isOpen: true,
          actions: [okAction],
        };
        setMessageDialog(state);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const openErrorDialog = useCallback(
    (openErrorDialogArgs: { title: string; content?: string }): Promise<void> => {
      const { title, content } = openErrorDialogArgs;

      return new Promise((resolve: () => void) => {
        const okAction = {
          handleClick: () => {
            handleClose();
            resolve();
          },
        };
        const state: MessageDialogState = {
          title: title,
          content: content,
          dialogType: DialogTypes.Error,
          isOpen: true,
          actions: [okAction],
        };
        setMessageDialog(state);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    dialog,
    openConfirmDialog,
    openMessageDialog,
    openErrorDialog,
  };
};
