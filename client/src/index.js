import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import UserStore from "./store/UserStore";
import ProjectsStore from "./store/ProjectsStore";
import UserTasksStore from './store/UserTasksStore';

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore(),
        projects: new ProjectsStore(),
        userTasks:new UserTasksStore(),
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);

