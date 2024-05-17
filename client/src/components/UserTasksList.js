import React, { useContext } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { removeUserTask, updateUserTaskStatus } from '../http/userTasksAPI';

const UserTasksList = observer(() => {
    const { userTasks } = useContext(Context);
    // Примерные функции для демонстрации взаимодействия с API

    const handleRemoveTask = async (taskId) => {
        try {
            // Здесь предполагается, что у вас есть доступ к id пользователя 
            await removeUserTask(userTasks.userId, taskId);
            // Обновите список задач после удаления, например, фильтрацией состояния
            userTasks.setUserTasks(userTasks.userTasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Ошибка при удалении задачи', error);
        }
    };

    const handleChangeTaskStatus = async (taskId, statusId) => {
        try {
            // Здесь предполагается, что у вас есть доступ к id пользователя 
            await updateUserTaskStatus(userTasks.userId, taskId, statusId);
            // Обновите статус задачи в состоянии
            userTasks.setUserTasks(userTasks.userTasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, statusId: statusId };
                }
                return task;
            }));
        } catch (error) {
            console.error('Ошибка при изменении статуса задачи', error);
        }
    };

    return (
        <ListGroup>
            {userTasks.userTasks.map((task, index) => (
                <ListGroup.Item key={task.id}>
                    <div><strong>Задача:</strong> {task.title}</div>
                    <div><strong>Описание:</strong> {task.description}</div>
                    <div><strong>Статус:</strong> {task.status}</div>
                    {/* Дополнительные элементы управления для задач */}
                    <Button variant="danger" onClick={() => handleRemoveTask(task.id)}>Удалить</Button>
                    <Form.Select onChange={(e) => handleChangeTaskStatus(task.id, e.target.value)}>
                        {/* Опции статуса задачи; обновите в соответствии со структурой вашего API */}
                        <option value="1">Новая</option>
                        <option value="2">В работе</option>
                        <option value="3">Завершена</option>
                    </Form.Select>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
});

export default UserTasksList;
