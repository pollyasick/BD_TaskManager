import { $authHost } from "./index";

// Создание задачи для пользователя
export const createUserTask = async (userId, taskData) => {
    const { data } = await $authHost.post(`api/users/${userId}/tasks`, taskData);
    return data;
};

// Получение списка задач пользователя с возможностью сортировки и поиска
export const fetchUserTasks = async (userId, sortBy, searchTerm) => {
    let url = `api/users/${userId}/tasks`;
    if (sortBy) {
        url += `?sortBy=${sortBy}`;
    }
    if (searchTerm) {
        url += `${sortBy ? '&' : '?'}searchTerm=${searchTerm}`;
    }
    const { data } = await $authHost.get(url);
    return data;
};

// Удаление задачи пользователя
export const removeUserTask = async (userId, taskId) => {
    const { data } = await $authHost.delete(`api/users/${userId}/tasks/${taskId}`);
    return data;
};

// Изменение статуса задачи пользователя
export const updateUserTaskStatus = async (userId, taskId, statusId) => {
    const { data } = await $authHost.put(`api/users/${userId}/tasks/${taskId}/status`, { statusId });
    return data;
};
