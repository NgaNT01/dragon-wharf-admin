import axiosClient from "./axiosClient";

const userApi = {
    signIn: (payload) => {
        const url = '/admin/login';
        return axiosClient.post(url, payload);
    },
    getListUsers: () => {
        const url = '/user/list';
        return axiosClient.get(url);
    }
}

export default userApi;