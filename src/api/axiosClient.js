import axios from "axios";
import {getToken} from "../utils/auth";

const axiosClient = axios.create({
    baseURL: 'https://ms-dragon-wharf-be.vercel.app/management',
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosClient.interceptors.request.use(
    config => {
        const token = getToken();
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('access_token')}`;
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export default axiosClient;