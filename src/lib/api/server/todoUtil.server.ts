import fs from 'fs/promises';
import path from 'path';

import { Task } from '@/lib/common/Task';

const DATA_DIR = path.join(process.cwd(), 'src/db');

const FILE_NAME = 'data.json';

export const UtilErrorCodes = {
  FAILED_TO_LOAD_TASK: 'failedToLoadTask',
  NOT_FOUND_TASK: 'notFoundTask',
  OTHER_ERROR: 'otherError',
} as const;

export type UtilErrorCodes = (typeof UtilErrorCodes)[keyof typeof UtilErrorCodes];

class SuccessResponse<T> {
  isSuccess: true;
  data: T;

  constructor(data: T) {
    this.isSuccess = true;
    this.data = data;
  }
}

class ErrorResponse {
  isSuccess: false;
  errorCode: UtilErrorCodes;

  constructor(errorCode: UtilErrorCodes) {
    this.isSuccess = false;
    this.errorCode = errorCode;
  }
}

export type UtilResponse<T> = SuccessResponse<T> | ErrorResponse;

const getToday = () => {
  const now = new Date(Date.now());
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${year}/${month}/${day}`;
};

// タスクを取得
export const getTasks = async (): Promise<UtilResponse<Task[]>> => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, FILE_NAME));
    const taskList = JSON.parse(data.toString()) as Task[];
    return new SuccessResponse(taskList);
  } catch (error) {
    console.error('タスクの読み込み中にエラーが発生しました:', error);
    return new ErrorResponse(UtilErrorCodes.FAILED_TO_LOAD_TASK);
  }
};

// タスクの追加
export const addTask = async (title: string, deadline: string): Promise<UtilResponse<null>> => {
  const getTaskResponse = await getTasks();
  if (!getTaskResponse.isSuccess) {
    return new ErrorResponse(UtilErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  const newTask: Task = {
    id: Date.now().toString(),
    title,
    completed: false,
    createDate: getToday(),
    isStart: false,
    startDate: '',
    deadline,
  };
  const newTaskList = [...taskList, newTask];
  await fs.writeFile(path.join(DATA_DIR, FILE_NAME), JSON.stringify(newTaskList));
  return new SuccessResponse(null);
};

// id を指定して、title, completed, isStart, deadline を更新
export const updateTask = async (
  id: string,
  fields: { title?: string; completed?: boolean; isStart?: boolean; deadline?: string },
): Promise<UtilResponse<null>> => {
  const getTaskResponse = await getTasks();
  if (!getTaskResponse.isSuccess) {
    return new ErrorResponse(UtilErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  // 該当の taskId をもつ Task が存在するかどうかを判定する。存在しなかった場合は何もしない。
  const selectedTaskIndex = taskList.findIndex((task) => task.id === id);
  if (selectedTaskIndex === -1) {
    return new ErrorResponse(UtilErrorCodes.NOT_FOUND_TASK);
  }

  const newTaskList = taskList.map((task) => {
    if (task.id === id) {
      if (fields.isStart !== task.isStart && fields.isStart === true) {
        task.startDate = getToday();
      }
      return { ...task, ...fields };
    } else {
      return task;
    }
  });
  await fs.writeFile(path.join(DATA_DIR, FILE_NAME), JSON.stringify(newTaskList));
  return new SuccessResponse(null);
};

// Task の削除
export const deleteTask = async (id: string): Promise<UtilResponse<null>> => {
  const getTaskResponse = await getTasks();

  if (!getTaskResponse.isSuccess) {
    return new ErrorResponse(UtilErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  const newTaskList = taskList.filter((task) => task.id !== id);
  await fs.writeFile(path.join(DATA_DIR, FILE_NAME), JSON.stringify(newTaskList));
  return new SuccessResponse(null);
};
