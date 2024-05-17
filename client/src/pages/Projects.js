import React, { useContext, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProjectList from "../components/ProjectList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchProjects } from "../http/projectsAPI";

const ProjectsPage = observer(() => {
    const { project } = useContext(Context);

    useEffect(() => {
        fetchProjects().then(data => project.setProjects(data));
    }, [project]);

    return (
        <Container>
            <Row className="mt-2">
                <Col md={12}>
                    <h3>Список проектов</h3>
                    <ProjectList />
                </Col>
            </Row>
        </Container>
    );
});

export default ProjectsPage;
