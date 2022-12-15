import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import reportsApi from "../api/reportsApi";
import tourApi from "../api/tourApi";
import Swal from 'sweetalert2'

//  Thunk API
export const getListTours = createAsyncThunk(
    'tours/getListTours',
    async (payload, thunkAPI) => {
        const response = await tourApi.getListTours();
        return response.data.data;
    }
);

export const statisticTour = createAsyncThunk('tours/statisticTour',async (payload,  thunkAPI) => {
    const response = await tourApi.statisticTour(payload);
    console.log("sta",response.data.data);
    return response.data.data;
});

export const inspectTour = createAsyncThunk('tours/inspectTour',async (payload, thunkAPI) => {
    const response = await tourApi.inspectTour(payload);
    return response.data.data;
    // const list = tourApi.getListTours();
    // return list.data.data;
});

export const addNewTour = createAsyncThunk('/tours/addNewTour',async (payload) => {
    const response = await tourApi.addNewTour(payload);
    return response.data.data;
})

export const rejectTour = createAsyncThunk('tours/rejectTour',async (id,payload) => {
    const response = await tourApi.rejectTour(id,payload);
    return response.data.data;
})

// export const signOut = createAsyncThunk(
//     'auth/signOut',
//     async (payload, thunkAPI) => {
//         localStorage.removeItem('access_token');
//     }
// );


// ---------------------
//      MAIN SLICE
// ---------------------

const initialState = {
    listTours: [],
    isLoading: false,
    tourStatistic: [],
    current: {},
}

const toursSlice = createSlice({
    name: 'tours',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getListTours.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListTours.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.listTours = action.payload;
        },
        [getListTours.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [statisticTour.pending.type]: (state) => {
            state.isLoading = true;
        },
        [statisticTour.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.tourStatistic = action.payload;
        },
        [statisticTour.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [inspectTour.pending.type]: (state) => {
            state.isLoading = true;
        },
        [inspectTour.fulfilled.type]: (state) => {
            state.isLoading = false;
        },
        [inspectTour.rejected.type]: (state) => {
            state.isLoading = false;
        }
    },
});


const {reducer: toursReducer } = toursSlice;
export default toursReducer;