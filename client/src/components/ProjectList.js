import React, { useContext, useEffect, useState } from 'react';
import { ListGroup, Button } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { fetchProjects, removeProjectMember, createProjectTask, removeProjectTask } from '../http/projectsAPI';


const ProjectList = observer(() => {
    const { projectStore } = useContext(Context);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const getProjects = async () => {
            const data = await fetchProjects();
            setProjects(data);
        };
        getProjects();
    }, []);

    const handleRemoveMember = async (projectId, userId) => {
        try {
            await removeProjectMember(projectId, userId);
            // Обновляем список проектов, удаляя участника из соответствующего проекта
            setProjects(projects.map(project => {
                if (project.id === projectId) {
                    // Предположим, что у проекта есть массив участников
                    return { ...project, members: project.members.filter(member => member.id !== userId) };
                }
                return project;
            }));
        } catch (error) {
            console.error('Ошибка при удалении участника из проекта', error);
        }
    };
    

    const handleCreateTask = async (projectId, taskData) => {
        try {
            const newTask = await createProjectTask(projectId, taskData);
            // Обновляем список проектов, добавляя новую задачу к соответствующему проекту
            setProjects(projects.map(project => {
                if (project.id === projectId) {
                    // Предположим, что у проекта есть массив задач tasks
                    return { ...project, tasks: [...project.tasks, newTask] };
                }
                return project;
            }));
        } catch (error) {
            console.error('Ошибка при создании задачи для проекта', error);
        }
    };
    
    const handleRemoveTask = async (projectId, taskId) => {
        try {
            await removeProjectTask(projectId, taskId);
            // Обновляем список задач проекта, удаляя задачу из состояния
            setProjects(projects.map(project => {
                if (project.id === projectId) {
                    // Удаляем задачу из массива задач проекта
                    return { ...project, tasks: project.tasks.filter(task => task.id !== taskId) };
                }
                return project;
            }));
        } catch (error) {
            console.error('Ошибка при удалении задачи из проекта', error);
        }
    };
    
    return (
        <ListGroup>
        {projects.map((project) => (
            <ListGroup.Item key={project.id}>
                <div><strong>Проект:</strong> {project.name}</div>
                {/* Действия для управления участниками и задачами */}
                <Button variant="danger" onClick={() => handleRemoveMember(project.id, 'userId')}>Удалить участника</Button>
                <Button variant="success" onClick={() => handleCreateTask(project.id, 'taskData')}>Добавить задачу</Button>
                <Button variant="warning" onClick={() => handleRemoveTask(project.id, 'taskId')}>Удалить задачу</Button>
                {/* Следует предоставить реальные userId, taskData и taskId при их использовании */}
            </ListGroup.Item>
        ))}
    </ListGroup>
    
    );
});

export default ProjectList;
