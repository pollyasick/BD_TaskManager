import React, {useContext} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes";
import {TASK_MANAGER_ROUTE} from "../utils/const_s";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
// import Auth from '../pages/Auth';

const AppRouter = observer(() => {
    const {user} = useContext(Context)

    console.log(user)
    return (
        <Switch>
            {user.isAuth && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={TASK_MANAGER_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;