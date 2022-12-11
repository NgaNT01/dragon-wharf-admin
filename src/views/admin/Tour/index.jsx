
// Chakra imports
import {Box, SimpleGrid, Spinner} from "@chakra-ui/react";
import {
    columnsDataTour
} from "views/admin/Tour/variables/ColumnData";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import TourTable from "./components/TourTable";
import {getListTours} from "../../../redux/tourSlice";

export default function Tour() {
    const dispatch = useDispatch();
    const [listTours, setListTours] = useState([]);
    const isLoading = useSelector(state => state.tours.isLoading)
    const listTourCurrent = useSelector(state => state.tours.listTours)

    useEffect(async () => {
        const result =await dispatch(getListTours());
        const tours = unwrapResult(result);
        setListTours(tours);
    },[])

    useEffect(async () => {
        await setListTours(listTourCurrent);
    })

    // Chakra Color Mode
    return (
        <Box pt={{ base: "500px", md: "80px", xl: "80px" }}>
            {isLoading === true ? <Spinner thickness='4px'
                                           speed='0.85s'
                                           emptyColor='gray.200'
                                           color='blue.500'
                                           size='xl'
                                           position="absolute"
                                           right="800px"
                                           top="300px"
            ></Spinner> : <TourTable
                columnsData={columnsDataTour}
                tableData={listTours}
            />}
        </Box>
    );
}
