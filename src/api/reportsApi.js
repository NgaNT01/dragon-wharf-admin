import axiosClient from "./axiosClient";

const reportsApi = {
    getListReport: () => {
        const url = '/report';
        return axiosClient.get(url);
    },

}

export default reportsApi;