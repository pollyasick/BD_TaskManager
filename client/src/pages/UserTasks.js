import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserTasksList from "../components/UserTasksList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchUserTasks } from "../http/userTasksAPI";

const UserTasksPage = observer(() => {
    const { userTasks } = useContext(Context);

    useEffect(() => {
        fetchUserTasks().then(data => userTasks.setUserTasks(data));
    }, [userTasks]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={12}>
                    <h3>Личные задачи</h3>
                    <UserTasksList />
                </Col>
            </Row>
        </Container>
    );
});

export default UserTasksPage;
