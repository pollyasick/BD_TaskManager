import { $authHost, $host } from "./index";

// Запросы для работы с проектами

// Создание проекта
export const createProject = async (projectData) => {
    const { data } = await $authHost.post('api/projects', projectData);
    return data;
};

// Получение списка проектов
export const fetchProjects = async () => {
    const { data } = await $host.get('api/projects');
    return data;
};

// Запросы для работы с участниками проекта

// Добавление участника к проекту
export const addProjectMember = async (projectId, userId) => {
    const { data } = await $authHost.post(`api/projects/${projectId}/projectMember`, { userId });
    return data;
};

// Удаление участника из проекта
export const removeProjectMember = async (projectId, userId) => {
    const { data } = await $authHost.delete(`api/projects/${projectId}/projectMember`, { data: { userId } });
    return data;
};

// Запросы для работы с задачами проекта

// Создание задачи для проекта
export const createProjectTask = async (projectId, taskData) => {
    const { data } = await $authHost.post(`api/projects/${projectId}/tasks`, taskData);
    return data;
};

// Удаление задачи из проекта
export const removeProjectTask = async (projectId, taskId) => {
    const { data } = await $authHost.delete(`api/projects/${projectId}/tasks/${taskId}`);
    return data;
};
