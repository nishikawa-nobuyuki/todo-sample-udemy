import { atom, useAtom } from 'jotai';

import { __log } from '@/lib/common/log';

// ボタンへの設定
export type ErrorDialogAction = {
  handleClick: () => void;
};

export type ErrorDialogState = {
  title: string;
  content?: string;
  isOpen: boolean;
  actions: ErrorDialogAction[];
  labels?: (string | undefined)[];
};

export const errorDialogAtom = atom<ErrorDialogState>({
  title: '',
  content: '',
  isOpen: false,
  actions: [
    {
      handleClick: () => {
        __log('do nothing');
      },
    },
  ],
});

// errorDialogState を利用するカスタムフック
export const useGlobalErrorDialogState = (): {
  globalErrorDialogState: ErrorDialogState;
  setGlobalErrorDialogState: (
    update: ErrorDialogState | ((prev: ErrorDialogState) => ErrorDialogState),
  ) => void;
} => {
  const [state, setState] = useAtom(errorDialogAtom);
  return { globalErrorDialogState: state, setGlobalErrorDialogState: setState };
};
