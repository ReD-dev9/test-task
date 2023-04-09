import axios from 'axios';

const url = 'http://localhost:5000/api';
const token = localStorage.token;

const service = axios.create({
    baseURL: url,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
});

service.interceptors.request.use((config) => {
    return ({
            ...config,
        })
    },
    error => Promise.reject(error),
);

service.interceptors.response.use((response) =>
    response,
    async (error) => {
        // return Promise.reject(error.response.data);
    },
);

const { get, post, put, delete: destroy } = service;
export { get, post, put, destroy };
