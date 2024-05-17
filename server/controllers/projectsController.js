const {Projects} = require('../models/models')
const ApiError = require('../error/ApiError');

class projectsController {
    async create(req, res) {
        const {name} = req.body
        const project = await Projects.create({name})
        return res.json(project)
    }

    async getAll(req, res) {
        const project = await Projects.findAll()
        return res.json(project)
    }

    async delete(req, res) {
        try {
            const { id } = req.params; // Извлечение ID проекта из параметров маршрута
            const project = await Projects.findByPk(id); // Находим проект с помощью первичного ключа
    
            if (!project) {
                // Если такой проект не найден, возвращаем статус 404 с сообщением
                return res.status(404).json({
                    message:'Проект с ID ${id} не найден.'
                });
            }
    
            await project.destroy(); // Если проект найден, удаляем его
            return res.status(200).json({
                message:'Проект с ID ${id} успешно удален.'
            });
        } catch (error) {
            // В случае ошибки возвращаем статус 500 с сообщением
            return res.status(500).json({
                message: 'Произошла ошибка при удалении проекта с ID ${id}: ${error.message}'
            });
        }
    }

}

module.exports = new projectsController()
