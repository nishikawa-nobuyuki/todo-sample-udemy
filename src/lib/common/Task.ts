export class Task {
  id: string;
  title: string;
  completed: boolean;
  createDate: string;
  isStart: boolean;
  startDate: string;
  deadline: string;

  constructor(taskRecord: {
    id: string;
    title: string;
    completed: boolean;
    createDate: string;
    isStart: boolean;
    startDate: string;
    deadline: string;
  }) {
    const { id, title, completed, createDate, isStart, startDate, deadline } = taskRecord;

    this.id = id;
    this.title = title;
    this.completed = completed;
    this.createDate = createDate;
    this.isStart = isStart;
    this.startDate = startDate;
    this.deadline = deadline;
  }
}
