import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import reportsReducer from "./reportsSlice";
import toursReducer from "./tourSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        reports: reportsReducer,
        tours: toursReducer,
    },

});

export default store;