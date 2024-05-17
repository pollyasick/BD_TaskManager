import React, { useState } from 'react';
import { Button, Container } from "react-bootstrap";
import CreateProject from "../components/modals/CreateProject";


const Admin = () => {
    const [projectVisible, setProjectVisible] = useState(false);
    // const [membersVisible, setMembersVisible] = useState(false);
    // const [taskVisible, setTaskVisible] = useState(false);

    const handleProjectButtonClick = () => {
        setProjectVisible(true);
    };

    const handleProjectModalClose = () => {
        setProjectVisible(false);
    };

    // const handleMembersButtonClick = () => {
    //     setMembersVisible(true);
    // };

    // const handleMembersModalClose = () => {
    //     setMembersVisible(false);
    // };

    // const handleTaskButtonClick = () => {
    //     setTaskVisible(true);
    // };

    // const handleTaskModalClose = () => {
    //     setTaskVisible(false);
    // };

    return (
        <Container className="d-flex flex-column">
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={handleProjectButtonClick}
            >
                Добавить проект
            </Button>
            {/* <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={handleMembersButtonClick}
            >
                Добавить участников в проект
            </Button>
            <Button
                variant={"outline-dark"}
                className="mt-4 p-2"
                onClick={handleTaskButtonClick}
            >
                Добавить задачу участнику
            </Button> */}
            <CreateProject show={projectVisible} onHide={handleProjectModalClose} />
            {/* <AddMembersToProject show={membersVisible} onHide={handleMembersModalClose} />
            <AddTaskToUser show={taskVisible} onHide={handleTaskModalClose} /> */}
        </Container>
    );
};

export default Admin;
