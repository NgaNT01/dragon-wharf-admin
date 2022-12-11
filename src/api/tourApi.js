import axiosClient from "./axiosClient";

const tourApi = {
    getListTours: () => {
        const url = '/tour';
        return axiosClient.get(url);
    },
    statisticTour: (params) => {
        const url = `/tour/statisticTour${params}`;
        return axiosClient.get(url);
    }

}

export default tourApi;