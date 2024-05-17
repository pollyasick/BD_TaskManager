import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import { Context } from "../../index";
import { createUserTask } from "../../http/userTasksAPI";
import { observer } from "mobx-react-lite";

const CreateUserTasks = observer(({ show, onHide }) => {
    const { user } = useContext(Context);
    const [task_name, setTaskName] = useState('');
    const [start_date, setStartDate] = useState(new Date());
    const [end_date, setEndDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending'); // Состояние для выбора статуса задачи
    const [sortBy, setSortBy] = useState('date'); // Состояние для выбора сортировки
    const [searchTerm, setSearchTerm] = useState(''); // Состояние для поиска

    const createTask = async () => {
        const taskData = {
            task_name: task_name,      
            start_date: start_date,
            end_date: end_date,
            description: description,
            status: status // Передаем статус задачи в объект данных задачи
        };
        try {
            const createdTask = await createUserTask(user.id, taskData);
            console.log("Создана задача:", createdTask);
            onHide(); // Закрываем модальное окно после успешного создания задачи
        } catch (error) {
            console.error("Ошибка при создании задачи:", error);
        }
    };

    // Фильтрация задач по поисковому запросу
    const filteredTasks = user.tasks.filter(task =>
        task.task_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Сортировка задач
    const sortedTasks = filteredTasks.sort((a, b) => {
        if (sortBy === 'date') {
            return new Date(a.start_date) - new Date(b.start_date);
        } else {
            return a.task_name.localeCompare(b.task_name);
        }
    });

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать задачу
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={task_name}
                        onChange={e => setTaskName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название задачи"
                    />
                    <Form.Group className="mt-3">
                        <Form.Label>Начальная дата:</Form.Label>
                        <Form.Control
                            type="date"
                            value={start_date.toISOString().substr(0, 10)}
                            onChange={e => setStartDate(new Date(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Group className="mt-3">
                        <Form.Label>Конечная дата:</Form.Label>
                        <Form.Control
                            type="date"
                            value={end_date.toISOString().substr(0, 10)}
                            onChange={e => setEndDate(new Date(e.target.value))}
                        />
                    </Form.Group>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание задачи"
                    />
                    {/* Добавляем поле для выбора статуса задачи */}
                    <Form.Group className="mt-3">
                        <Form.Label>Статус задачи:</Form.Label>
                        <Form.Control as="select" value={status} onChange={e => setStatus(e.target.value)}>
                            <option value="pending">В ожидании</option>
                            <option value="in_progress">В процессе</option>
                            <option value="completed">Завершено</option>
                        </Form.Control>
                    </Form.Group>
                    {/* Добавляем поля для выбора сортировки и ввода поискового запроса */}
                    <Form.Group className="mt-3">
                        <Form.Label>Сортировать по:</Form.Label>
                        <Form.Control as="select" value={sortBy} onChange={e => setSortBy(e.target.value)}>
                            <option value="date">Дате</option>
                            <option value="name">Названию</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Control
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="mt-3"
                        placeholder="Поиск по названию задачи"
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createTask}>Создать задачу</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateUserTasks;
