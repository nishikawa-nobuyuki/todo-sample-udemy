import { NextPage } from 'next';

import Question from '@/components/todo/Question';
import TodoAdd from '@/components/todo/TodoAdd';
import TodoEdit from '@/components/todo/TodoEdit';
import { useTodoPage } from '@/hooks/todo/useTodoPage';

const Page: NextPage = () => {
  const { completedTasks, notCompletedTasks } = useTodoPage();

  return (
    <div className="mx-auto mt-20 max-w-4xl">
      <div className="mt-8">
        <Question />
        <div className="mt-8 rounded-md border p-4">
          <h2 className="mb-3 text-h3">TODO</h2>
          {notCompletedTasks.map((task) => (
            <TodoEdit task={task} key={task.id} />
          ))}
        </div>
        <div className="mt-4 rounded-md border p-4">
          <h2 className="mb-3 text-h3">DONE</h2>
          {completedTasks.map((task) => (
            <TodoEdit task={task} key={task.id} />
          ))}
        </div>
        <TodoAdd />
      </div>
    </div>
  );
};

export default Page;
