import CommonInput from '@/components/common/CommonInput';
import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import { useTodoAdd } from '@/hooks/todo/useTodoAdd';

const TodoAdd = (): JSX.Element => {
  const { isOpen, control, handleOpen, handleClose, handleClickUpdate } = useTodoAdd();

  return (
    <>
      <CommonDialog
        canCloseOtherClick={false}
        isOpen={isOpen}
        handleClose={handleClose}
        className="max-w-sm"
      >
        <div className="mb-3">
          <label className="text-h3">タスク名</label>
          <CommonInput
            name="title"
            control={control}
            className="mt-2 w-full"
            placeholder="タスク名"
          />
        </div>

        <div className="mt-8 flex space-x-2">
          {/* タグ名を変更する */}
          <Button onClick={handleClickUpdate} variant="primary" label="変更を保存" />

          <Button onClick={handleClose} variant="text" label="閉じる" />
        </div>
      </CommonDialog>
      <Button onClick={handleOpen} className="mt-4" variant="primary" label="新規タスク追加" />
    </>
  );
};

export default TodoAdd;
