const uuid = require('uuid')
const path = require('path');
const {UserTasks} = require('../models/models')
const ApiError = require('../error/ApiError');

class userTasksController {
    async create(req, res, next) {
        try {
            let { task_name, start_date, end_date, description, folder_id, status_id, parentTask_id } = req.body;
    
            // Предполагается, что в req.body также содержится информация о задаче
    
            // Выполнить необходимые операции для сохранения задачи в базе данных
            const newTask = await UserTasks.create({
                task_name,
                start_date,
                end_date,
                description,
                folder_id,
                status_id,
                parentTask_id
            });
    
            // Возвращаем созданную задачу в качестве ответа
            return res.json(newTask);
        } catch (error) {
            // Если произошла ошибка, отправляем сообщение об ошибке
            next(ApiError.badRequest(error.message));
        }
    }    

    async getAll(req, res) {
        const userTasks = await UserTasks.findAll()
        return res.json(userTasks)
    }

    // async getAll() {
    //   try {
    //     // Выполняем SQL запрос для извлечения всех записей из таблицы Users_tasks
    //     const result = await UserTasks.query('SELECT * FROM users_tasks');
    
    //     // Возвращаем результат запроса
    //     return result.rows;
    //   } catch (error) {
    //     // Если произошла ошибка, выводим её в консоль и возвращаем null или пустой массив в зависимости от вашего подхода к обработке ошибок
    //     console.error('Ошибка при получении всех задач:', error);
    //     return null; // или можно выбрасывать ошибку здесь
    //   }
    // }
    
    async delete(req, res) {
        try {
            const { id } = req.params; // Извлечение ID  из параметров маршрута
            const task = await UserTasks.findByPk(id); // Находим задачу с помощью первичного ключа
    
            if (!task) {
                // Если не найден, возвращаем статус 404 с сообщением
                return next(ApiError.internal('задача не найдена'))
            }
    
            await task.destroy(); 
            return res.status(200).json({
                message:'Задача с ID ${id} успешно удалена.'
            });
        } catch (error) {
            // В случае ошибки возвращаем статус 500 с сообщением
            return next(ApiError.internal('задача не удалена'))
        }
    }
}

module.exports = new userTasksController()
