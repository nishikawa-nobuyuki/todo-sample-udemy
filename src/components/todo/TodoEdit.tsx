import Button from '@/components/common/parts/Button';
import CommonDialog from '@/components/common/parts/CommonDialog';
import RhfCheckboxLabel from '@/components/common/rhf/RhfCheckboxLabel';
import RhfInput from '@/components/common/rhf/RhfInput';
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
    loadingTodoDelete,
    isTaskChanged,
    isOverDeadline,
  } = useTodoEdit({ task });
  return (
    <>
      {/* ダイアログ */}
      <CommonDialog
        canCloseOtherClick={false}
        isOpen={isOpen}
        handleClose={handleClose}
        className="max-w-sm"
      >
        {/* タスク入力ラベル */}
        <div className="mb-3">
          <label className="text-h3">タスク名</label>
          <RhfInput name="title" control={control} className="mt-2 w-full" placeholder="タスク名" />
        </div>

        {/* 期限日入力ラベル */}
        <div className="mb-3">
          <label className="text-h3">期限</label>
          <RhfInput
            name="deadline"
            control={control}
            type="date"
            className="mt-2 w-full"
            placeholder="タスク名"
          />
        </div>

        {/* 「達成済み」のチェックボックス */}
        <RhfCheckboxLabel label="タスクを始める" name="isStart" control={control} />
        <div className="mt-8 flex space-x-2">
          {/* タスク名を変更する */}
          <Button
            onClick={handleClickUpdate}
            variant="primary"
            label="変更を保存"
            loading={loadingTodoUpdate}
            disabled={!isTaskChanged}
          />
          {/* タスクを削除 */}
          <Button
            loading={loadingTodoDelete}
            onClick={handleTaskDelete}
            variant="error"
            label="削除"
          />

          {/* 閉じる */}
          <Button onClick={handleClose} variant="text" label="閉じる" />
        </div>
      </CommonDialog>

      {/* タスクの表示 */}

      <button
        onClick={handleOpen}
        className={`mr-2 mt-3 cursor-pointer rounded-md ${!isOverDeadline(task.deadline) ? 'bg-primary' : 'bg-red-500'} px-2 py-1 text-body2 text-white`}
      >
        <h3 className="text-h3">{task.title}</h3>
        <p className="text-sm">{`作成日: ${task.createDate}`}</p>
        <p className="text-sm">{`期限日: ${task.deadline.replace(/-/g, '/')}`}</p>
      </button>
    </>
  );
};

export default TodoEdit;
