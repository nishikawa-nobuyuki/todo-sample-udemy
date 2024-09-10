export class Task {
  id: string;
  title: string;
  completed: boolean;
  startDate: string;
  deadline: string;

  constructor(taskRecord: {
    id: string;
    title: string;
    completed: boolean;
    startDate: string;
    deadline: string;
  }) {
    const { id, title, completed, startDate, deadline } = taskRecord;

    this.id = id;
    this.title = title;
    this.completed = completed;
    this.startDate = startDate;
    this.deadline = deadline;
  }
}
