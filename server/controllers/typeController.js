const { Projects } = require('../models/models');
const ApiError = require('../error/ApiError');

class typeController {
    async create(req, res) {
        const { project_name, description } = req.body; // предполагается, что в запросе присутствуют поля 'name' и 'description'
        try {
            const project = await Projects.create({ project_name, description });
            // Возвращаем успешный ответ с созданным проектом
            return res.json(project)
            // return res.status(201).json(project);
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера при создании проекта'))
            // return res.status(500).json({ message: 'Ошибка сервера при создании проекта', error: error.message });
        }
    }

    async delete(req, res, next) {
        const project_id = req.params.id;  
        try {
            const deletedProjectCount = await Projects.destroy({ where: {project_id} });
            if (deletedProjectCount === 0) {
                return next(ApiError.notFound('Проект с id не найден'));
            }
            return res.json({ message: `Проект с id ${project_id} успешно удален` });
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера при удалении проекта'));
        }
    }

    async update(req, res, next) {
        const { project_id } = req.params; // Получаем ID проекта из запроса
        const { project_name, description } = req.body; // Получаем новые данные о проекте
        try {
            const project = await Projects.findByPk(project_id); // Находим проект по ID
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }
            // Обновляем данные проекта
            project.name = project_name;
            project.description = description;
            await project.save(); // Сохраняем изменения в базе данных
            return res.json(project); // Возвращаем обновленный проект
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера при обновлении проекта'));
        }
    }

    async assignMember(req, res, next) {
        const { project_id, TeamMember_id } = req.body; // Получаем ID проекта и участника из запроса
        try {
            const project = await Projects.findByPk(project_id); // Находим проект по ID
            if (!project) {
                return next(ApiError.notFound('Проект не найден'));
            }
            // Добавляем участника в проект
            await project.addMember(TeamMember_id);
            return res.json({ message: 'Участник успешно добавлен в проект' });
        } catch (error) {
            return next(ApiError.internal('Ошибка сервера при добавлении участника в проект'));
        }
    }

    async getAll(req, res) {
        const projects = await Projects.findAll();
        return res.json(projects);
    }
}

module.exports = new typeController();




