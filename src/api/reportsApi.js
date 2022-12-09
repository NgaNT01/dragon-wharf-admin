import axiosClient from "./axiosClient";

const reportsApi = {
    getListReports: () => {
        const url = '/report';
        return axiosClient.get(url);
    },
    findReports: (params) => {
        const url = `/report/search?q=${params}`;
        return axiosClient.get(url);
    }

}

export default reportsApi;