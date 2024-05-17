import Admin from "./pages/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE,PROJECTS_ROUTE, TASK_MANAGER_ROUTE, USERS_TASKS_ROUTE} from "./utils/const_s";
import TaskManager from "./pages/TaskManager";
import Auth from "./pages/Auth";
import Projects from "./pages/Projects";
import UserTasksPage from "./pages/UserTasks";


export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: TASK_MANAGER_ROUTE,
        Component: TaskManager
    },
    {
        path: PROJECTS_ROUTE + '/:id', //информация конкретного проекта
        Component: Projects
    },
    {
        path: USERS_TASKS_ROUTE,
        Component: UserTasksPage
    },

]

export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
