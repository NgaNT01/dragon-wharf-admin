import axiosClient from "./axiosClient";

const tourApi = {
    getListTours: () => {
        const url = '/tour';
        return axiosClient.get(url);
    },
    statisticTour: (params) => {
        const url = `/tour/statisticTour${params}`;
        return axiosClient.get(url);
    },
    inspectTour: (payload) => {
        const url = `/tour/inspect`;
        return axiosClient.put(url,payload)
    },
    addNewTour: (payload) => {
        const url = `/tour/add`;
        return axiosClient.post(url,payload);
    },
    rejectTour: (id, payload) => {
        const url = `/tour/reject/${id}`;
        return axiosClient.put(url,payload);
    }

}

export default tourApi;