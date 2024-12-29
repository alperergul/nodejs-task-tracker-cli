import * as fs from 'fs';
import { DbModel } from '../models/db.model';
import {
  EnumStatusMessages,
  EnumStatusType,
} from '../models/enums/status-type.enum';
import { Task } from '../models/task.model';

export async function getTasks(): Promise<Task[]> {
  let tasks: Task[] = [];
  try {
    const file = await fs.readFileSync('./src/db/tasks.json');
    tasks = JSON.parse(file.toString()).tasks;
  } catch (error) {
    if (error.code === 'ENOENT') {
      saveTasks([]);
    }
  }

  return tasks;
}

export async function getNewTaskId(): Promise<number> {
  let id: number = 1;
  let tasks: Task[] = await getTasks();

  if (tasks.length > 0) {
    return ++tasks[tasks.length - 1].id;
  }

  return id;
}

export async function saveTasks(tasks: Task[]) {
  let dbModel: DbModel = {
    tasks: tasks,
  };

  fs.writeFileSync('./src/db/tasks.json', JSON.stringify(dbModel));
}

export async function createOne(taskDescription: string) {
  let tasks: Task[] = await getTasks();

  let newTask: Task = {
    id: await getNewTaskId(),
    createdAt: new Date(),
    description: taskDescription,
    status: EnumStatusType.TODO,
    updatedAt: new Date(),
  };

  tasks = [...tasks, newTask];
  saveTasks(tasks);
}

export async function deleteOne(taskId: number) {
  let tasks: Task[] = await getTasks();
  tasks = tasks.filter((task: Task) => task.id !== taskId);

  saveTasks(tasks);
}

export async function update(id: number, taskDescription: string) {
  let tasks: Task[] = await getTasks();

  let updatingTask: Task = tasks.find((task: Task) => task.id === id);

  if (updatingTask) {
    let updatedTask: Task = {
      ...updatingTask,
      description: taskDescription,
      updatedAt: new Date(),
    };
    Object.assign(updatingTask, updatedTask);
    saveTasks(tasks);
  } else {
    console.log('Not found');
  }
}

export async function updateProgress(id: number, status: number) {
  let tasks: Task[] = await getTasks();

  let updatingTask: Task = tasks.find((task: Task) => task.id === id);

  if (updatingTask) {
    let updatedTask: Task = { ...updatingTask, status, updatedAt: new Date() };
    Object.assign(updatingTask, updatedTask);
    saveTasks(tasks);
  } else {
    console.log('Not found');
  }
}

export async function getListTask(status?: number) {
  let tasks: Task[] = await getTasks();

  tasks =
    status !== undefined
      ? tasks.filter((task: Task) => task.status === status)
      : tasks;

  if (tasks.length === 0) {
    console.log('Not found');
  }

  tasks.forEach((task: Task) => {
    console.log(
      `* ID: ${task.id}\tTask: ${task.description}\tStatus: ${
        EnumStatusMessages[task.status]
      }`
    );
  });
}
