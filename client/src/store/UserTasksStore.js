import { makeAutoObservable } from "mobx";

export default class UserTasksStore {
    constructor() {
        this._userTasks = [];
        this._selectedTask = {};
        this._page = 1;
        this._totalCount = 0;
        this._limit = 10; // Примерное количество задач на странице
        makeAutoObservable(this);
    }

    setUserTasks(userTasks) {
        this._userTasks = userTasks;
    }

    addUserTask(task) {
        this._userTasks.push(task);
    }

    removeUserTask(taskId) {
        this._userTasks = this._userTasks.filter(task => task.id !== taskId);
    }

    updateUserTask(taskId, updatedTask) {
        const index = this._userTasks.findIndex(task => task.id === taskId);
        if (index !== -1) {
            this._userTasks[index] = { ...this._userTasks[index], ...updatedTask };
        }
    }

    setSelectedTask(task) {
        this._selectedTask = task;
    }

    setPage(page) {
        this._page = page;
    }

    setTotalCount(totalCount) {
        this._totalCount = totalCount;
    }

    get userTasks() {
        return this._userTasks;
    }

    get selectedTask() {
        return this._selectedTask;
    }

    get page() {
        return this._page;
    }

    get totalCount() {
        return this._totalCount;
    }

    get limit() {
        return this._limit;
    }
}
















// import { makeAutoObservable } from "mobx";

// export default class UserTasksStore {
//     constructor() {
//         this._userTasks = []; // Массив задач пользователя
//         makeAutoObservable(this);
//     }

//     // Метод для установки списка задач пользователя
//     setUserTasks(userTasks) {
//         this._userTasks = userTasks;
//     }

//     // Геттер для получения списка задач пользователя
//     get userTasks() {
//         return this._userTasks;
//     }

//     // Метод для добавления новой задачи пользователю
//     addUserTask(task) {
//         this._userTasks.push(task);
//     }

//     // Метод для удаления задачи пользователя по ее ID
//     removeUserTask(taskId) {
//         this._userTasks = this._userTasks.filter(task => task.id !== taskId);
//     }

//     // Метод для обновления задачи пользователя
//     updateUserTask(taskId, updatedTask) {
//         const index = this._userTasks.findIndex(task => task.id === taskId);
//         if (index !== -1) {
//             this._userTasks[index] = { ...this._userTasks[index], ...updatedTask };
//         }
//     }
// }
