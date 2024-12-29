#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const task_queries_1 = require("./database/task-queries");
const status_type_enum_1 = require("./models/enums/status-type.enum");
const program = new commander_1.Command();
program
    .command('add')
    .description('Add new task')
    .argument('<string>', 'task to add')
    .action((str) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.createOne)(str);
}));
program
    .command('delete')
    .description('Delete task')
    .argument('<number>', 'task id to delete')
    .action((id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.deleteOne)(+id);
}));
program
    .command('update')
    .description('Update task')
    .argument('<number>', 'task id to update')
    .argument('<string>', 'task to update')
    .action((id, taskDescription) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.update)(+id, taskDescription);
}));
program
    .command('mark-in-progress')
    .description('Mark in progress')
    .argument('<number>', 'task id to update')
    .action((id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.updateProgress)(+id, status_type_enum_1.EnumStatusType.IN_PROGRESS);
}));
program
    .command('mark-done')
    .description('Mark done')
    .argument('<number>', 'task id to update')
    .action((id) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.updateProgress)(+id, status_type_enum_1.EnumStatusType.DONE);
}));
let listCommand = program
    .command('list')
    .description('List Tasks')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.getListTask)();
}));
listCommand
    .command('todo')
    .description('List those whose status is to do')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.getListTask)(status_type_enum_1.EnumStatusType.TODO);
}));
listCommand
    .command('in-progress')
    .description('List those whose status is in progress')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.getListTask)(status_type_enum_1.EnumStatusType.IN_PROGRESS);
}));
listCommand
    .command('done')
    .description('List those whose status is done')
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, task_queries_1.getListTask)(status_type_enum_1.EnumStatusType.DONE);
}));
program.parse();
//# sourceMappingURL=index.js.map