import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (username, first_name, last_name,email, password, role) => {
    const {data} = await $host.post('api/users/registration', {username, first_name, last_name,email, password, role})//убрала что роль равна админу
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/users/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    if (!localStorage.getItem('token')) {
        return;
    }
    const {data} = await $authHost.get('api/users/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
