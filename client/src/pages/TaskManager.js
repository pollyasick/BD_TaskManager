import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectList from "../components/ProjectList";
import UserTasksList from "../components/UserTasksList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProjects } from "../http/projectsAPI";
import { fetchUserTasks } from "../http/userTasksAPI";

const TaskManager = observer(() => {
    const { projects, userTasks } = useContext(Context);
    useEffect(() => {
        fetchProjects().then(data => projects.setProjects(data));
    }, [projects]);

    useEffect(() => {
        fetchUserTasks().then(data => userTasks.setUserTasks(data));
    }, [userTasks]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={6}>
                    <h3>Проекты</h3>
                    <ProjectList />
                </Col>
                <Col md={6}>
                    <h3>Личные задачи</h3>
                    <UserTasksList />
                </Col>
            </Row>
        </Container>
    );
});

export default TaskManager;
