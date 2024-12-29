"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.getTasks = getTasks;
exports.getNewTaskId = getNewTaskId;
exports.saveTasks = saveTasks;
exports.createOne = createOne;
exports.deleteOne = deleteOne;
exports.update = update;
exports.updateProgress = updateProgress;
exports.getListTask = getListTask;
const fs = __importStar(require("fs"));
const status_type_enum_1 = require("../models/enums/status-type.enum");
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = [];
        try {
            const file = yield fs.readFileSync('./src/db/tasks.json');
            tasks = JSON.parse(file.toString()).tasks;
        }
        catch (error) {
            if (error.code === 'ENOENT') {
                saveTasks([]);
            }
        }
        return tasks;
    });
}
function getNewTaskId() {
    return __awaiter(this, void 0, void 0, function* () {
        let id = 1;
        let tasks = yield getTasks();
        if (tasks.length > 0) {
            return ++tasks[tasks.length - 1].id;
        }
        return id;
    });
}
function saveTasks(tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        let dbModel = {
            tasks: tasks,
        };
        fs.writeFileSync('./src/db/tasks.json', JSON.stringify(dbModel));
    });
}
function createOne(taskDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield getTasks();
        let newTask = {
            id: yield getNewTaskId(),
            createdAt: new Date(),
            description: taskDescription,
            status: status_type_enum_1.EnumStatusType.TODO,
            updatedAt: new Date(),
        };
        tasks = [...tasks, newTask];
        saveTasks(tasks);
    });
}
function deleteOne(taskId) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield getTasks();
        tasks = tasks.filter((task) => task.id !== taskId);
        saveTasks(tasks);
    });
}
function update(id, taskDescription) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield getTasks();
        let updatingTask = tasks.find((task) => task.id === id);
        if (updatingTask) {
            let updatedTask = Object.assign(Object.assign({}, updatingTask), { description: taskDescription, updatedAt: new Date() });
            Object.assign(updatingTask, updatedTask);
            saveTasks(tasks);
        }
        else {
            console.log('Not found');
        }
    });
}
function updateProgress(id, status) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield getTasks();
        let updatingTask = tasks.find((task) => task.id === id);
        if (updatingTask) {
            let updatedTask = Object.assign(Object.assign({}, updatingTask), { status, updatedAt: new Date() });
            Object.assign(updatingTask, updatedTask);
            saveTasks(tasks);
        }
        else {
            console.log('Not found');
        }
    });
}
function getListTask(status) {
    return __awaiter(this, void 0, void 0, function* () {
        let tasks = yield getTasks();
        tasks =
            status !== undefined
                ? tasks.filter((task) => task.status === status)
                : tasks;
        if (tasks.length === 0) {
            console.log('Not found');
        }
        tasks.forEach((task) => {
            console.log(`* ID: ${task.id}\tTask: ${task.description}\tStatus: ${status_type_enum_1.EnumStatusMessages[task.status]}`);
        });
    });
}
//# sourceMappingURL=task-queries.js.map