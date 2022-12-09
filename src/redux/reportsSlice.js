import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import reportsApi from "../api/reportsApi";

//  Thunk API
export const getListReports = createAsyncThunk(
    'reports/getListReports',
    async (payload, thunkAPI) => {
      const response = await reportsApi.getListReports();
      return response.data.data;
    }
);

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
    listReports: [],
    isLoading: false,
}

const reportsSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
    },
    extraReducers: {
        [getListReports.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListReports.fulfilled.type]: (state, action) => {
            state.isLoading = false;
            state.listReports = action.payload;
        },
        [getListReports.rejected.type]: (state) => {
            state.isLoading = false;
        },
    },
});


const {reducer: reportsReducer } = reportsSlice;
export default reportsReducer;