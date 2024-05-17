import { makeAutoObservable } from "mobx";

export default class ProjectsStore {
    constructor() {
        this._projects = []; // Массив проектов
        makeAutoObservable(this);
    }

    // Метод для установки списка проектов
    setProjects(projects) {
        this._projects = projects;
    }

    // Геттер для получения списка проектов
    get projects() {
        return this._projects;
    }

    // Метод для добавления нового проекта
    addProject(project) {
        this._projects.push(project);
    }

    // Метод для удаления проекта по его ID
    removeProject(projectId) {
        this._projects = this._projects.filter(project => project.id !== projectId);
    }

    // Метод для добавления участника в проект по его имени пользователя
    addMemberToProject(projectId, username) {
        const project = this._projects.find(project => project.id === projectId);
        if (project) {
            // Добавляем пользователя в список участников проекта
            project.members.push(username);
        }
    }

    // Метод для создания задачи в проекте для конкретного пользователя
    createTaskInProject(projectId, task) {
        const project = this._projects.find(project => project.id === projectId);
        if (project) {
            // Добавляем задачу в список задач проекта
            project.tasks.push(task);
        }
    }
}
