
import {Box} from "@chakra-ui/react";
import DevelopmentTable from "views/admin/dataTables/components/DevelopmentTable";
import {
    columnsDataReports
} from "views/admin/Reports/variables/columnsData";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getListReports} from "../../../redux/reportsSlice";

export default function Reports() {
    const dispatch = useDispatch();
    const [listReports, setListReports] = useState([]);

    useEffect(async () => {
        const result = await dispatch(getListReports())
        setListReports(result.payload);
    })

    return (
        <Box pt={{ base: "500px", md: "80px", xl: "80px" }}>
                <DevelopmentTable
                    columnsData={columnsDataReports}
                    tableData={listReports}
                />
        </Box>
    );
}
