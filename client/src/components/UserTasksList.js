import React, { useContext, useState } from 'react';
import { ListGroup, Button, Form } from 'react-bootstrap';
import { Context } from '../index';
import { observer } from 'mobx-react-lite';
import { removeUserTask, updateUserTaskStatus } from '../http/userTasksAPI';


const UserTasksList = observer(() => {
    const {userTasks } = useContext(Context);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [newTaskStatus, setNewTaskStatus] = useState('');

    const [newTaskStartDate, setNewTaskStartDate] = useState(new Date());
    const [newTaskEndDate, setNewTaskEndDate] = useState(new Date());


    const createUserTask = async () => {
        try {
            const taskData = {
                title: newTaskTitle,
                description: newTaskDescription,
                status: newTaskStatus,
                start_date: newTaskStartDate,
                end_date: newTaskEndDate
            };
            // Здесь предполагается, что у вас есть функция createUserTask из userTasksAPI
            const createdTask = await createUserTask(userTasks.userId, taskData);
            // Обновите список задач после создания новой задачи
            userTasks.setUserTasks([...userTasks.userTasks, createdTask]);
            // Сбросьте значения полей новой задачи после успешного создания
            setNewTaskTitle('');
            setNewTaskDescription('');
            setNewTaskStatus('');
        } catch (error) {
            console.error('Ошибка при создании задачи', error);
        }
    };
    
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
        <div>
            {/* Форма для создания новой задачи */}
            <Form>
                <Form.Control
                    value={newTaskTitle}
                    onChange={e => setNewTaskTitle(e.target.value)}
                    className="mt-3"
                    placeholder="Введите название задачи"
                />
                <Form.Control
                    value={newTaskDescription}
                    onChange={e => setNewTaskDescription(e.target.value)}
                    className="mt-3"
                    placeholder="Введите описание задачи"
                />
                <Form.Control
                    type="date"
                    value={newTaskStartDate.toISOString().substr(0, 10)}
                    onChange={e => setNewTaskStartDate(new Date(e.target.value))}
                    className="mt-3"
                    placeholder="Выберите начальную дату"
                />
                <Form.Control
                    type="date"
                    value={newTaskEndDate.toISOString().substr(0, 10)}
                    onChange={e => setNewTaskEndDate(new Date(e.target.value))}
                    className="mt-3"
                    placeholder="Выберите конечную дату"
                />

                <Form.Select
                    value={newTaskStatus}
                    onChange={e => setNewTaskStatus(e.target.value)}
                    className="mt-3"
                >
                    <option value="1">Новая</option>
                    <option value="2">В работе</option>
                    <option value="3">Завершена</option>
                </Form.Select>
                <Button variant="outline-success" onClick={createUserTask}>Создать задачу</Button>
            </Form>
            
            {/* Список задач пользователя */}
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
        </div>
    );    
});

export default UserTasksList;
