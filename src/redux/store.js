import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reportsReducer from "./reportsSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reports: reportsReducer,
    },

});

export default store;