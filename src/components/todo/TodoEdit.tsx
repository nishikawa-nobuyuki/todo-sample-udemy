import CommonCheckboxLabel from '@/components/common/CommonCheckBoxLabel';
import CommonInput from '@/components/common/CommonInput';
import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import { useTodoEdit } from '@/hooks/todo/useTodoEdit';
import { Task } from '@/lib/common/Task';

type Props = {
  task: Task;
};

const TodoEdit = (props: Props): JSX.Element => {
  const { task } = props;
  const {
    isOpen,
    control,
    handleOpen,
    handleClose,
    handleClickUpdate,
    handleTaskDelete,
    loadingTodoUpdate,
  } = useTodoEdit({ task });
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
        <CommonCheckboxLabel label="達成済み" name="completed" control={control} />
        <div className="mt-8 flex space-x-2">
          {/* タグ名を変更する */}
          <Button
            onClick={handleClickUpdate}
            variant="primary"
            label="変更を保存"
            loading={loadingTodoUpdate}
          />
          <Button onClick={handleTaskDelete} variant="error" label="削除" />
          <Button onClick={handleClose} variant="text" label="閉じる" />
        </div>
      </CommonDialog>
      <span
        onClick={handleOpen}
        className="mr-2 cursor-pointer rounded-full bg-primary px-2 py-1 text-body2 text-white"
      >
        {task.title}
      </span>
    </>
  );
};

export default TodoEdit;
