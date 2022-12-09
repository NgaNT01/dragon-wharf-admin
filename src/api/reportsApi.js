import axiosClient from "./axiosClient";

const reportsApi = {
    getListReports: () => {
        const url = '/report';
        return axiosClient.get(url);
    },

}

export default reportsApi;