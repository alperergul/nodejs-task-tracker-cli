#!/usr/bin/env node

import { Command } from 'commander';
import {
  createOne,
  deleteOne,
  getListTask,
  update,
  updateProgress,
} from './database/task-queries';
import { EnumStatusType } from './models/enums/status-type.enum';

const program = new Command();

program
  .command('add')
  .description('Add new task')
  .argument('<string>', 'task to add')
  .action(async (str) => {
    await createOne(str);
  });

program
  .command('delete')
  .description('Delete task')
  .argument('<number>', 'task id to delete')
  .action(async (id: number) => {
    await deleteOne(+id);
  });

program
  .command('update')
  .description('Update task')
  .argument('<number>', 'task id to update')
  .argument('<string>', 'task to update')
  .action(async (id: number, taskDescription: string) => {
    await update(+id, taskDescription);
  });

program
  .command('mark-in-progress')
  .description('Mark in progress')
  .argument('<number>', 'task id to update')
  .action(async (id: number) => {
    await updateProgress(+id, EnumStatusType.IN_PROGRESS);
  });

program
  .command('mark-done')
  .description('Mark done')
  .argument('<number>', 'task id to update')
  .action(async (id: number) => {
    await updateProgress(+id, EnumStatusType.DONE);
  });

let listCommand = program
  .command('list')
  .description('List Tasks')
  .action(async () => {
    await getListTask();
  });

listCommand
  .command('todo')
  .description('List those whose status is to do')
  .action(async () => {
    await getListTask(EnumStatusType.TODO);
  });

listCommand
  .command('in-progress')
  .description('List those whose status is in progress')
  .action(async () => {
    await getListTask(EnumStatusType.IN_PROGRESS);
  });

listCommand
  .command('done')
  .description('List those whose status is done')
  .action(async () => {
    await getListTask(EnumStatusType.DONE);
  });

program.parse();
