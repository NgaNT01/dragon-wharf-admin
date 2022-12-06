import axiosClient from "./axiosClient";

const userApi = {
    signIn: (payload) => {
        const url = '/admin/login';
        return axiosClient.post(url, payload);
    },
}

export default userApi;