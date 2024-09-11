import DoingEdit from '@/components/todo/DoingEdit';
import DoneEdit from '@/components/todo/DoneEdit';
import TodoEdit from '@/components/todo/TodoEdit';
import { useTodoAndDone } from '@/hooks/todo/useTodoAndDone';

const TodoAndDone = (): JSX.Element => {
  const { completedTasks, notStartTasks, doingTasks } = useTodoAndDone();
  return (
    <>
      {/* TO DO を表示 */}
      <div className="mt-8 rounded-md border p-4">
        <h2 className="mb-3 text-h3">TODO</h2>
        <div className="flex flex-wrap">
          {notStartTasks.map((task) => (
            <TodoEdit task={{ ...task }} key={task.id} />
          ))}
        </div>
      </div>

      {/* Doing を表示 */}
      <div className="mt-4 rounded-md border p-4">
        <h2 className="mb-3 text-h3">DOING</h2>
        <div className="flex flex-wrap">
          {doingTasks.map((task) => (
            <DoingEdit task={{ ...task }} key={task.id} />
          ))}
        </div>
      </div>

      {/* Done を表示 */}
      <div className="mt-4 rounded-md border p-4">
        <h2 className="mb-3 text-h3">DONE</h2>
        <div className="flex flex-wrap">
          {completedTasks.map((task) => (
            <DoneEdit task={{ ...task }} key={task.id} />
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoAndDone;
