import axios from "axios";
import {getToken} from "../utils/auth";

const axiosClient = axios.create({
    baseURL: 'https://ms-dragon-wharf-be.vercel.app/management',
    headers: {
        'Content-Type': 'application/json'
    },
})

axios.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;