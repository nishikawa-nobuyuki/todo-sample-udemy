import { atom } from 'recoil';

import { __log } from '@/lib/common/log';

// ダイアログの種類
export const DialogTypes = {
  Confirm: 'confirm',
  Message: 'message',
  Error: 'error',
};
export type DialogType = (typeof DialogTypes)[keyof typeof DialogTypes];

// ボタンへの設定
export type MessageDialogAction = {
  handleClick: () => void;
};

export type MessageDialogState = {
  title: string;
  content?: string;
  dialogType: DialogType;
  isOpen: boolean;
  actions: MessageDialogAction[];
  labels?: (string | undefined)[];
};

export const messageDialogState = atom<MessageDialogState>({
  key: 'messageDialogState',
  default: {
    title: '',
    content: '',
    dialogType: DialogTypes.Message,
    isOpen: false,
    actions: [
      {
        handleClick: () => {
          // eslint-disable-next-line no-console
          __log('do nothing');
        },
      },
    ],
  },
});
