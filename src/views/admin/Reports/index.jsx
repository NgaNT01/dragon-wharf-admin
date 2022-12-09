
import {Box, Spinner} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import {
    columnsDataReports
} from "views/admin/Reports/variables/columnsData";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getListReports} from "../../../redux/reportsSlice";

export default function Reports() {
    const dispatch = useDispatch();
    const [listReports, setListReports] = useState([]);
    const isLoading = useSelector(state => state.reports.isLoading)
    const list = useSelector(state => state.reports.listReports)

    useEffect(async () => {
        const result = await dispatch(getListReports())
        setListReports(result.payload);
    },[])

    useEffect(() => {
        setListReports(list);
    })

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
                ></Spinner> : <DevelopmentTable
                    columnsData={columnsDataReports}
                    tableData={listReports}
                />}
        </Box>
    );
}
