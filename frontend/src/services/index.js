import { get, post, put, destroy } from './api/base';

export const ApiTasks = {
    index: () => get('/tasks'),
    single: (id) => get(`/tasks/${id}`),
    create: (params) => post(`/tasks`, params),
    update: (params) => put(`/tasks`, params),
    remove: (id) => destroy(`/tasks/${id}`),
}

export const ApiAuth = {
    login: (params) => post('/login', params),
    profile: () => get('/profile'),
}