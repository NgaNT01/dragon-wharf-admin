import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import userApi from "../api/userApi";

//  Thunk API
export const signIn = createAsyncThunk(
    'auth/signIn',
    async (payload, thunkAPI) => {
        const response = await userApi.signIn(payload);

        // Save access token to storage
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('access_token', accessToken);
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
    isLoggedIn: false,
    isLoading: false,
    current: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            localStorage.removeItem('access_token');
            console.log("token",localStorage.getItem('access_token'));
            // alert('asasd');
            // state.auth.isLoggedIn = false;
            // state.auth.isLoading = false;
            // state.auth.current = {};
        }
    },
    extraReducers: {
        [signIn.pending.type]: (state) => {
            state.isLoading = true;
        },
        [signIn.fulfilled.type]: (state, payload) => {
            state.isLoading = false;
            if (payload) {
                state.isLoggedIn = true;
                state.current = { ...payload.meta.arg };
            }
        },
        [signIn.rejected.type]: (state) => {
            state.isLoading = false;
        },
        // [signOut.fulfilled.type]: (state, payload) => {
        //     state.isLoading = false;
        //     state.isLoggedIn = false;
        // },
    },
});


const {actions,reducer: authReducer } = authSlice;
export const {signOut} = actions
export default authReducer;