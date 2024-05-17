import React, { useContext, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import { Button, Form, Row, Col } from "react-bootstrap";
import { Context } from "../../index";
import { createProject, addProjectMember, removeProjectMember } from "../../http/projectsAPI";
import { observer } from "mobx-react-lite";

const CreateProject = observer(({ show, onHide }) => {
    const { projects } = useContext(Context);
    const [project_name, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [project_tasks, setProjectTasks] = useState([]);

    const addTask = () => {
        setProjectTasks([...project_tasks, { task_name: '', start_date: new Date(), end_date: new Date(), description: '', assigned_user: null }]);
    };

    const removeTask = (index) => {
        setProjectTasks(project_tasks.filter((task, i) => i !== index));
    };

    const changeTask = (key, value, index) => {
        setProjectTasks(project_tasks.map((task, i) => i === index ? { ...task, [key]: value } : task));
    };

    const createNewProject = async () => {
        const projectData = {
            project_name: project_name,
            description: description,
            tasks: project_tasks,
            projectMember: selectedUsers.map(user => user.user_id)
        };
        try {
            const createdProject = await createProject(projectData);
            console.log("Создан проект:", createdProject);
            onHide(); // Закрываем модальное окно после успешного создания проекта
        } catch (error) {
            console.error("Ошибка при создании проекта:", error);
        }
    };

    const addUserToProject = (username) => {
        const user = projects.users.find(user => user.username === username);
        setSelectedUsers([...selectedUsers, user]);
        addProjectMember(project_name, user.user_id); // Вызываем функцию добавления участника к проекту
    };

    const removeUserFromProject = (username) => {
        const user = selectedUsers.find(user => user.username === username);
        setSelectedUsers(selectedUsers.filter(user => user.username !== username));
        removeProjectMember(project_name, user.user_id); // Вызываем функцию удаления участника из проекта
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Создать проект
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={project_name}
                        onChange={e => setProjectName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название проекта"
                    />
                    <Form.Control
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="mt-3"
                        placeholder="Введите описание проекта"
                    />
                    <hr />
                    
                    <h5>Добавить участников</h5>
                    {projects.users.map(user =>
                        <Form.Check
                            key={user.user_id}
                            type="checkbox"
                            id={user.user_id}
                            label={user.username}
                            onChange={() => addUserToProject(user.username)}
                        />
                    )}
                    <hr />
                    <Button
                        variant={"outline-dark"}
                        onClick={addTask}
                    >
                        Добавить задачу
                    </Button>
                    {project_tasks.map((task, index) =>
                        <Row className="mt-4" key={index}>
                            <Col md={4}>
                                <Form.Control
                                    value={task.task_name}
                                    onChange={(e) => changeTask('task_name', e.target.value, index)}
                                    placeholder="Введите название задачи"
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={task.description}
                                    onChange={(e) => changeTask('description', e.target.value, index)}
                                    placeholder="Введите описание задачи"
                                />
                            </Col>
                            <Col md={2}>
                                <Button
                                    onClick={() => removeTask(index)}
                                    variant={"outline-danger"}
                                >
                                    Удалить
                                </Button>
                            </Col>
                            <Col md={2}>
                                <Form.Control
                                    as="select"
                                    value={task.assigned_user}
                                    onChange={(e) => changeTask('assigned_user', e.target.value, index)}
                                >
                                    <option value={null}>Выберите участника</option>
                                    {selectedUsers.map(user =>
                                        <option key={user.user_id} value={user.user_id}>{user.username}</option>
                                    )}
                                </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button
                                    onClick={() => removeUserFromProject(index)}
                                    variant={"outline-danger"}
                                >
                                    Удалить участника
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={onHide}>Закрыть</Button>
                <Button variant="outline-success" onClick={createNewProject}>Создать проект</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateProject;
