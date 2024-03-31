import fs from 'fs/promises';
import path from 'path';

import { Task } from '@/lib/common/Task';

const DATA_DIR = path.join(process.cwd(), 'src/db');

const FILE_NAME = 'data.json';

export const ErrorCodes = {
  FAILED_TO_LOAD_TASK: 'failedToLoadTask',
  NOT_FOUND_TASK: 'notFoundTask',
  OTHER_ERROR: 'otherError',
} as const;

export type ErrorCodes = (typeof ErrorCodes)[keyof typeof ErrorCodes];

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
  errorCode: ErrorCodes;

  constructor(errorCode: ErrorCodes) {
    this.isSuccess = false;
    this.errorCode = errorCode;
  }
}

export type UtilResponse<T> = SuccessResponse<T> | ErrorResponse;

// タスクを取得
export const getTasks = async (): Promise<UtilResponse<Task[]>> => {
  try {
    const data = await fs.readFile(path.join(DATA_DIR, FILE_NAME));
    const taskList = JSON.parse(data.toString()) as Task[];
    return new SuccessResponse(taskList);
  } catch (error) {
    console.error('タスクの読み込み中にエラーが発生しました:', error);
    return new ErrorResponse(ErrorCodes.NOT_FOUND_TASK);
  }
};

// タスクの追加
export const addTask = async (title: string): Promise<UtilResponse<null>> => {
  const getTaskResponse = await getTasks();
  if (!getTaskResponse.isSuccess) {
    return new ErrorResponse(ErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  const newTask: Task = { id: Date.now().toString(), title, completed: false };
  const newTaskList = [...taskList, newTask];
  await fs.writeFile(path.join(DATA_DIR, FILE_NAME), JSON.stringify(newTaskList));
  return new SuccessResponse(null);
};

// id を指定して、title もしくは completed を更新
export const updateTask = async (
  id: string,
  fields: { title?: string; completed?: boolean },
): Promise<UtilResponse<null>> => {
  const getTaskResponse = await getTasks();
  if (!getTaskResponse.isSuccess) {
    return new ErrorResponse(ErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  // 該当の taskId をもつ Task が存在するかどうかを判定する。存在しなかった場合は何もしない。
  const selectedTaskIndex = taskList.findIndex((task) => task.id === id);
  if (selectedTaskIndex === -1) {
    return new ErrorResponse(ErrorCodes.NOT_FOUND_TASK);
  }

  const newTaskList = taskList.map((task) => {
    if (task.id === id) {
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
    return new ErrorResponse(ErrorCodes.FAILED_TO_LOAD_TASK);
  }
  const taskList = getTaskResponse.data;

  const newTaskList = taskList.filter((task) => task.id !== id);
  await fs.writeFile(path.join(DATA_DIR, FILE_NAME), JSON.stringify(newTaskList));
  return new SuccessResponse(null);
};
