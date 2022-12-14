import axiosClient from "./axiosClient";

const userApi = {
    signIn: (payload) => {
        const url = '/admin/login';
        return axiosClient.post(url, payload);
    },
    getListUsers: () => {
        const url = '/user/list';
        return axiosClient.get(url);
    },
    getUserById: (params) => {
        const url = `/user/profile/${params}`;
        return axiosClient.get(url)
    },
    findUser: (params) => {
        const url = `/user/search?q=${params}`;
        return axiosClient.get(url);
    },
    createUser: (payload) => {
        const url = `/user/create`;
        return axiosClient.post(url,payload);
    },
    deleteUser: (id) => {
        const url = `/user/${id}`;
        return axiosClient.delete(url);
    },
    updateUserInfo: (payload) => {
        const url = `/user/update-info`;
        return axiosClient.put(url,payload);
    }
}

export default userApi;