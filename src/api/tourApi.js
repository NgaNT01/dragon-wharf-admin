import axiosClient from "./axiosClient";

const tourApi = {
    getListTours: () => {
        const url = '/report';
        return axiosClient.get(url);
    },
    statisticTout: (params) => {
        const url = `/tour/statisticTour${params}`;
        return axiosClient.get(url);
    }

}

export default tourApi;