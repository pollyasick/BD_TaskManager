import React, { useContext, useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import { LOGIN_ROUTE, REGISTRATION_ROUTE, TASK_MANAGER_ROUTE } from "../utils/const_s";
import { login, registration } from "../http/userAPI";
import { observer } from "mobx-react-lite";
import { Context } from "../index";

const Auth = observer(() => {
    const { user } = useContext(Context);
    const location = useLocation();
    const history = useHistory();
    const isLogin = location.pathname === LOGIN_ROUTE;
    // Добавляем состояния для полей
    const [username, setUsername] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword] = useState('');
    const [role, setRole] = useState('');

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(email, password);
            } else {
                data = await registration(username, first_name, last_name, email, password, role);
            }
            user.setUser(data);
            user.setIsAuth(true);
            history.push(TASK_MANAGER_ROUTE);
        } catch (e) {
            alert(e.response?.data?.message || e.message || 'Произошла ошибка');
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : "Регистрация"}</h2>
                <Form className="d-flex flex-column">
                    {!isLogin && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваше имя пользователя..."
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваше имя..."
                                value={first_name}
                                onChange={e => setFirstName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите вашу фамилию..."
                                value={last_name}
                                onChange={e => setLastName(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Укажите ваш email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Укажите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Укажите вашу роль..."
                                value={role}
                                onChange={e => setRole(e.target.value)}
                            />
                        </>
                    )}

                    {isLogin && (
                        <>
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Form.Control
                                className="mt-3"
                                placeholder="Введите ваш пароль..."
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                type="password"
                            />
                        </>
                    )}

                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={"outline-success"}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Row>

                </Form>
            </Card>
        </Container>
    );
});
export default Auth;
