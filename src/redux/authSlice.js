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

export const getListUsers = createAsyncThunk('auth/getListUsers',async () => {
    const response = await userApi.getListUsers();
    return response.data.data;
});

export const getUserById = createAsyncThunk('auth/getUserById',async (payload, thunkAPI) => {
    const response = await userApi.getUserById(payload);
    console.log("user",response.data.data);
    return response.data.data;
});

export const findUser = createAsyncThunk('auth/findUser',async (payload, thunkAPI) => {
    const response = await userApi.findUser(payload);
    console.log("find user",response.data.data);
    return response.data.data;
});
// ---------------------
//      MAIN SLICE
// ---------------------

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    inputSearch: '',
    current: [],
    currentUser: {}
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
        [getListUsers.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getListUsers.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.current = action.payload;
        },
        [getListUsers.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [getUserById.pending.type]: (state) => {
            state.isLoading = true;
        },
        [getUserById.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.currentUser = action.payload;
        },
        [getUserById.rejected.type]: (state) => {
            state.isLoading = false;
        },
        [findUser.pending.type]: (state) => {
            state.isLoading = true;
        },
        [findUser.fulfilled.type]: (state,action) => {
            state.isLoading = false;
            state.current = action.payload;
        },
        [findUser.rejected.type]: (state) => {
            state.isLoading = false;
        }
    },
});


const {actions,reducer: authReducer } = authSlice;
export const {signOut} = actions
export default authReducer;